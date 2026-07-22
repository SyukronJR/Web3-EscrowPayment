# Web3 Escrow Payment

A decentralized escrow payment application built on Ethereum using smart contracts to provide secure, transparent, and trustless transactions between buyers and sellers.

---

## Overview

Web3 Escrow Payment is a decentralized application (DApp) that implements an escrow payment mechanism using Ethereum Smart Contracts. The system removes the need for a centralized third party by allowing funds to be securely held within a smart contract until predefined transaction conditions are fulfilled.

This project was developed as part of an undergraduate thesis in the Information Technology program.

---

## Features

- Connect MetaMask Wallet
- Create Escrow Transaction
- Fund Escrow with ERC-20 Tokens
- Mark Item as Delivered
- Confirm Payment Release
- Refund Mechanism
- Transaction History
- Smart Contract Based Validation

---

## Technology Stack

### Blockchain

- Ethereum Sepolia
- Solidity
- Hardhat
- OpenZeppelin Contracts
- Ethers.js

### Frontend

- Next.js
- React
- Tailwind CSS
- TypeScript

### Wallet

- MetaMask

---

## Project Structure

```text
Web3-EscrowPayment
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── context/
│   ├── lib/
│   └── abi/
│
├── smart-contract/
│   ├── contracts/
│   ├── scripts/
│   ├── test/
│   └── hardhat.config.js
│
└── README.md
```

---

## Workflow

1. Buyer connects MetaMask.
2. Buyer creates an escrow transaction.
3. Buyer funds the escrow using supported ERC-20 tokens.
4. Seller delivers the agreed product or service.
5. Buyer confirms the delivery.
6. Smart contract releases the payment to the seller.
7. If the transaction fails under specific conditions, the buyer can claim a refund according to the smart contract rules.

---

## Smart Contract

The smart contract manages the complete escrow lifecycle, including:

- Escrow creation
- Fund management
- Delivery confirmation
- Payment release
- Refund process

All transaction logic is executed on-chain through Ethereum Smart Contracts.

---

## Installation

### Clone Repository

```bash
git clone https://github.com/SyukronJR/Web3-EscrowPayment.git
```

### Install Dependencies

```bash
npm install
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Smart Contract

```bash
cd smart-contract
npm install
npx hardhat compile
```

---

## Future Improvements

- Multi-token support
- Multi-signature escrow
- Decentralized dispute resolution
- Gas optimization
- Smart contract upgradeability

---

## Author

**Muhammad Syukron**


GitHub:
https://github.com/SyukronJR
