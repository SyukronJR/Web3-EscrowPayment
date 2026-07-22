"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqs = [
  {
    id: 1,
    question: "Apa itu EscrowPay?",
    answer:
      "EscrowPay adalah aplikasi pembayaran digital berbasis Web3 yang menggunakan smart contract Ethereum sebagai pihak penengah dalam transaksi sehingga pembayaran menjadi lebih aman dan transparan.",
  },
  {
    id: 2,
    question: "Bagaimana cara kerja escrow?",
    answer:
      "Buyer membuat escrow dan mengirim dana ke smart contract. Dana akan ditahan sementara hingga seller menyelesaikan pekerjaan. Setelah buyer melakukan konfirmasi, dana otomatis dikirim kepada seller.",
  },
  {
    id: 3,
    question: "Apakah dana dapat dicuri?",
    answer:
      "Tidak. Dana disimpan langsung di smart contract Ethereum, bukan di server aplikasi, sehingga tidak dapat diambil oleh admin maupun pihak ketiga.",
  },
  {
    id: 4,
    question: "Apakah semua transaksi dapat dilihat?",
    answer:
      "Ya. Seluruh transaksi tercatat pada blockchain Ethereum dan dapat diverifikasi menggunakan Etherscan.",
  },
  {
    id: 5,
    question: "Apakah EscrowPay mendukung token selain ETH?",
    answer:
      "Ya. Smart contract mendukung transaksi menggunakan ETH maupun token ERC-20 sesuai implementasi sistem.",
  },
  {
    id: 6,
    question: "Apakah EscrowPay memerlukan MetaMask?",
    answer:
  "Ya. EscrowPay menggunakan MetaMask sebagai dompet digital untuk menghubungkan akun Ethereum, menandatangani transaksi, serta mengirim dan menerima aset secara aman melalui blockchain.",
    },
];

export default function AboutFAQ() {
  const [open, setOpen] = useState<number | null>(1);

  const leftFaqs = faqs.filter((_, i) => i % 2 === 0);
  const rightFaqs = faqs.filter((_, i) => i % 2 === 1);

  return (
    <section className="bg-[#F8FAFC] pb-24">
      <div className="mx-auto max-w-[1350px] px-12">

        <div className="text-center">

          <h2 className="text-[38px] font-bold text-slate-900">
            Frequently Asked Questions
          </h2>

          <p className="mx-auto mt-5 max-w-[760px] text-[18px] leading-8 text-slate-500">
            Temukan jawaban mengenai penggunaan EscrowPay,
            mekanisme escrow, serta keamanan transaksi berbasis
            blockchain Ethereum.
          </p>

        </div>

        <div className="mt-16 grid grid-cols-2 gap-6">

          <div className="space-y-6">
            {leftFaqs.map((faq) => (
              <FaqItem
                key={faq.id}
                faq={faq}
                open={open}
                setOpen={setOpen}
              />
            ))}
          </div>

          <div className="space-y-6">
            {rightFaqs.map((faq) => (
              <FaqItem
                key={faq.id}
                faq={faq}
                open={open}
                setOpen={setOpen}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

function FaqItem({
  faq,
  open,
  setOpen,
}: {
  faq: any;
  open: number | null;
  setOpen: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const active = open === faq.id;

  return (
    <div
      className="
      overflow-hidden
      rounded-2xl
      border
      border-slate-200
      bg-white
      shadow-sm
      "
    >

      <button
        onClick={() =>
          setOpen(active ? null : faq.id)
        }
        className="
        flex
        w-full
        items-center
        justify-between
        px-7
        py-5
        text-left
        "
      >

        <span className="text-[20px] font-semibold text-slate-900">
          {faq.question}
        </span>

        {active ? (
          <FiMinus className="text-2xl text-indigo-600" />
        ) : (
          <FiPlus className="text-2xl text-indigo-600" />
        )}

      </button>

      <AnimatePresence initial={false}>
        {active && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
            }}
          >

            <p className="px-7 pb-6 text-[16px] leading-8 text-slate-500">
              {faq.answer}
            </p>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}