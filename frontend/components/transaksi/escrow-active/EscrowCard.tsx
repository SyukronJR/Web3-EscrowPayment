"use client";

import Image from "next/image";

interface Props {
  escrowId: number;
  token: string;
  logo: string;
  seller: string;
  buyer: string;
  amount: string;
  usd?: string;
  status: string;
  deadline: string;
  deadlineTimestamp: number;

  onFund?: () => void;
  onDeliver?: () => void;
  onRefund?: () => void;
  onRelease?: () => void;
  onCancel?: () => Void;
  onDetail?: () => void;
}

export default function EscrowCard({
  token,
  logo,
  seller,
  buyer,
  amount,
  usd,
  status,
  deadline,
  deadlineTimestamp,
  onFund,
  onDeliver,
  onRefund,
  onRelease,
  onCancel,
  onDetail,
}: Props) {
  const shorten = (address: string) =>
    `${address.slice(0, 6)}...${address.slice(-4)}`;

  const statusColor = () => {
    switch (status) {
      case "Created":
        return "bg-gray-100 text-gray-700";

      case "Funded":
        return "bg-yellow-100 text-yellow-700";

      case "Delivered":
        return "bg-blue-100 text-blue-700";

      case "Released":
        return "bg-green-100 text-green-700";

      case "Refunded":
        return "bg-red-100 text-red-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const statusLabel = () => {
    switch (status) {
      case "Created":
        return "Menunggu Pendanaan";

      case "Funded":
        return "Menunggu Pengiriman";

      case "Delivered":
        return "Menunggu Konfirmasi";

      case "Released":
        return "Selesai";

      case "Refunded":
        return "Dana Dikembalikan";

      case "Cancelled":
        return "Dibatalkan";

      default:
        return status;
    }
  };

  return (
    <div className="mt-5 rounded-3xl border border-slate-200 bg-white px-8 py-7 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between">
        {/* Logo */}

        <div className="flex w-20 justify-center">
          <Image src={logo} alt={token} width={68} height={68} />
        </div>

        {/* Seller Buyer */}

        <div className="w-[220px]">
          <p className="text-xs text-slate-500">Seller</p>

          <p className="text-[16px] font-semibold">{shorten(seller)}</p>

          <div className="h-4" />

          <p className="text-xs text-slate-500">Buyer</p>

          <p className="text-[16px] font-semibold">{shorten(buyer)}</p>
        </div>

        {/* Token */}

        <div className="w-[170px]">
          <p className="text-xs text-slate-500">Token</p>

          <h3 className="mt-1 text-[22px] font-bold">{token}</h3>

          <div className="mt-2" />

          <p className="text-xs text-slate-500">Amount</p>

          <h3 className="text-[22px] font-bold">{amount}</h3>

          {usd && <p className="text-xs text-slate-400">≈ {usd}</p>}
        </div>

        {/* Status */}

        <div className="w-[210px]">
          <span
            className={`
              inline-flex
              rounded-full
              px-4
              py-2
              text-xs
              font-semibold
              ${statusColor()}
            `}
          >
            {statusLabel()}
          </span>

          <div className="mt-5" />

          <p className="text-xs text-slate-500">Deadline</p>

          <p className="mt-1 text-[15px] font-semibold">{deadline}</p>
        </div>

        {/* Button */}

        <div className="flex justify-end">
          {status === "Created" ? (
            <div className="flex gap-3">
              <button
                onClick={onFund}
                className="
          rounded-xl
          bg-indigo-600
          px-5
          py-2.5
          font-semibold
          text-white
          transition
          hover:bg-indigo-700
        "
              >
                Fund
              </button>

              <button
                onClick={onCancel}
                className="
          rounded-xl
          border
          border-red-500
          px-5
          py-2.5
          font-semibold
          text-red-600
          transition
          hover:bg-red-50
        "
              >
                Cancel
              </button>
            </div>
          ) : status === "Funded" ? (
            Math.floor(Date.now() / 1000) > deadlineTimestamp ? (
              <button
                onClick={onRefund}
                className="
          h-11
          rounded-xl
          bg-red-600
          px-6
          font-semibold
          text-white
          transition
          hover:bg-red-700
        "
              >
                Claim Refund
              </button>
            ) : (
              <button
                onClick={onDeliver}
                className="
          h-11
          rounded-xl
          bg-indigo-600
          px-6
          font-semibold
          text-white
          transition
          hover:bg-indigo-700
        "
              >
                Mark Delivered
              </button>
            )
          ) : status === "Delivered" ? (
            <button
              onClick={onRelease}
              className="
        h-11
        rounded-xl
        bg-green-600
        px-6
        font-semibold
        text-white
        transition
        hover:bg-green-700
      "
            >
              Confirm Release
            </button>
          ) : (
            <button
              onClick={onDetail}
              className="
        h-11
        w-32
        rounded-xl
        border
        border-indigo-500
        text-[15px]
        font-semibold
        text-indigo-600
        transition
        hover:bg-indigo-50
      "
            >
              Detail
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
