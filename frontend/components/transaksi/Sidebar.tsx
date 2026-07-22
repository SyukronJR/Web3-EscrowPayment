"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiCreditCard, FiClock, FiInfo } from "react-icons/fi";
import { BrowserProvider, formatEther } from "ethers";
import { useEffect, useState } from "react";
import { useWallet } from "@/context/WalletContext";
import Image from "next/image";

const menus = [
  {
    name: "Dashboard",
    href: "/",
    icon: <FiHome size={22} />,
  },
  {
    name: "Transaksi",
    href: "/transaksi",
    icon: <FiCreditCard size={22} />,
  },
  {
    name: "About",
    href: "/about",
    icon: <FiInfo size={22} />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const { account } = useWallet();

  const [balance, setBalance] = useState("0.0000");

  const [usdBalance, setUsdBalance] = useState("0.00");

  useEffect(() => {
    async function loadBalance() {
      if (!account || !(window as any).ethereum) {
        setBalance("0.0000");
        return;
      }

      try {
        const provider = new BrowserProvider((window as any).ethereum);

        const bal = await provider.getBalance(account);

        setBalance(Number(formatEther(bal)).toFixed(4));

        const eth = Number(formatEther(bal));
        setBalance(eth.toFixed(4));
        const ETH_PRICE = 3200;
        setUsdBalance((eth * ETH_PRICE).toFixed(2));
      } catch (err) {
        console.error(err);
      }
    }

    loadBalance();
  }, [account]);

  return (
    <aside
      className="
      flex
      flex-col
      w-[270px]
      min-h-screen
      border-r
      border-[#EEF2F7]
      bg-white
      px-7
      py-8
      "
    >
      {/* Logo */}

      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600">
          <span className="text-white font-bold">E</span>
        </div>

        <h2 className="text-[24px] font-bold text-slate-900">EscrowPay</h2>
      </div>

      {/* Menu */}

      <nav className="mt-10 space-y-1">
        {menus.map((menu) => (
          <Link
            key={menu.href}
            href={menu.href}
            className={`
              flex
              items-center
              gap-4
              rounded-xl
              px-4
              py-3
              transition-all
              duration-200

              ${
                pathname === menu.href
                  ? "bg-[#EEF2FF] text-indigo-600 font-semibold"
                  : "text-slate-600 hover:bg-slate-100"
              }
            `}
          >
            {menu.icon}
            {menu.name}
          </Link>
        ))}
      </nav>

      {/* Wallet */}

      <div className="mt-auto">
        <div
          className="
          rounded-[28px]
          border
          border-[#E8EDF5]
          bg-white
          p-7
          shadow-[0_12px_35px_rgba(15,23,42,.06)]
          "
        >
          <p className="text-[15px] font-medium text-slate-400">Wallet</p>

          <h3 className="mt-2 text-[18px] font-bold tracking-tight text-slate-900">
            {account
              ? `${account.slice(0, 6)}...${account.slice(-4)}`
              : "Belum Connect"}
          </h3>

          <div
            className="
              mt-3
              flex
              items-center
              gap-2
              "
          >
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

            <span
              className="
                text-[14px]
                font-medium
                text-emerald-600
                "
            >
              {account ? "Ethereum Mainnet" : "Belum Terhubung"}
            </span>
          </div>

          <div className="mt-5 border-t border-[#EEF2F7] pt-5">
            <p className="text-[-15px] font-medium text-slate-500">Balance</p>

            <div
              className="
              mt-3
              flex
              items-center
              gap-3
              "
            >
              <Image
                src="/tokens/eth.png"
                alt="Ethereum"
                width={22}
                height={22}
              />

              <span
                className="
                text-[18px]
                font-bold
                text-slate-900
                "
              >
                {balance} ETH
              </span>
            </div>

            <p
              className="
              mt-2
              text-[14px]
              text-slate-500
              "
            >
              ≈ ${usdBalance} USD
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
