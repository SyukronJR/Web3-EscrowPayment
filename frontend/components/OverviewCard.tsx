"use client";

import { useEffect, useState } from "react";
import { getContract } from "../lib/contract";
import { ethers } from "ethers";

export default function OverviewCard() {

  const [balance, setBalance] = useState("0");
  const [totalEscrow, setTotalEscrow] = useState(0);
  const [activeEscrow, setActiveEscrow] = useState(0);
  const [completedEscrow, setCompletedEscrow] = useState(0);

  async function loadData() {

    const contract = await getContract();

    const provider = new ethers.BrowserProvider(
      (window as any).ethereum
    );

    const contractAddress = await contract.getAddress();

    const bal = await provider.getBalance(contractAddress);

    setBalance(ethers.formatEther(bal));

    const count = await contract.escrowCount();

    let active = 0;
    let completed = 0;

    for (let i = 0; i < count; i++) {

      const escrow = await contract.escrows(i);

      if (escrow.state == 0 || escrow.state == 1) {
        active++;
      }

      if (escrow.state == 2) {
        completed++;
      }

    }

    setTotalEscrow(Number(count));
    setActiveEscrow(active);
    setCompletedEscrow(completed);

  }

  useEffect(() => {
    loadData();
  }, []);

  return (

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "20px",
        marginTop: "20px"
      }}
    >

      {/* Balance */}

      <div className="overview-card" style={cardStyle}>
        <p style={labelStyle}>Contract Balance</p>
        <h2 style={valueStyle}>{balance} ETH</h2>
      </div>

      {/* Total */}

      <div className="overview-card" style={cardStyle}>
        <p style={labelStyle}>Total Escrow</p>
        <h2 style={valueStyle}>{totalEscrow}</h2>
      </div>

    </div>

  );
}

const cardStyle = {
  background: "rgba(255,255,255,0.05)",
  borderRadius: "16px",
  padding: "24px",
  border: "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 0 15px rgba(56,189,248,0.15)",
  transition: "0.3s"
};

const labelStyle = {
  color: "#94a3b8",
  marginBottom: "6px",
  fontSize: "14px"
};

const valueStyle = {
  fontSize: "26px",
  fontWeight: "700",
  color: "#38bdf8"
};