"use client";

import Image from "next/image";
import { FiEye } from "react-icons/fi";
import { shortAddress } from "@/lib/shortAddress";

interface Props {
  id: number;
  date: string;
  seller: string;
  buyer: string;
  token: string;
  logo: string;
  amount: string;
  status: string;
  hash: string;
  onView: () => void;
}

export default function HistoryRow({
  id,
  date,
  seller,
  buyer,
  token,
  logo,
  amount,
  status,
  onView,
}: Props) {
  const badge =
    status === "Released"
      ? "bg-emerald-50 text-emerald-600"
      : status === "Refunded"
        ? "bg-red-50 text-red-500"
        : "bg-slate-50 text-slate-600";

  const dot =
    status === "Released"
      ? "bg-emerald-500"
      : status === "Refunded"
        ? "bg-red-500"
        : "bg-slate-500";

  const d = new Date(Number(date) * 1000);

  const tanggal = d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const jam = d.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50 transition">
      {/* ID */}

      <td className="px-7 py-3">
        <span className="font-semibold text-slate-600 text-base">#{id}</span>
      </td>

      {/* DATE */}

      <td className="px-6 py-4">
        <div>
          <p className="text-sm font-medium text-slate-700">{tanggal}</p>

          <p className="text-xs text-slate-400">{jam} WIB</p>
        </div>
      </td>

      {/* PARTY */}

      <td className="px-6 py-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />

            <span className="text-sm text-slate-500">Seller:</span>

            <span className="text-sm font-medium text-slate-800">
              {shortAddress(seller)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-gray-500" />

            <span className="text-sm text-slate-500">Buyer:</span>

            <span className="text-sm font-medium text-slate-800">
              {shortAddress(buyer)}
            </span>
          </div>
        </div>
      </td>

      {/* TOKEN */}

      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <Image src={logo} alt={token} width={28} height={28} />

          <span className="font-semibold text-slate-800">{token}</span>
        </div>
      </td>

      {/* AMOUNT */}

      <td className="px-6 py-4">
        <span className="font-semibold text-slate-900">{amount}</span>
      </td>

      {/* STATUS */}

      <td className="px-6 py-4">
        <span
          className={`
            inline-flex
            items-center
            gap-2
            rounded-full
            px-3
            py-1.5
            text-xs
            font-semibold
            ${badge}
          `}
        >
          <span className={`h-2 w-2 rounded-full ${dot}`} />

          {status}
        </span>
      </td>

      {/* ACTION */}

      <td className="px-6 py-4 text-center">
        <button
          onClick={onView}
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-indigo-200
            bg-white
            px-3
            py-1.5
            text-indigo-600
            font-medium
            hover:bg-indigo-50
            transition
          "
        >
          <FiEye size={15} />
          View
        </button>
      </td>
    </tr>
  );
}
