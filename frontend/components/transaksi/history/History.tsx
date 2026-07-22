"use client";

import { useState } from "react";

import HistoryToolbar from "./HistoryToolbar";
import HistoryTable from "./HistoryTable";
import EscrowDetailModal from "../escrow-active/EscrowDetailModal";
import {
  FiFileText,
  FiCheckCircle,
  FiRotateCcw,
  FiXCircle,
} from "react-icons/fi";

export default function History() {
  const [open, setOpen] = useState(false);

  const [selectedHistory, setSelectedHistory] = useState<any>(null);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedDate, setSelectedDate] = useState("");

  const [stats, setStats] = useState({
    total: 0,
    released: 0,
    refunded: 0,
    cancelled: 0,
  });

  const cards = [
    {
      title: "Total Riwayat",
      value: stats.total,
      subtitle: "Semua transaksi",
      icon: FiFileText,
      iconBg: "bg-slate-100",
      iconColor: "text-violet-600",
    },

    {
      title: "Released",
      value: stats.released,
      subtitle: "Transaksi berhasil",
      icon: FiCheckCircle,
      iconBg: "bg-slate-100",
      iconColor: "text-emerald-600",
    },

    {
      title: "Refunded",
      value: stats.refunded,
      subtitle: "Dana dikembalikan",
      icon: FiRotateCcw,
      iconBg: "bg-slate-100",
      iconColor: "text-red-600",
    },

    {
      title: "Cancelled",
      value: stats.cancelled,
      subtitle: "Transaksi dibatalkan",
      icon: FiXCircle,
      iconBg: "bg-slate-100",
      iconColor: "text-blue-600",
    },
  ];

  return (
    <div className="mt-10">
      {/* Statistik */}

      <div className="mb-8 grid grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-4
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-lg
            "
            >
              <div className="flex items-center gap-4">
                <div
                  className={`
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  ${card.iconBg}
                `}
                >
                  <Icon size={22} className={card.iconColor} />
                </div>

                <div>
                  <p className="text-sm text-slate-500">{card.title}</p>

                  <h2 className="mt-1 text-2xl font-bold text-slate-900">
                    {card.value}
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">{card.subtitle}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Toolbar */}

      <HistoryToolbar
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      {/* Table */}

      <HistoryTable
        search={search}
        statusFilter={statusFilter}
        onStatsChange={setStats}
        onView={(item) => {
          setSelectedHistory(item);
          setOpen(true);
        }}
      />

      {/* Modal */}

      {open && selectedHistory && (
        <EscrowDetailModal
          escrow={selectedHistory}
          onClose={() => {
            setOpen(false);
            setSelectedHistory(null);
          }}
        />
      )}
    </div>
  );
}
