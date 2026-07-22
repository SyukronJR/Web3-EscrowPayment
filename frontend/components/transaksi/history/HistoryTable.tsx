"use client";

import HistoryRow from "./HistoryRow";
import { useEffect, useMemo, useState } from "react";
import { BrowserProvider, ethers } from "ethers";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import EscrowPayment from "@/abi/EscrowPayment.json";
import { CONTRACT_ADDRESS } from "@/constants/contract";
import { tokens } from "@/components/transaksi/TokenDropdown";

type HistoryItem = {
  id: number;
  date: string;
  created: string;
  deadline: string;
  seller: string;
  buyer: string;
  token: string;
  logo: string;
  amount: string;
  status: string;
  hash: string;
};

interface Props {
  search: string;
  statusFilter: string;
  selectedDate: string;

  onStatsChange: (stats: {
    total: number;
    released: number;
    refunded: number;
    cancelled: number;
  }) => void;

  onView: (item: HistoryItem) => void;
}

export default function HistoryTable({
  search,
  statusFilter,
  selectedDate,
  onStatsChange,
  onView,
}: Props) {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
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

      const list: HistoryItem[] = [];

      for (const id of ids) {
        const escrow = await contract.getEscrow(id);

        const statusNumber = Number(escrow.status);

        if (statusNumber !== 3 && statusNumber !== 4 && statusNumber !== 5) {
          continue;
        }

        const tokenInfo =
          tokens.find(
            (t) => t.address.toLowerCase() === escrow.token.toLowerCase(),
          ) || tokens[0];

        const txHash = await contract.getTxHash(Number(id));

        list.push({
          id: Number(escrow.id),

          logo: tokenInfo.image,

          token: tokenInfo.symbol,

          amount:
            ethers.formatUnits(escrow.amount, tokenInfo.decimals) +
            " " +
            tokenInfo.symbol,

          status:
            statusNumber === 3
              ? "Released"
              : statusNumber === 4
                ? "Refunded"
                : "Cancelled",

          seller: escrow.seller,

          buyer: escrow.buyer,

          hash: txHash,

          createdAt: new Date(Number(escrow.createdAt) * 1000).toLocaleString(
            "id-ID",
          ),

          deadline: new Date(
            Number(escrow.sellerDeadline) * 1000,
          ).toLocaleString("id-ID"),

          fundedAt:
            escrow.fundedAt && Number(escrow.fundedAt) > 0
              ? new Date(Number(escrow.fundedAt) * 1000).toLocaleString("id-ID")
              : "-",

          deliveredAt:
            escrow.deliveredAt && Number(escrow.deliveredAt) > 0
              ? new Date(Number(escrow.deliveredAt) * 1000).toLocaleString(
                  "id-ID",
                )
              : "-",

          releasedAt:
            escrow.releasedAt && Number(escrow.releasedAt) > 0
              ? new Date(Number(escrow.releasedAt) * 1000).toLocaleString(
                  "id-ID",
                )
              : "-",

          network: "Ethereum",

          platformFee: "0.000003 ETH",

          sellerReceived:
            statusNumber === 3
              ? (
                  Number(
                    ethers.formatUnits(escrow.amount, tokenInfo.decimals),
                  ) - 0.000003
                ).toFixed(6) +
                " " +
                tokenInfo.symbol
              : "-",

          date: Number(escrow.createdAt),

          created: new Date(Number(escrow.createdAt) * 1000).toISOString(),
        });
      }

      list.sort((a, b) => b.id - a.id);

      setHistory(list);
    } catch (err) {
      console.error(err);
    }
  }

  const filteredHistory = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return history.filter((item) => {
      const matchId = keyword.startsWith("#")
        ? item.id.toString().replace("#", "") === keyword.replace("#", "")
        : item.id.toString().includes(keyword);

      const matchSearch =
        keyword === "" ||
        matchId ||
        item.seller.toLowerCase().includes(keyword) ||
        item.buyer.toLowerCase().includes(keyword) ||
        item.token.toLowerCase().includes(keyword) ||
        item.status.toLowerCase().includes(keyword);

      const matchStatus =
        statusFilter === "All" || item.status === statusFilter;

      let matchDate = true;

      if (selectedDate) {
        const itemDate = item.created.split("T")[0];

        matchDate = itemDate === selectedDate;
      }

      return matchSearch && matchStatus && matchDate;
    });
  }, [history, search, statusFilter, selectedDate]);

  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const endIndex = startIndex + itemsPerPage;

  const currentItems = filteredHistory.slice(startIndex, endIndex);

  useEffect(() => {
    onStatsChange({
      total: filteredHistory.length,

      released: filteredHistory.filter((x) => x.status === "Released").length,

      refunded: filteredHistory.filter((x) => x.status === "Refunded").length,

      cancelled: filteredHistory.filter((x) => x.status === "Cancelled").length,
    });
  }, [filteredHistory, onStatsChange]);

  return (
    <div
      className="
      overflow-hidden
      rounded-2xl
      border
      border-slate-200
      bg-white
      shadow-sm
    "
    >
      <table className="w-full">
        {/* HEADER */}

        <thead className="bg-slate-50">
          <tr className="border-b border-slate-200">
            <th className="px-8 py-4 text-left text-sm font-semibold uppercase tracking-wide text-slate-500">
              ID
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-slate-500">
              Tanggal
            </th>

            <th className="px-20 py-4 text-left text-sm font-semibold uppercase tracking-wide text-slate-500">
              Party
            </th>

            <th className="px-9 py-4 text-left text-sm font-semibold uppercase tracking-wide text-slate-500">
              Token
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-slate-500">
              Amount
            </th>

            <th className="px-10 py-4 text-left text-sm font-semibold uppercase tracking-wide text-slate-500">
              Status
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wide text-slate-500">
              Aksi
            </th>
          </tr>
        </thead>

        {/* BODY */}

        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <HistoryRow
                key={item.id}
                id={item.id}
                date={item.date}
                seller={item.seller}
                buyer={item.buyer}
                token={item.token}
                logo={item.logo}
                amount={item.amount}
                status={item.status}
                hash={item.hash}
                onView={() => onView(item)}
              />
            ))
          ) : (
            <tr>
              <td
                colSpan={7}
                className="
                py-20
                text-center
                text-slate-400
              "
              >
                Tidak ada riwayat transaksi.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* FOOTER */}

      <div
        className="
        flex
        items-center
        justify-between
        border-t
        border-slate-200
        px-8
        py-5
        bg-white
      "
      >
        <div className="text-sm text-slate-500">
          Menampilkan{" "}
          <span className="font-semibold">
            {filteredHistory.length === 0 ? 0 : startIndex + 1}
          </span>
          -
          <span className="font-semibold">
            {Math.min(endIndex, filteredHistory.length)}
          </span>{" "}
          dari <span className="font-semibold">{filteredHistory.length}</span>{" "}
          transaksi
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
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

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`
        h-10
        w-10
        rounded-xl
        font-semibold
        ${
          currentPage === i + 1
            ? "bg-indigo-600 text-white"
            : "border border-slate-200 hover:bg-slate-100"
        }
      `}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
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
    </div>
  );
}
