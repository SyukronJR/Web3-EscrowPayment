"use client";

import { FiSearch, FiCalendar, FiFilter } from "react-icons/fi";

interface Props {
  search: string;
  setSearch: (value: string) => void;

  statusFilter: string;
  setStatusFilter: (value: string) => void;
}

export default function HistoryToolbar({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
}: Props) {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
      {/* Search */}

      <div className="relative flex-1 min-w-[350px]">
        <FiSearch
          size={20}
          className="
            absolute
            left-5
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari ID, Seller, Buyer atau Token..."
          className="
            h-12
            w-full
            rounded-2xl
            border
            border-slate-200
            bg-white
            pl-14
            pr-5
            text-[15px]
            shadow-sm
            outline-none
            transition-all
            duration-300
            placeholder:text-slate-400
            focus:border-indigo-500
            focus:ring-4
            focus:ring-indigo-100
          "
        />
      </div>

      {/* Status */}

      <div className="relative">
        <FiFilter
          size={18}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-400
            pointer-events-none
          "
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="
            h-12
            w-[200px]
            appearance-none
            rounded-2xl
            border
            border-slate-200
            bg-white
            pl-11
            pr-10
            text-[15px]
            shadow-sm
            outline-none
            transition-all
            duration-300
            focus:border-indigo-500
            focus:ring-4
            focus:ring-indigo-100
          "
        >
          <option value="All">Semua Status</option>
          <option value="Released">Released</option>
          <option value="Refunded">Refunded</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Date */}

      <button
        className="
          flex
          h-12
          w-[210px]
          items-center
          justify-between
          rounded-2xl
          border
          border-slate-200
          bg-white
          px-5
          text-[15px]
          text-slate-600
          shadow-sm
          transition-all
          duration-300
          hover:border-indigo-400
          hover:bg-indigo-50
        "
      >
        <span>Pilih Tanggal</span>

        <FiCalendar size={18} />
      </button>
    </div>
  );
}
