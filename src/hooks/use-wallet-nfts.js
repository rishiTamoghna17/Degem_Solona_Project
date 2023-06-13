import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import * as anchor from "@project-serum/anchor";
import { getNftsForOwner } from "../utils/candy-machine";
import useWalletBalance from "./use-wallet-balance";
import { NEXT_PUBLIC_SOLANA_RPC_HOST } from "../consts/env";
const rpcHost = NEXT_PUBLIC_SOLANA_RPC_HOST;
const connection = new anchor.web3.Connection(rpcHost);

const useWalletNfts = () => {
  const [balance] = useWalletBalance();
  const wallet = useWallet();
  const [isLoadingWalletNfts, setIsLoadingWalletNfts] = useState(false);

  const [walletNfts, setWalletNfts] = useState([]);

  useEffect(() => {
    (async () => {
      if (
        !wallet ||
        !wallet.publicKey ||
        !wallet.signAllTransactions ||
        !wallet.signTransaction
      ) {
        return;
      }

      setIsLoadingWalletNfts(true);

      const nftsForOwner = await getNftsForOwner(connection, wallet.publicKey);
      setWalletNfts(nftsForOwner);

      setIsLoadingWalletNfts(false);
    })();
  }, [wallet, balance]);

  return { isLoadingWalletNfts, walletNfts, setWalletNfts };
};

export default useWalletNfts;
