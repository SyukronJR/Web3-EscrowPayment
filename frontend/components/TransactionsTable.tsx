"use client";

import { useEffect, useState } from "react";
import { getContract } from "../lib/contract";
import { ethers } from "ethers";

export default function TransactionsTable() {

  const [rows, setRows] = useState<any[]>([]);

  function shorten(addr: string) {
    return addr.slice(0,6) + "..." + addr.slice(-4);
  }

  function getStatus(state:number){

    if(state === 0) return "Created";
    if(state === 1) return "Funded";
    if(state === 2) return "Delivered";
    if(state === 3) return "Disputed";
    if(state === 4) return "Released";
    if(state === 5) return "Refunded";

    return "Unknown";
  }

  function formatTime(ts:any){

    if(Number(ts) === 0) return "-";

    return new Date(Number(ts) * 1000)
      .toLocaleDateString();

  }

  async function loadEscrows(){

    const contract = await getContract();

    const count = await contract.escrowCount();

    const list = [];

    for(let i = 0; i < Number(count); i++){

      const e = await contract.escrows(i);

      list.push({
        id: i,
        buyer: e.buyer,
        seller: e.seller,
        amount: ethers.formatEther(e.amount),
        status: getStatus(Number(e.state)),
        created: formatTime(e.createdAt)
      });

    }

    setRows(list.reverse());

  }

  useEffect(() => {
    loadEscrows();
  }, []);

  return (

    <div
      style={{
        background:"white",
        borderRadius:"12px",
        padding:"20px",
        border:"1px solid #e5e7eb",
        boxShadow:"0 4px 10px rgba(0,0,0,0.05)"
      }}
    >

      <h2
        style={{
          fontSize:"18px",
          fontWeight:"600",
          marginBottom:"16px"
        }}
      >
        Escrow Transactions
      </h2>

      <table style={{ width:"100%" }}>

        <thead>

          <tr style={{ textAlign:"left", color:"#6b7280" }}>
            <th>Escrow ID</th>
            <th>From</th>
            <th>To</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>

        </thead>

        <tbody>

          {rows.map((tx, i) => (

            <tr key={i} style={{ borderTop:"1px solid #eee" }}>

              <td>{tx.id}</td>
              <td>{shorten(tx.buyer)}</td>
              <td>{shorten(tx.seller)}</td>
              <td>{tx.amount} ETH</td>
              <td>{tx.status}</td>
              <td>{tx.created}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}