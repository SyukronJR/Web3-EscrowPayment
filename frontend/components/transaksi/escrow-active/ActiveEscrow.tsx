"use client";

import { useEffect, useState } from "react";
import { BrowserProvider, ethers } from "ethers";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import EscrowStats from "./EscrowStats";
import EscrowCard from "./EscrowCard";
import EscrowDetailModal from "./EscrowDetailModal";

import EscrowPayment from "@/abi/EscrowPayment.json";
import { CONTRACT_ADDRESS } from "@/constants/contract";
import { tokens } from "@/components/transaksi/TokenDropdown";
import { fundEscrow } from "@/lib/fundEscrow";
import { markDelivered } from "@/lib/markDelivered";
import { claimRefund } from "@/lib/claimRefund";
import { confirmRelease } from "@/lib/confirmRelease";
import { cancelEscrow } from "@/lib/cancelEscrow";
import toast from "react-hot-toast";

type EscrowItem = {
  id: number;
  token: string;
  logo: string;
  tokenAddress: string;
  rawAmount: string;
  seller: string;
  buyer: string;
  amount: string;
  usd: string;
  status: string;
  deadline: string;
  deadlineTimestamp: number;

  txHash: string;
};

export default function ActiveEscrow() {
  const [page, setPage] = useState(1);

  const [escrows, setEscrows] = useState<EscrowItem[]>([]);

  const [loading, setLoading] = useState(true);

  const [selectedEscrow, setSelectedEscrow] = useState<EscrowItem | null>(null);

  useEffect(() => {
    loadEscrows();
  }, []);

  async function loadEscrows() {
    try {
      if (!window.ethereum) return;

      const provider = new BrowserProvider(window.ethereum);

      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,

        EscrowPayment.abi,

        signer,
      );

      const wallet = await signer.getAddress();

      const ids = await contract.getUserEscrows(wallet);

      const list: EscrowItem[] = [];

      for (const id of ids) {
        const escrow = await contract.getEscrow(id);

        const txHash = await contract.getTxHash(id);

        const tokenInfo =
          tokens.find(
            (t) => t.address.toLowerCase() === escrow.token.toLowerCase(),
          ) || tokens[0];

        let status = "";

        switch (Number(escrow.status)) {
          case 0:
            status = "Created";
            break;

          case 1:
            status = "Funded";
            break;

          case 2:
            status = "Delivered";
            break;

          case 3:
            status = "Released";
            break;

          case 4:
            status = "Refunded";
            break;

          case 5:
            status = "Cancelled";
            break;

          default:
            status = "Unknown";
        }

        const amountNumber = Number(
          ethers.formatUnits(escrow.amount, tokenInfo.decimals),
        );

        let usd = "";

        if (tokenInfo.symbol === "ETH") {
          const ETH_PRICE = 3200; // sementara
          usd = `$${(amountNumber * ETH_PRICE).toFixed(2)}`;
        }

        list.push({
          id: Number(escrow.id),

          token: tokenInfo.symbol,

          logo: tokenInfo.image,

          tokenAddress: escrow.token,

          rawAmount: escrow.amount.toString(),

          seller: escrow.seller,

          buyer: escrow.buyer,

          amount:
            ethers.formatUnits(
              escrow.amount,

              tokenInfo.decimals,
            ) +
            " " +
            tokenInfo.symbol,

          usd,
          status,

          deadline: new Date(
            Number(escrow.sellerDeadline) * 1000,
          ).toLocaleString(),

          deadlineTimestamp: Number(escrow.sellerDeadline),

          txHash,
        });
      }

      list.sort((a, b) => b.id - a.id);

      setEscrows(list);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const perPage = 3;

  const totalPages = Math.max(1, Math.ceil(escrows.length / perPage));

  const start = (page - 1) * perPage;

  const currentEscrows = escrows.slice(start, start + perPage);

  return (
    <div className="mt-10">
      <EscrowStats />

      {loading ? (
        <div className="mt-8 text-center text-slate-500">Memuat escrow...</div>
      ) : currentEscrows.length === 0 ? (
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-10 text-center text-slate-500">
          Belum ada escrow.
        </div>
      ) : (
        currentEscrows.map((item) => (
          <EscrowCard
            key={item.id}
            escrowId={item.id}
            token={item.token}
            logo={item.logo}
            seller={item.seller}
            buyer={item.buyer}
            amount={item.amount}
            usd={item.usd}
            status={item.status}
            deadline={item.deadline}
            deadlineTimestamp={item.deadlineTimestamp}
            onDetail={() => setSelectedEscrow(item)}
            onFund={async () => {
              try {
                const hash = await fundEscrow(
                  item.id,
                  item.tokenAddress,
                  item.rawAmount,
                );

                console.log("Fund:", hash);

                toast.success("Escrow berhasil didanai.");

                await loadEscrows();
              } catch (err) {
                console.log(err);

                toast.error("Fund gagal.");
              }
            }}
            onDeliver={async () => {
              try {
                const hash = await markDelivered(item.id);

                console.log("Delivered;", hash);

                toast.success("Barang berhasil dikirim.");

                await loadEscrows();
              } catch (err) {
                console.log(err);

                toast.error("Mark Delivered gagal.");
              }
            }}
            onRefund={async () => {
              try {
                const hash = await claimRefund(item.id);

                console.log("Refund:", hash);

                toast.success("Dana berhasil dikembalikan.");

                await loadEscrows();
              } catch (err) {
                console.log(err);

                toast.error("Refund gagal.");
              }
            }}
            onRelease={async () => {
              try {
                const hash = await confirmRelease(item.id);

                console.log("Release:", hash);

                toast.success("Dana berhasil dikirim ke seller.");

                await loadEscrows();
              } catch (err) {
                console.log(err);

                toast.error("Release gagal.");
              }
            }}
            onCancel={async () => {
              try {
                const hash = await cancelEscrow(item.id);

                console.log("Cancel:", hash);

                toast.success("Escrow berhasil dibatalkan.");

                await loadEscrows();
              } catch (err) {
                console.log(err);

                toast.error("Cancel gagal.");
              }
            }}
          />
        ))
      )}

      <div
        className="
          mt-8
          flex
          items-center
          justify-between
          rounded-2xl
          border
          border-slate-200
          bg-white
          px-6
          py-5
        "
      >
        <p className="text-sm text-slate-500">
          Menampilkan {escrows.length === 0 ? 0 : start + 1}
          {" - "}
          {Math.min(start + perPage, escrows.length)}
          {" dari "}
          {escrows.length}
          {" transaksi"}
        </p>

        <div className="flex items-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-white
              text-slate-500
              transition
              hover:border-indigo-300
              hover:text-indigo-600
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <FiChevronLeft size={20} />
          </button>

          {Array.from({
            length: totalPages,
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => setPage(index + 1)}
              className={`
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                border
                transition-all

                ${
                  page === index + 1
                    ? "border-indigo-400 bg-indigo-50 text-indigo-600"
                    : "border-slate-200 bg-white text-slate-700"
                }
              `}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-white
              text-slate-500
              transition
              hover:border-indigo-300
              hover:text-indigo-600
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>
      {selectedEscrow && (
        <EscrowDetailModal
          escrow={selectedEscrow}
          onClose={() => setSelectedEscrow(null)}
        />
      )}
    </div>
  );
}
