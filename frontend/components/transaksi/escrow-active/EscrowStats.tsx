"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getContract, getReadOnlyContract } from "@/lib/contract";

export default function EscrowStats() {
  const [stats, setStats] = useState([
    {
      title: "Total Escrow Aktif",
      value: "0",
      desc: "Transaksi Berjalan",
    },
    {
      title: "Dana Ditahan",
      value: "0 ETH",
      desc: "Smart Contract",
    },
    {
      title: "Dana Berhasil Dilepas",
      value: "0 ETH",
      desc: "Released",
    },
    {
      title: "Riwayat Transaksi",
      value: "0",
      desc: "Transaksi Selesai",
    },
  ]);

  const [lockedStats, setLockedStats] = useState({
    ETH: 0,
    USDT: 0,
    USDC: 0,
    DAI: 0,
    LINK: 0,
  });

  const [releasedStats, setRealeasedStats] = useState({
    ETH: 0,
    USDT: 0,
    USDC: 0,
    DAI: 0,
    LINK: 0,
  });

  async function loadStats() {
    try {
      const contract = await getReadOnlyContract();

      const totalEscrow = Number(await contract.getEscrowCount());

      let active = 0;

      let history = 0;

      let locked = {
        ETH: 0,
        USDT: 0,
        USDC: 0,
        DAI: 0,
        LINK: 0,
      };

      let released = {
        ETH: 0,
        USDT: 0,
        USDC: 0,
        DAI: 0,
        LINK: 0,
      };

      for (let i = 1; i <= totalEscrow; i++) {
        const escrow = await contract.getEscrow(i);

        const status = Number(escrow.status);

        const amount = Number(ethers.formatEther(escrow.amount));

        let symbol = "ETH";

        if (escrow.token === "0x32A79565F56a77821F7b2e6608db8e46CF38C5db") {
          symbol = "USDC";
        } else if (
          escrow.token === "0x0754aae2f458f035BBaf9054A4F18CE5ee300608"
        ) {
          symbol = "USDT";
        } else if (
          escrow.token === "0x48A38d2734603e6b15466A9D1ECaA5e061591985"
        ) {
          symbol = "DAI";
        } else if (
          escrow.token === "0x30E3b7E6909a5e2A9D39e170662dbd2e037b44dE"
        ) {
          symbol = "LINK";
        }

        // CREATED

        if (status === 0) {
          active++;
        }

        // FUND & DELIVERED
        if (status === 1 || status === 2) {
          active++;

          locked[symbol] += amount;
        }

        // RELEASED

        if (status === 3) {
          history++;

          released[symbol] += amount;
        }

        // REFUNDED
        // CANCELLED

        if (status === 4 || status === 5) {
          history++;
        }
      }

      setStats([
        {
          title: "Total Escrow Aktif",
          value: active.toString(),
          desc: "Transaksi Berjalan",
        },
        {
          title: "Dana Ditahan",
          value: "",
          desc: "Smart Contract",
        },
        {
          title: "Dana Berhasil Dilepas",
          value: "",
          desc: "Released",
        },
        {
          title: "Riwayat Transaksi",
          value: history.toString(),
          desc: "Transaksi Selesai",
        },
      ]);

      setLockedStats(locked);
      setRealeasedStats(released);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    let contract: any;

    async function init() {
      contract = await getContract();

      await loadStats();

      contract.on("EscrowCreated", loadStats);

      contract.on("EscrowFunded", loadStats);

      contract.on("Delivered", loadStats);

      contract.on("Released", loadStats);

      contract.on("Refunded", loadStats);

      contract.on("Cancelled", loadStats);

      contract.on("TimeoutRefunded", loadStats);

      contract.on("TimeoutReleased", loadStats);
    }

    init();

    return () => {
      if (!contract) return;

      contract.off("EscrowCreated", loadStats);

      contract.off("EscrowFunded", loadStats);

      contract.off("Delivered", loadStats);

      contract.off("Released", loadStats);

      contract.off("Refunded", loadStats);

      contract.off("Cancelled", loadStats);

      contract.off("TimeoutRefunded", loadStats);

      contract.off("TimeoutReleased", loadStats);
    };
  }, []);

  return (
    <div className="grid grid-cols-4 gap-6">
      {stats.map((item) => (
        <div
          key={item.title}
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-6
            shadow-sm
          "
        >
          <p className="text-[15px] font-medium text-slate-500">{item.title}</p>

          {item.title === "Dana Ditahan" ? (
            Object.values(lockedStats).every((v) => v === 0) ? (
              <h2 className="mt-3 text-[34px] font-bold tracking-tight text-slate-900">
                0
              </h2>
            ) : (
              <div className="mt-2 space-y-[2]">
                {Object.entries(lockedStats)
                  .filter(([_, value]) => value > 0)
                  .map(([symbol, value]) => (
                    <div
                      key={symbol}
                      className="flex justify-between text-lg font-semibold"
                    >
                      <span>{symbol}</span>
                      <span>{value.toFixed(4)}</span>
                    </div>
                  ))}
              </div>
            )
          ) : item.title === "Dana Berhasil Dilepas" ? (
            Object.values(releasedStats).every((v) => v === 0) ? (
              <h2 className="mt-3 text-[34px] font-bold tracking-tight text-slate-900">
                0
              </h2>
            ) : (
              <div className="mt-2 space-y-[2]">
                {Object.entries(releasedStats)
                  .filter(([_, value]) => value > 0)
                  .map(([symbol, value]) => (
                    <div
                      key={symbol}
                      className="flex justify-between text-lg font-semibold"
                    >
                      <span>{symbol}</span>
                      <span>{value.toFixed(4)}</span>
                    </div>
                  ))}
              </div>
            )
          ) : (
            <h2 className="mt-3 text-[34px] font-bold tracking-tight text-slate-900">
              {item.value}
            </h2>
          )}

          <p className="mt-2 text-[15px] text-slate-400">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}
