"use client";

import { useState } from "react";
import { ethers } from "ethers";

import TokenDropdown, { tokens } from "@/components/transaksi/TokenDropdown";
import { createEscrow } from "@/lib/createEscrow";
import toast from "react-hot-toast";
import { FiUser, FiShield } from "react-icons/fi";

export default function CreateEscrowCard() {
  const [selectedToken, setSelectedToken] = useState(tokens[0]);

  const [seller, setSeller] = useState("");

  const [amount, setAmount] = useState("");

  const [deadline, setDeadline] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleCreateEscrow() {
    try {
      setLoading(true);

      const parsedAmount = ethers.parseUnits(amount, selectedToken.decimals);

      const deadlineTimestamp = Math.floor(new Date(deadline).getTime() / 1000);

      const hash = await createEscrow(
        seller,

        selectedToken.address,

        parsedAmount,

        deadlineTimestamp,
      );

      console.log(hash);

      toast.success("Escrow berhasil dibuat.");

      setSeller("");

      setAmount("");

      setDeadline("");
    } catch (err: any) {
      console.log(err);

      toast.error(err.reason || err.shortMessage || "Transaksi gagal");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
  w-full
  rounded-[30px]
  border
  border-[#ECEEF5]
  bg-white
  px-10
  py-10
  shadow-[0_15px_40px_rgba(15,23,42,.06)]
  "
    >
      <h2
        className="
          mb-9
          text-[20px]
          font-extrabold
          tracking-[-0.02em]
          text-slate-900
          "
      >
        Buat Escrow Baru
      </h2>

      {/* Seller */}

      <div className="mt-7">
        <label className="mb-3 block text-[16px] font-semibold text-slate-800">
          Alamat Seller
        </label>

        <div className="relative">
          <FiUser
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
            type="text"
            value={seller}
            onChange={(e) => setSeller(e.target.value)}
            placeholder="0x..."
            className="
              w-full
              h-[60px]
              rounded-2xl
              border
              border-[#E5E7F0]
              bg-white
              pl-14
              pr-5
              text-[16px]
              text-slate-800
              placeholder:text-slate-400
              outline-none
              transition-all
              focus:border-indigo-500
              focus:ring-4
              focus:ring-indigo-100
            "
          />
        </div>
      </div>

      {/* Token */}

      <div className="mt-6">
        <label className="mb-3 block text-[16px] font-semibold text-slate-800">
          Token
        </label>

        <TokenDropdown
          selected={selectedToken}
          setSelected={setSelectedToken}
        />
      </div>

      {/* Amount */}

      <div className="mt-6">
        <label className="mb-3 block text-[16px] font-semibold text-slate-800">
          Jumlah
        </label>

        <div className="relative">
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="
              h-14
              w-full
              rounded-xl
              border
              border-slate-200
              px-4
              pr-20
              outline-none
            "
          />

          <span
            className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-sm
            text-slate-500
            "
          >
            {selectedToken.symbol}
          </span>
        </div>
      </div>

      {/* Deadline */}

      <div className="mt-6">
        <label className="mb-3 block text-[16px] font-semibold text-slate-800">
          Batas Waktu
        </label>

        <div className="relative">
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="
            w-full
            h-[60px]
            rounded-2xl
            border
            border-[#E5E7F0]
            bg-white
            px-5
            pr-5
            text-[16px]
            text-slate-800
            outline-none
            transition-all
            focus:border-indigo-500
            focus:ring-4
            focus:ring-indigo-100
          "
          />

          <div
            className="
              absolute
              right-5
              top-1/2
              flex
              -translate-y-1/2
              items-center
              gap-3
              text-slate-500
            "
          ></div>
        </div>
      </div>

      {/* Button */}

      <button
        onClick={handleCreateEscrow}
        disabled={loading}
        className="
        mt-10
        flex
        h-[60px]
        w-full
        items-center
        justify-center
        gap-3
        rounded-2xl
        bg-gradient-to-r
        from-indigo-600
        via-violet-600
        to-indigo-700
        text-[19px]
        font-bold
        text-white
        shadow-[0_18px_35px_rgba(99,102,241,.30)]
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:shadow-[0_22px_45px_rgba(99,102,241,.40)]
        disabled:cursor-not-allowed
        disabled:opacity-60
      "
      >
        <FiShield size={22} />

        {loading ? "Membuat Escrow..." : "Buat Escrow"}
      </button>
    </div>
  );
}
