"use client";

import Image from "next/image";
import { FiX, FiCopy, FiExternalLink } from "react-icons/fi";

import { useEffect, useState } from "react";
import { BrowserProvider, ethers } from "ethers";

import EscrowPayment from "@/abi/EscrowPayment.json";
import { CONTRACT_ADDRESS } from "@/constants/contract";
import { tokens } from "../TokenDropdown";

interface Props {
  escrow: any;
  onClose: () => void;
}

export default function EscrowDetailModal({ escrow, onClose }: Props) {
  const [detail, setDetail] = useState<any>(null);

  useEffect(() => {
    if (escrow) {
      loadEscrow();
    }
  }, [escrow]);

  if (!escrow) return null;

  if (!detail) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40">
        <div className="rounded-2xl bg-white px-8 py-6 shadow-xl">
          Memuat Detail Escrow...
        </div>
      </div>
    );
  }

  async function loadEscrow() {
    try {
      if (!window.ethereum || !escrow) return;

      const provider = new BrowserProvider(window.ethereum);

      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        EscrowPayment.abi,
        signer,
      );

      const data = await contract.getEscrow(escrow.id);
      const txHash = await contract.getTxHash(escrow.id);

      console.log(data[1]);
      console.log(data[2]);
      console.log(data[11]);
      console.log("keys =", Object.keys(data));
      console.log("DATA ESCROW:", data);

      const tokenInfo =
        tokens.find(
          (t) => t.address.toLowerCase() === data.token.toLowerCase(),
        ) || tokens[0];

      setDetail({
        id: Number(data[0]),

        buyer: data[1],
        seller: data[2],
        token: data[3],

        amount: ethers.formatUnits(data[4], tokenInfo.decimals),

        platformFee: `${ethers.formatUnits(
          data[5],
          tokenInfo.decimals,
        )} ${tokenInfo.symbol}`,

        createdAt: new Date(Number(data[6]) * 1000).toLocaleString(),

        fundedAt:
          Number(data[7]) > 0
            ? new Date(Number(data[7]) * 1000).toLocaleString()
            : "-",

        deadline: new Date(Number(data[8]) * 1000).toLocaleString(),

        deliveredAt:
          Number(data[9]) > 0
            ? new Date(Number(data[9]) * 1000).toLocaleString()
            : "-",

        releasedAt:
          Number(data[10]) > 0
            ? new Date(Number(data[10]) * 1000).toLocaleString()
            : "-",

        status: Number(data[11]),

        sellerReceived: `${ethers.formatUnits(
          data[4] - data[5],
          tokenInfo.decimals,
        )} ${tokenInfo.symbol}`,

        logo: tokenInfo.image,
        symbol: tokenInfo.symbol,
        network: "Ethereum",

        txHash,
      });
    } catch (err) {
      console.error(err);
    }
  }

  // const shorten = (address: string) =>
  //   `${address.slice(0, 6)}...${address.slice(-4)}`;

  const shorten = (address?: string) => {
    if (!address) return "-";

    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  console.log("DETAIL:", detail);

  const status = Number(detail.status);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-[560px] rounded-[34px] bg-white shadow-2xl">
        {/* Header */}

        <div className="items-center justify-between border-[#EEF2F7] px-47  mt-8">
          <h2 className="text-[24px] font-extrabold text-slate-900">
            Detail Escrow
          </h2>
        </div>

        {/* Body */}

        <div className="p-10">
          {/* Token Card */}

          <div className="rounded-2xl border border-[#EEF2F7] p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src={detail.logo}
                  width={40}
                  height={40}
                  alt={detail.symbol}
                />

                <h3 className="text-xl font-bold leading-none">
                  {detail.symbol}
                </h3>
              </div>

              <span
                className={`
    rounded-full
    px-3
    py-1
    text-xs
    font-semibold

    ${
      status === 3
        ? "bg-green-100 text-green-700"
        : status === 4
          ? "bg-red-100 text-red-700"
          : status === 5
            ? "bg-slate-100 text-slate-700"
            : "bg-orange-100 text-orange-700"
    }
  `}
              >
                {status === 3
                  ? "Released"
                  : status === 4
                    ? "Refunded"
                    : status === 5
                      ? "Cancelled"
                      : "Pending"}
              </span>
            </div>
          </div>

          {/* Detail */}

          <div className="mt-4">
            <Row
              title="Status"
              value={
                status === 3
                  ? "Released"
                  : status === 4
                    ? "Refunded"
                    : status === 5
                      ? "Cancelled"
                      : "Pending"
              }
            />

            <Row title="Token" value={detail.symbol} />

            <Row title="Amount" value={`${detail.amount} ${detail.symbol}`} />

            <CopyRow
              title="Buyer"
              value={detail.buyer}
              short={shorten(detail.buyer)}
              copy={copy}
            />

            <CopyRow
              title="Seller"
              value={detail.seller}
              short={shorten(detail.seller)}
              copy={copy}
            />

            <CopyRow
              title="Smart Contract"
              value={process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ""}
              short={shorten(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "")}
              copy={copy}
            />

            <Row title="Deadline" value={detail.deadline} />

            <Row title="Created" value={detail.createdAt} />

            <Row title="Funded At" value={detail.fundedAt} />

            <Row title="Delivered At" value={detail.deliveredAt} />

            <Row title="Released At" value={detail.releasedAt} />

            <Row title="Network" value="Ethereum" />

            <Row title="Platform Fee" value={detail.platformFee || "-"} />

            <Row title="Seller Received" value={detail.sellerReceived || "-"} />
          </div>

          {/* Footer */}

          <div className="mt-6 flex gap-3">
            {/* <button
              className="
                flex-1
                rounded-xl
                border
                border-indigo-500
                py-2
                font-semibold
                text-indigo-600
                transition
                hover:bg-indigo-50
              "
            >
              <div className="flex items-center justify-center gap-2">
                <FiExternalLink />
                Lihat di Etherscan
              </div>
            </button> */}

            <a
              href={`https://sepolia.etherscan.io/tx/${detail.txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="
    flex-1
    rounded-xl
    border
    border-indigo-500
    py-2
    font-semibold
    text-indigo-600
    transition
    hover:bg-indigo-50
    flex
    items-center
    justify-center
    gap-2
  "
            >
              <FiExternalLink />
              Lihat di Etherscan
            </a>

            <button
              onClick={onClose}
              className="
                flex-1
                rounded-xl
                bg-indigo-600
                py-2
                font-semibold
                text-white
                transition
                hover:bg-indigo-700
              "
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ title, value }: any) {
  return (
    <div className="flex items-center justify-between border-b border-[#EEF2F7] py-1">
      <span className="text-sm text-slate-500">{title}</span>

      <span className="text-sm font-medium text-slate-900">{value}</span>
    </div>
  );
}

function CopyRow({ title, value, short, copy }: any) {
  return (
    <div className="flex items-center justify-between border-b border-[#EEF2F7] py-1.5">
      <span className="text-sm text-slate-500">{title}</span>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{short}</span>

        <button onClick={() => copy(value)}>
          <FiCopy className="text-slate-500 hover:text-indigo-600" />
        </button>
      </div>
    </div>
  );
}
