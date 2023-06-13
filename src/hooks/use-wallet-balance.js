import { useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { createContext, useContext, useEffect, useState } from "react";
import * as anchor from "@project-serum/anchor";
import { NEXT_PUBLIC_SOLANA_RPC_HOST } from "../consts/env";
const BalanceContext = createContext(null);

const rpcHost = NEXT_PUBLIC_SOLANA_RPC_HOST;
console.log("rpcurl", rpcHost);
const connection = new anchor.web3.Connection(rpcHost);

export default function useWalletBalance() {
  const [balance, setBalance] = useContext(BalanceContext);
  // const [balance, setBalance] = useState(0)
  return [balance, setBalance];
}

export const WalletBalanceProvider = ({ children }) => {
  const wallet = useWallet();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    (async () => {
      if (wallet.publicKey) {
        const balance = await connection.getBalance(wallet.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      }
    })();
  }, [wallet]);

  return (
    <BalanceContext.Provider value={[balance, setBalance]}>
      {children}
    </BalanceContext.Provider>
  );
};
