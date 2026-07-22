"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="bg-[#F8FAFC]">

      <div
            className="
            mx-auto
            flex
            max-w-[1250px]
            items-center
            gap-30
            px-10
            pt-20
            pb-20
            "
            >

        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
          className="w-[580px] flex-shrink-0"
        >

          {/* Badge */}

          <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-600">

            WEB3 ESCROW PAYMENT

          </span>

          {/* Title */}
          
          <h1 className="mt-8 text-[48px] leading-[48px] font-bold tracking-[-2px] text-[#0F172A]">

            Pembayaran Aman

            <br />

            Dengan Smart Contract

          </h1>

          {/* Description */}

          <p className=" mt-9 max-w-[560px] text-[18px] leading-[32px] text-[#64748B]">

            Sistem pembayaran digital berbasis Ethereum
            menggunakan Smart Contract Escrow yang aman,
            transparan dan terpercaya.

          </p>

          {/* Button */}

          <div className="mt-10 flex gap-5">

            <Link href="/transaction">

              <button
                className="
                rounded-xl
                bg-indigo-600
                h-14
                px-10
                rounded-2xl
                text-white
                font-semibold
                shadow-lg
                shadow-indigo-200
                transition
                hover:bg-indigo-700
                "
              >

                Mulai Transaksi

              </button>

            </Link>

            <button
              className="
              rounded-xl
              border
              border-slate-300
              bg-white
              px-8
              py-4
              font-semibold
              text-slate-700
              hover:bg-slate-50
              "
            >

              Pelajari Lebih Lanjut

            </button>

          </div>

        </motion.div>

        {/* RIGHT */}

         <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-1 justify-end"
            >
            <Image
                src="/images/hero-shield2.png"
                alt="Hero Shield"
                width={620}
                height={620}
                priority
                className="w-[640px] h-auto drop-shadow-2xl"
            />
            </motion.div>

      </div>

    </section>
  );
}