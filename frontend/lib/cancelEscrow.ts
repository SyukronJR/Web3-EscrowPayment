"use client";

import { BrowserProvider, ethers } from "ethers";

import EscrowPayment from "@/abi/EscrowPayment.json";
import { CONTRACT_ADDRESS } from "@/constants/contract";

export async function cancelEscrow(escrowId: number) {
  if (!(window as any).ethereum) {
    throw new Error("MetaMask belum terhubung.");
  }

  const provider = new BrowserProvider((window as any).ethereum);

  const signer = await provider.getSigner();

  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,

    EscrowPayment.abi,

    signer,
  );

  const tx = await contract.cancelEscrow(escrowId);

  await tx.wait();

  return tx.hash;
}
