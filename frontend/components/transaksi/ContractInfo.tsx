"use client";

import Image from "next/image";
import toast from "react-hot-toast";

import { FiCopy, FiExternalLink } from "react-icons/fi";
import { HiCheckBadge } from "react-icons/hi2";

import { CONTRACT_ADDRESS } from "@/constants/contract";

const shortAddress = `${CONTRACT_ADDRESS.slice(
  0,
  10,
)}...${CONTRACT_ADDRESS.slice(-8)}`;

export default function ContractInfo() {
  function copyAddress() {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);

    toast.success("Smart Contract berhasil disalin");
  }

  function openExplorer() {
    window.open(
      `https://sepolia.etherscan.io/address/${CONTRACT_ADDRESS}`,
      "_blank",
    );
  }

  return (
    <section
      className="
      relative
      mt-8
      overflow-hidden
      rounded-[30px]
      border
      border-[#ECEEF5]
      bg-white
      shadow-[0_15px_45px_rgba(99,102,241,.08)]
      "
    >
      {/* Glow Background */}

      <div
        className="
        absolute
        left-1/2
        top-1/2
        h-[420px]
        w-[420px]
        -translate-x-1/2
        -translate-y-1/2
        rounded-full
        bg-violet-400/10
        blur-[130px]
        "
      />

      <div
        className="
        relative
        z-10
        flex
        items-center
        justify-between
        px-9
        py-6
        "
      >
        {/* ================= LEFT ================= */}

        <div className="flex-1 max-w-[760px]">
          <p
            className="
            text-[17px]
            font-medium
            text-slate-500
            "
          >
            Smart Contract Address
          </p>

          {/* Address + Badge */}

          <div
            className="
            mt-2
            py-4
            flex
            items-center
            "
          >
            <h2
              className="
              text-[20px]
              font-extrabold
              tracking-[-0.04em]
              text-slate-900
              -mt-4
              "
            >
              {shortAddress}
            </h2>

            {/* <button
              onClick={copyAddress}
              className="
              ml-4
              rounded-xl
              p-2
              transition
              hover:bg-slate-100
              "
            >
              <FiCopy size={22} className="text-slate-500" />
            </button> */}

            <div
              className="
              ml-1
              flex
              items-center
              gap-4
              -mt-3
              "
            >
              <div
                className="
                flex
                h-2
                items-center
                gap-2.5
                rounded-full
                bg-[#ECFDF5]
                px-6
                "
              >
                <HiCheckBadge size={20} className="text-emerald-600" />

                <span
                  className="
                  text-[16px]
                  font-semibold
                  text-emerald-700
                  "
                >
                  Verified Contract
                </span>
              </div>
            </div>
          </div>

          {/* Buttons */}

          <div
            className="
            mt-2
            flex
            items-center
            gap-5
            "
          >
            <button
              onClick={copyAddress}
              className="
              flex
              h-[45px]
              w-[175px]
              items-center
              justify-center
              gap-3
              rounded-2xl
              border
              border-[#E7EAF3]
              bg-white
              text-[15px]
              font-semibold
              text-slate-700
              shadow-[0_4px_12px_rgba(15,23,42,.05)]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:shadow-lg
              "
            >
              <FiCopy size={21} />
              Copy Address
            </button>

            <button
              onClick={openExplorer}
              className="
              flex
              h-[45px]
              w-[200px]
              items-center
              justify-center
              gap-3
              rounded-2xl
              bg-gradient-to-r
              from-[#4F46E5]
              via-[#5B3DF5]
              to-[#6D28D9]
              text-[15px]
              font-semibold
              text-white
              shadow-[0_18px_35px_rgba(99,102,241,.35)]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:shadow-[0_22px_45px_rgba(99,102,241,.45)]
              "
            >
              <FiExternalLink size={20} />
              View on Etherscan
            </button>
          </div>
        </div>

        {/* ================= RIGHT ================= */}

        <div
          className="
          relative
          flex
          h-[150px]
          w-[300px]
          items-center
          justify-center
          "
        >
          {/* Glow */}

          <div
            className="
            absolute
            h-[200px]
            w-[200px]
            rounded-full
            bg-violet-400/20
            blur-[80px]
            "
          />

          {/* Decorative Dots */}

          <div className="absolute left-2 top-8 h-2.5 w-2.5 rounded-full bg-violet-300" />

          <div className="absolute left-7 bottom-9 h-3 w-3 rounded-full bg-indigo-200" />

          <div className="absolute right-5 top-8 h-2.5 w-2.5 rounded-full bg-violet-300" />

          <div className="absolute right-1 bottom-10 h-3 w-3 rounded-full bg-indigo-300" />

          <div className="absolute left-20 top-2 h-2 w-2 rounded-full bg-violet-200" />

          <div className="absolute right-20 bottom-2 h-2 w-2 rounded-full bg-violet-200" />

          <Image
            src="/images/contract-card.png"
            alt="Smart Contract"
            width={180}
            height={180}
            priority
            className="
            relative
            z-10
            h-auto
            w-[220px]
            object-contain
            drop-shadow-[0_25px_45px_rgba(99,102,241,.28)]
            "
          />
        </div>
      </div>
    </section>
  );
}
