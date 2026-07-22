"use client";

import {
  HiOutlineShoppingCart,
  HiOutlineLockClosed,
  HiOutlineCube,
  HiOutlineWallet,
  HiOutlineArrowLongRight,
} from "react-icons/hi2";

const steps = [
  {
    icon: <HiOutlineShoppingCart size={34} />,
    title: "1. Buat Escrow",
    desc: "Buyer membuat transaksi escrow baru.",
  },
  {
    icon: <HiOutlineLockClosed size={34} />,
    title: "2. Dana Ditahan",
    desc: "Dana disimpan ke smart contract dan ditahan sementara.",
  },
  {
    icon: <HiOutlineCube size={34} />,
    title: "3. Pekerjaan Selesai",
    desc: "Seller menyelesaikan pekerjaan dan menandai selesai.",
  },
  {
    icon: <HiOutlineWallet size={34} />,
    title: "4. Dana Dilepas",
    desc: "Buyer konfirmasi, dana dilepas ke seller.",
  },
];

export default function AboutFlow() {
  return (
    <section className="bg-[#F8FAFC] pb-24">
      <div
        className="
        mx-auto
        mt-30
        max-w-[1280px]
        rounded-[34px]
        border
        border-slate-200
        bg-white
        px-13
        py-13
        shadow-sm
        "
      >
        {/* Judul */}

        <div className="mb-12 flex items-center justify-center gap-8">
          <div className="h-[2px] w-[260px] bg-indigo-200" />

          <h2
            className="
            text-[35px]
            font-bold
            text-indigo-600
            "
          >
            Alur Transaksi
          </h2>

          <div className="h-[2px] w-[260px] bg-indigo-200" />
        </div>

        {/* Flow */}

        <div className="grid grid-cols-7 items-start">
          {steps.map((step, index) => (
            <div key={step.title} className="contents">
              <div className="flex flex-col items-center text-center">
                <div
                  className="
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-full
                  bg-indigo-50
                  text-indigo-600
                  shadow-sm
                  "
                >
                  {step.icon}
                </div>

                <h3
                  className="
                  mt-8
                  text-[17px]
                  font-bold
                  text-slate-900
                  "
                >
                  {step.title}
                </h3>

                <p
                  className="
                  mt-4
                  max-w-[220px]
                  text-[15px]
                  leading-6
                  text-slate-500
                  "
                >
                  {step.desc}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div className="flex justify-center pt-4">
                  <HiOutlineArrowLongRight
                    size={54}
                    className="text-indigo-500"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
