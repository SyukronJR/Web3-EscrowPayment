"use client";

import FeatureCard from "./FeatureCard";

import {
  FiShield,
  FiEye,
  FiGlobe,
} from "react-icons/fi";

export default function Features() {
  return (
    <section className="pb-28">

      <div className="mx-auto grid max-w-[1250px] grid-cols-3 gap-8 px-8">

        <FeatureCard
          icon={<FiShield size={28} className="text-indigo-600" />}
          color="bg-indigo-100"
          title="Aman & Terpercaya"
          description="Dana ditahan oleh smart contract hingga transaksi selesai sehingga pembayaran menjadi lebih aman."
        />

        <FeatureCard
          icon={<FiEye size={28} className="text-indigo-600" />}
          color="bg-indigo-100"
          title="Transparan"
          description="Seluruh transaksi dapat diverifikasi melalui blockchain Ethereum sehingga mudah dipantau."
        />

        <FeatureCard
          icon={<FiGlobe size={28} className="text-indigo-600" />}
          color="bg-indigo-100"
          title="Terdesentralisasi"
          description="Tidak memerlukan pihak ketiga karena seluruh proses dijalankan otomatis oleh smart contract."
        />

      </div>

    </section>
  );
}