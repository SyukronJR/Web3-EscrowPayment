"use client";

import { createContext, useContext, useState } from "react";
import { ethers } from "ethers";

const WalletContext = createContext<any>(null);

export function WalletProvider({ children }: any) {

  const [account, setAccount] = useState("");

  async function connectWallet() {

    if (!(window as any).ethereum) {
      alert("Install MetaMask dulu");
      return;
    }

    const provider = new ethers.BrowserProvider(
      (window as any).ethereum
    );

    const accounts = await provider.send(
      "eth_requestAccounts",
      []
    );

    setAccount(accounts[0]);
  }

  return (
    <WalletContext.Provider value={{ account, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  return useContext(WalletContext);
}