"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaWallet } from "react-icons/fa";
import { useWallet } from "@/context/WalletContext";

export default function Navbar() {
  const pathname = usePathname();

  const { account, connectWallet } = useWallet();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-[1250px] items-center px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600">
            <span className="text-white font-bold">E</span>
          </div>

          <h1 className="text-3xl font-bold text-slate-900">EscrowPay</h1>
        </Link>

        {/* Menu */}
        <div className="ml-auto flex items-center gap-20">
          <nav>
            <ul className="flex items-center gap-12">
              <li>
                <Link
                  href="/"
                  className={`pb-1 font-semibold transition ${
                    pathname === "/"
                      ? "border-b-2 border-indigo-600 text-indigo-600"
                      : "text-slate-600 hover:text-indigo-600"
                  }`}
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  href="/transaksi"
                  className={`pb-1 font-semibold transition ${
                    pathname === "/transaksi"
                      ? "border-b-2 border-indigo-600 text-indigo-600"
                      : "text-slate-600 hover:text-indigo-600"
                  }`}
                >
                  Transaksi
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className={`pb-1 font-semibold transition ${
                    pathname === "/about"
                      ? "border-b-2 border-indigo-600 text-indigo-600"
                      : "text-slate-600 hover:text-indigo-600"
                  }`}
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>

          <button
            onClick={connectWallet}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-indigo-700"
          >
            <FaWallet />

            {account
              ? `${account.slice(0, 6)}...${account.slice(-4)}`
              : "Connect Wallet"}
          </button>
        </div>
      </div>
    </header>
  );
}
