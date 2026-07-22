"use client";

import { FiCopy, FiX } from "react-icons/fi";
import Image from "next/image";

interface Props {
  open: boolean;
  data: any;
  onClose: () => void;
}

export default function DetailModal({ open, data, onClose }: Props) {
  if (!open || !data) return null;

  console.log(data);
  console.log("HASH:", data.hash);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-[720px] rounded-3xl bg-white p-8 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Detail Transaksi</h2>

          <button onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-8">
          <Item title="Escrow ID" value={`#${data.id}`} />

          <Item title="Status" value={data.status} />

          <Item title="Buyer" value={data.buyer} />

          <Item title="Seller" value={data.seller} />

          <div>
            <p className="text-sm text-slate-500">Token</p>

            <div className="mt-2 flex items-center gap-3">
              <Image src={data.logo} alt={data.token} width={28} height={28} />

              <span className="font-medium">{data.token}</span>
            </div>
          </div>

          <Item title="Amount" value={data.amount} />

          <Item title="Created" value={data.created} />

          <Item title="Deadline" value={data.deadline} />

          <div className="col-span-2 justify-end mt-5">
            {data.hash !== "-" && (
              <a
                href={`https://sepolia.etherscan.io/tx/${data.hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="
        rounded-xl
        bg-indigo-600
        px-5
        py-3
        text-white
        font-medium
        hover:bg-indigo-700
      "
              >
                Lihat di Etherscan
              </a>
            )}
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <button
            onClick={onClose}
            className="
              rounded-xl
              bg-indigo-600
              px-6
              py-3
              text-white
              hover:bg-indigo-700
            "
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

function Item({ title, value }: { title: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-slate-500">{title}</p>

      <h3 className="mt-1 break-all font-semibold">{value}</h3>
    </div>
  );
}
