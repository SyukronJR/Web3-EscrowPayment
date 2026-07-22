"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  HiOutlineLockClosed,
  HiOutlineShieldCheck,
  HiOutlineGlobeAlt,
} from "react-icons/hi2";

function Item({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-6">

      <div
        className="
        flex
        h-15
        w-15
        shrink-0
        items-center
        justify-center
        rounded-3xl
        bg-indigo-50
        border
        border-indigo-100
        shadow-sm
        "
      >
        {icon}
      </div>

      <div>

        <h3 className="text-[23px] font-bold text-slate-900">
          {title}
        </h3>

        <p
          className="
          mt-1
          max-w-[520px]
          text-[18px]
          leading-7
          text-slate-600
          "
        >
          {desc}
        </p>

      </div>

    </div>
  );
}

export default function AboutHero() {
  return (
    <section className="bg-[#F8FAFC] overflow-hidden">

      <div className="mx-auto max-w-[1280px] px-12 pt-16">

        <div className="grid grid-cols-2 items-center gap-20">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .7 }}
          >

            <div
              className="
              inline-flex
              rounded-full
              bg-indigo-100
              px-5
              py-2
              text-sm
              font-bold
              uppercase
              tracking-wide
              text-indigo-700
              "
            >
              WEB3 ESCROW PAYMENT
            </div>

            <h1
              className="
              mt-5
              text-[44px]
              font-extrabold
              leading-[60px]
              text-slate-900
              "
            >
              Tentang EscrowPay
            </h1>

            <p
              className="
              mt-4
              max-w-[640px]
              text-[20px]
              leading-9
              text-slate-600
              "
            >
              EscrowPay adalah aplikasi pembayaran digital berbasis Web3
              yang menggunakan smart contract Ethereum untuk memastikan
              transaksi berjalan aman, transparan, dan tanpa pihak ketiga.
            </p>

            <div className="mt-8 space-y-10">

              <Item
                icon={
                  <HiOutlineLockClosed
                    size={30}
                    className="text-indigo-600"
                  />
                }
                title="Smart Contract"
                desc="Menggunakan smart contract Ethereum untuk menahan dana hingga kedua pihak menyelesaikan kewajiban."
              />

              <Item
                icon={
                  <HiOutlineShieldCheck
                    size={30}
                    className="text-indigo-600"
                  />
                }
                title="Escrow Mechanism"
                desc="Mekanisme escrow melindungi buyer dan seller dari risiko penipuan maupun wanprestasi."
              />

              <Item
                icon={
                  <HiOutlineGlobeAlt
                    size={30}
                    className="text-indigo-600"
                  />
                }
                title="Terbuka & Terdesentralisasi"
                desc="Seluruh proses berjalan di blockchain dan dapat diverifikasi oleh siapa saja."
              />

            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .7 }}
            className="relative flex justify-end"
          >

            <div
              className="
              absolute
              right-0
              top-8
              h-[650px]
              w-[650px]
              rounded-full
              bg-indigo-100
              opacity-60
              blur-3xl
              "
            />

            <Image
              src="/images/about-hero.png"
              alt="About"
              width={760}
              height={760}
              priority
              className="relative z-10 w-[550px] h-auto"
            />

          </motion.div>

        </div>

      </div>

    </section>
  );
}