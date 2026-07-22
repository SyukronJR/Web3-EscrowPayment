"use client";

import {
  FiFilePlus,
  FiLock,
  FiCheckCircle,
  FiSend,
  FiShield,
} from "react-icons/fi";

export default function WorkflowCard() {
  const steps = [
    {
      icon: FiFilePlus,
      title: "Buat Escrow",
      desc: "Tentukan seller, token, jumlah, dan batas waktu.",
    },
    {
      icon: FiLock,
      title: "Dana Ditahan",
      desc: "Kirim dana ke smart contract untuk ditahan.",
    },
    {
      icon: FiCheckCircle,
      title: "Pekerjaan Selesai",
      desc: "Seller menandai pekerjaan selesai.",
    },
    {
      icon: FiSend,
      title: "Dana Dilepas",
      desc: "Buyer mengonfirmasi pembayaran ke seller.",
    },
  ];

  return (
    <div
      className="
      rounded-[28px]
      border
      border-[#E8EDF5]
      bg-white
      p-8
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
        Bagaimana Cara Kerja?
      </h2>

      <div className="mt-8">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div key={index}>
              <div className="flex items-center gap-5">
                {/* Icon */}

                <div
                  className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-[#F5F3FF]
                  to-[#ECE8FF]
                  "
                >
                  <Icon size={25} className="text-indigo-600" />
                </div>

                {/* Content */}

                <div className="flex-1 pt-1">
                  <div className="flex gap-5">
                    <span
                      className="
                      text-[19px]
                      font-bold
                      text-slate-900
                      "
                    >
                      {index + 1}
                    </span>

                    <div>
                      <h3
                        className="
                        text-[17px]
                        font-bold
                        text-slate-900
                        "
                      >
                        {step.title}
                      </h3>

                      <p
                        className="
                        mt-1
                        text-[14px]
                        leading-5
                        text-slate-500
                        "
                      >
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {index !== steps.length - 1 && (
                <div
                  className="
                  my-5
                  ml-[68px]
                  border-b
                  border-dashed
                  border-[#E8EDF5]
                  "
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Security */}

      <div
        className="
        mt-8
        flex
        items-center
        gap-4
        rounded-2xl
        border
        border-[#EEF2F7]
        bg-[#FAFBFD]
        p-5
        "
      >
        <div
          className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-xl
          bg-[#EEF2FF]
          "
        >
          <FiShield size={24} className="text-indigo-600" />
        </div>

        <p
          className="
          text-[15px]
          leading-7
          text-slate-600
          "
        >
          Dana aman ditahan di smart contract hingga kedua pihak menyelesaikan
          kewajiban.
        </p>
      </div>
    </div>
  );
}
