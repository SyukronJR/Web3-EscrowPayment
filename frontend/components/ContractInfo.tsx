"use client";

import { contractAddress } from "../lib/contract";

export default function ContractInfo() {

  const deployer =
    "0x51dbcCD158130cd99ac8335459346378d5CF2389";

  function shorten(addr: string) {
    return addr.slice(0,6) + "..." + addr.slice(-4);
  }

  return (

    <div
      style={{
        background: "white",
        borderRadius: "12px",
        padding: "20px",
        border: "1px solid #e5e7eb",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
      }}
    >

      <h2
        style={{
          fontSize:"18px",
          fontWeight:"600",
          marginBottom:"12px"
        }}
      >
        More Information
      </h2>

      <p style={{ marginBottom:"6px" }}>
        Contract Creator :
        {" "}
        {shorten(deployer)}
      </p>

      <p>
        Contract Address :
        {" "}
        {shorten(contractAddress)}
      </p>

    </div>

  );
}