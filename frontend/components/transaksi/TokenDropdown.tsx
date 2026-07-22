"use client";

import { useState } from "react";
import Image from "next/image";
import { FiChevronDown } from "react-icons/fi";

export const tokens = [

  {
    name: "Ethereum",
    symbol: "ETH",
    image: "/tokens/eth.png",
    address: "0x0000000000000000000000000000000000000000",
    decimals: 18,
  },

  {
    name: "Tether USD",
    symbol: "USDT",
    image: "/tokens/usdt.png",
    address: "0x0754aae2f458f035BBaf9054A4F18CE5ee300608",
    decimals: 18,
  },

  {
    name: "USD Coin",
    symbol: "USDC",
    image: "/tokens/usdc.png",
    address: "0x32A79565F56a77821F7b2e6608db8e46CF38C5db",
    decimals: 18,
  },

  {
    name: "DAI Stablecoin",
    symbol: "DAI",
    image: "/tokens/dai.png",
    address: "0x48A38d2734603e6b15466A9D1ECaA5e061591985",
    decimals: 18,
  },

  {
    name: "Chainlink",
    symbol: "LINK",
    image: "/tokens/link.png",
    address: "0x30E3b7E6909a5e2A9D39e170662dbd2e037b44dE",
    decimals: 18,
  },

];

export interface Token {

  name: string;

  symbol: string;

  image: string;

  address: string;

  decimals: number;

}

interface Props {

  selected: Token;

  setSelected: React.Dispatch<React.SetStateAction<Token>>;

}

export default function TokenDropdown({

  selected,

  setSelected,

}: Props) {

  const [open, setOpen] = useState(false);

  return (

    <div className="relative">

      <button

        type="button"

        onClick={() => setOpen(!open)}

        className="
        flex
        h-14
        w-full
        items-center
        justify-between
        rounded-xl
        border
        border-slate-200
        bg-white
        px-4
        hover:border-indigo-400
        "

      >

        <div className="flex items-center gap-3">

          <Image

            src={selected.image}

            alt={selected.symbol}

            width={26}

            height={26}

          />

          <div className="text-left">

            <p className="font-medium text-slate-800">

              {selected.name}

            </p>

            <p className="text-xs text-slate-500">

              {selected.symbol}

            </p>

          </div>

        </div>

        <FiChevronDown

          size={20}

          className={open ? "rotate-180 transition" : "transition"}

        />

      </button>

      {

        open && (

          <div

            className="
            absolute
            z-50
            mt-2
            w-full
            rounded-xl
            border
            border-slate-200
            bg-white
            shadow-xl
            "

          >

            {

              tokens.map((token) => (

                <button

                  key={token.symbol}

                  type="button"

                  onClick={() => {

                    setSelected(token);

                    setOpen(false);

                  }}

                  className="
                  flex
                  w-full
                  items-center
                  gap-3
                  px-4
                  py-3
                  hover:bg-slate-50
                  "

                >

                  <Image

                    src={token.image}

                    alt={token.symbol}

                    width={24}

                    height={24}

                  />

                  <div className="text-left">

                    <p className="font-medium">

                      {token.name}

                    </p>

                    <p className="text-xs text-slate-500">

                      {token.symbol}

                    </p>

                  </div>

                </button>

              ))

            }

          </div>

        )

      }

    </div>

  );

}