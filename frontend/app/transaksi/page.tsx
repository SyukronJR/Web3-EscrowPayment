"use client";

import { useState } from "react";

import Sidebar from "@/components/transaksi/Sidebar";
import TransactionHeader from "@/components/transaksi/TransactionHeader";
import TransactionTabs from "@/components/transaksi/TransactionTabs";

import CreateEscrowCard from "@/components/transaksi/CreateEscrowCard";
import WorkflowCard from "@/components/transaksi/WorkflowCard";

import ActiveEscrow from "@/components/transaksi/escrow-active/ActiveEscrow";
import History from "@/components/transaksi/history/History";
import ContractInfo from "@/components/transaksi/ContractInfo";

export default function TransaksiPage() {
  const [activeTab, setActiveTab] = useState("create");

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto flex max-w-[1500px]">
        <Sidebar />

        <section className="flex-1 px-12 py-10">
          <TransactionHeader />

          <TransactionTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {activeTab === "create" && (
            <>
              <ContractInfo />

              <div
                className="
                mt-10
                grid
                grid-cols-[55%_42%]
                gap-8
                items-start
                "
              >
                <CreateEscrowCard />
                <WorkflowCard />
              </div>
            </>
          )}

          {activeTab === "active" && <ActiveEscrow />}

          {activeTab === "history" && <History />}
        </section>
      </div>
    </main>
  );
}
