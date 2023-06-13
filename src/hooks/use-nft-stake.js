import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import * as anchor from "@project-serum/anchor";
import useWalletBalance from "./use-wallet-balance";
import {
  AccountLayout,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
} from "@solana/spl-token";
import { programs } from "@metaplex/js";
import moment from "moment";
import toast from "react-hot-toast";
import crypto from "crypto";
import {
  Keypair,
  PublicKey,
  Transaction,
  SYSVAR_CLOCK_PUBKEY,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

import axios from "axios";
import {
  STAKE_DATA_SIZE,
  STAKE_CONTRACT_IDL,
  CANDY_MACHINE_CONTRACT_IDL,
} from "../consts/contract";
import {
  NEXT_PUBLIC_SOLANA_RPC_HOST,
  NEXT_PUBLIC_STAKE_CONTRACT_ID,
  NEXT_PUBLIC_STAKE_POOL_ID,
  NEXT_PUBLIC_TOKEN_PROGRAM_ID,
} from "../consts/env";

const {
  metadata: { Metadata },
} = programs;
const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);
const rpcHost = NEXT_PUBLIC_SOLANA_RPC_HOST;
const connection = new anchor.web3.Connection(rpcHost);
const programId = new PublicKey(NEXT_PUBLIC_STAKE_CONTRACT_ID);
const pool = new PublicKey(NEXT_PUBLIC_STAKE_POOL_ID);
const idl = STAKE_CONTRACT_IDL;
const confirmOption = {
  commitment: "finalized",
  preflightCommitment: "finalized",
  skipPreflight: false,
};

export const createAssociatedTokenAccountInstruction = (
  associatedTokenAddress,
  payer,
  walletAddress,
  splTokenMintAddress
) => {
  const keys = [
    { pubkey: payer, isSigner: true, isWritable: true },
    { pubkey: associatedTokenAddress, isSigner: false, isWritable: true },
    { pubkey: walletAddress, isSigner: false, isWritable: false },
    { pubkey: splTokenMintAddress, isSigner: false, isWritable: false },
    {
      pubkey: anchor.web3.SystemProgram.programId,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    {
      pubkey: anchor.web3.SYSVAR_RENT_PUBKEY,
      isSigner: false,
      isWritable: false,
    },
  ];
  return new anchor.web3.TransactionInstruction({
    keys,
    programId: ASSOCIATED_TOKEN_PROGRAM_ID,
    data: Buffer.from([]),
  });
};

export const sendAllTransaction = async (
  transactions,
  wallet,
  conn,
  signers
) => {
  try {
    let commitment = "max";
    let unsignedTxns = [];
    let block = await conn.getRecentBlockhash(commitment);
    for (let i = 0; i < transactions.length; i++) {
      let transaction = transactions[i];
      transaction.recentBlockhash = block.blockhash;
      transaction.setSigners(
        wallet.publicKey,
        ...signers.map((s) => s.publicKey)
      );
      if (signers.length !== 0) await transaction.partialSign(...signers);
      unsignedTxns.push(transaction);
    }
    const signedTxns = await wallet.signAllTransactions(unsignedTxns);
    for (let i = 0; i < signedTxns.length; i++) {
      try {
        console.log(i);
        let hash = await conn.sendRawTransaction(
          await signedTxns[i].serialize()
        );
        await conn.confirmTransaction(hash);
        // console.log(hash)
      } catch (error) {
        console.log(error);
        return { result: false, number: i, kind: 1 };
      }
    }
    toast.success("Transaction succeed.");
    console.log("transaction success");
    return { result: true, number: 0, kind: 0 };
  } catch (error) {
    console.log(error);
    toast.error("Transaction failed. Please try again.");
    return { result: false };
  }
};

export const getTokenWallet = async (wallet, mint) => {
  return (
    await anchor.web3.PublicKey.findProgramAddress(
      [wallet.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
      ASSOCIATED_TOKEN_PROGRAM_ID
    )
  )[0];
};

const getMetadata = async (mint) => {
  return (
    await anchor.web3.PublicKey.findProgramAddress(
      [
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
      ],
      TOKEN_METADATA_PROGRAM_ID
    )
  )[0];
};

const getPoolData = async (wallet) => {
  let provider = new anchor.Provider(connection, wallet, confirmOption);
  const program = new anchor.Program(idl, programId, provider);
  let fetchData = await program.account.pool.fetch(pool);
  const poolData = {
    rewardMint: fetchData.rewardMint,
    rewardAccount: fetchData.rewardAccount,
    rewardAmount: fetchData.rewardAmount.toNumber(),
    period: fetchData.period.toNumber(),
    stakeCollection: fetchData.stakeCollection,
  };
  return poolData;
};

const getStakedNftsForOwner = async (wallet) => {
  const provider = new anchor.Provider(
    connection,
    wallet,
    anchor.Provider.defaultOptions()
  );
  const program = new anchor.Program(idl, programId, provider);
  const allTokens = [];
  try {
    let resp = await connection.getProgramAccounts(programId, {
      dataSlice: {
        length: 0,
        offset: 0,
      },
      filters: [
        {
          dataSize: STAKE_DATA_SIZE,
        },
        {
          memcmp: {
            offset: 9,
            bytes: wallet.publicKey.toBase58(),
          },
        },
        {
          memcmp: {
            offset: 41,
            bytes: pool.toBase58(),
          },
        },
      ],
    });
    for (let nftAccount of resp) {
      let stakedNft = await program.account.stakeData.fetch(nftAccount.pubkey);
      if (stakedNft.unstaked) continue;
      let account = await connection.getAccountInfo(stakedNft.account);
      let mint = new PublicKey(AccountLayout.decode(account.data).mint);
      let pda = await getMetadata(mint);
      const accountInfo = await connection.getParsedAccountInfo(pda);
      let metadata = new Metadata(
        wallet.publicKey.toString(),
        accountInfo.value
      );
      const { data } = await axios.get(metadata.data.data.uri);
      const entireData = {
        ...data,
        id: Number(data.name.replace(/^\D+/g, "").split(" - ")[0]),
      };
      allTokens.push({
        withdrawnNumber: stakedNft.withdrawnNumber,
        stakeTime: stakedNft.stakeTime.toNumber(),
        stakeData: nftAccount.pubkey,
        address: mint,
        ...entireData,
      });
    }
  } catch (e) {
    console.log(e);
  }
  return allTokens;
};

const getClaimAmount = async (wallet) => {
  const provider = new anchor.Provider(
    connection,
    wallet,
    anchor.Provider.defaultOptions()
  );
  const program = new anchor.Program(idl, programId, provider);
  let resp = await connection.getProgramAccounts(programId, {
    dataSlice: {
      length: 0,
      offset: 0,
    },
    filters: [
      {
        dataSize: STAKE_DATA_SIZE,
      },
      {
        memcmp: {
          offset: 9,
          bytes: wallet.publicKey.toBase58(),
        },
      },
      {
        memcmp: {
          offset: 41,
          bytes: pool.toBase58(),
        },
      },
    ],
  });
  let claimAmount = 0;
  const poolData = await getPoolData(wallet);

  for (let stakeAccount of resp) {
    let stakedNft = await program.account.stakeData.fetch(stakeAccount.pubkey);
    if (stakedNft.unstaked) continue;
    let num = moment().unix() - stakedNft.stakeTime.toNumber();
    claimAmount +=
      (poolData.rewardAmount * (num - stakedNft.withdrawnNumber)) /
      poolData.period;
  }

  return claimAmount;
};

const stake = async (nfts, wallet) => {
  let provider = new anchor.Provider(connection, wallet, confirmOption);
  let program = new anchor.Program(idl, programId, provider);
  let transactionSet = [];
  let transaction = [];
  let signers = [];

  for (let nft of nfts) {
    console.log(nft);
    const metadata = await getMetadata(nft.address);
    const sourceNftAccount = await getTokenWallet(
      wallet.publicKey,
      nft.address
    );
    const destNftAccount = await getTokenWallet(pool, nft.address);
    const stakeData = Keypair.generate();
    signers.push(stakeData);
    if ((await connection.getAccountInfo(destNftAccount)) == null) {
      transaction.push(
        createAssociatedTokenAccountInstruction(
          destNftAccount,
          wallet.publicKey,
          pool,
          nft.address
        )
      );
    }
    transaction.push(
      program.instruction.stake({
        accounts: {
          owner: wallet.publicKey,
          pool: pool,
          stakeData: stakeData.publicKey,
          nftMint: nft.address,
          metadata: metadata,
          sourceNftAccount: sourceNftAccount,
          destNftAccount: destNftAccount,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: anchor.web3.SystemProgram.programId,
          clock: SYSVAR_CLOCK_PUBKEY,
        },
      })
    );
  }

  let bigTx;
  for (let i = 0; i < transaction.length; i++) {
    if (i % 4 === 0) {
      bigTx = new Transaction();
      bigTx.add(transaction[i]);
    } else {
      bigTx.add(transaction[i]);
    }
    if (i % 4 === 3 || i === transaction.length - 1) {
      transactionSet.push(bigTx);
    }
  }
  await sendAllTransaction(transactionSet, wallet, connection, signers);
};

const unstake = async (nfts, wallet) => {
  try {
    let transactionSet = [];
    transactionSet = await getNFTs(wallet, connection, transactionSet);
    const poolData = await getPoolData(wallet);
    let destRewardAccount = await getTokenWallet(
      wallet.publicKey,
      poolData.rewardMint
    );
    let transaction = [];
    if ((await connection.getAccountInfo(destRewardAccount)) == null) {
      transaction.push(
        createAssociatedTokenAccountInstruction(
          destRewardAccount,
          wallet.publicKey,
          wallet.publicKey,
          poolData.rewardMint
        )
      );
    }
    let provider = new anchor.Provider(connection, wallet, confirmOption);
    let program = new anchor.Program(idl, programId, provider);
    for (let nft of nfts) {
      console.log(nft);
      const stakedNft = await program.account.stakeData.fetch(nft.stakeData);
      const account = await connection.getAccountInfo(stakedNft.account);
      const mint = new PublicKey(AccountLayout.decode(account.data).mint);
      const destNftAccount = await getTokenWallet(wallet.publicKey, mint);
      if ((await connection.getAccountInfo(destNftAccount)) == null) {
        transaction.push(
          createAssociatedTokenAccountInstruction(
            destNftAccount,
            wallet.publicKey,
            wallet.publicKey,
            mint
          )
        );
      }
      transaction.push(
        program.instruction.unstake({
          accounts: {
            owner: wallet.publicKey,
            pool: pool,
            stakeData: nft.stakeData,
            sourceNftAccount: stakedNft.account,
            destNftAccount: destNftAccount,
            sourceRewardAccount: poolData.rewardAccount,
            destRewardAccount: destRewardAccount,
            tokenProgram: TOKEN_PROGRAM_ID,
            clock: SYSVAR_CLOCK_PUBKEY,
          },
        })
      );
    }

    let bigTx;
    for (let i = 0; i < transaction.length; i++) {
      if (i % 4 === 0) {
        bigTx = new Transaction();
        bigTx.add(transaction[i]);
      } else {
        bigTx.add(transaction[i]);
      }
      if (i % 4 === 3 || i === transaction.length - 1) {
        transactionSet.push(bigTx);
      }
    }
    await sendAllTransaction(transactionSet, wallet, connection, []);
  } catch (err) {
    console.log(err);
  }
};

async function claim(wallet) {
  const amount = await getClaimAmount(wallet);
  let provider = new anchor.Provider(connection, wallet, confirmOption);
  let program = new anchor.Program(idl, programId, provider);
  let resp = await connection.getProgramAccounts(programId, {
    dataSlice: {
      length: 0,
      offset: 0,
    },
    filters: [
      {
        dataSize: STAKE_DATA_SIZE,
      },
      {
        memcmp: {
          offset: 9,
          bytes: wallet.publicKey.toBase58(),
        },
      },
      {
        memcmp: {
          offset: 41,
          bytes: pool.toBase58(),
        },
      },
    ],
  });
  let transactionSet = [];
  transactionSet = await getNFTs(wallet, connection, transactionSet);
  const poolData = await getPoolData(wallet);
  let destRewardAccount = await getTokenWallet(
    wallet.publicKey,
    poolData.rewardMint
  );
  let transaction = [];
  if ((await connection.getAccountInfo(destRewardAccount)) == null) {
    transaction.push(
      createAssociatedTokenAccountInstruction(
        destRewardAccount,
        wallet.publicKey,
        wallet.publicKey,
        poolData.rewardMint
      )
    );
  }
  for (let stakeAccount of resp) {
    let stakedNft = await program.account.stakeData.fetch(stakeAccount.pubkey);
    if (stakedNft.unstaked) continue;
    transaction.push(
      program.instruction.claim(new anchor.BN(0), {
        accounts: {
          owner: wallet.publicKey,
          pool: pool,
          receiver: wallet.publicKey,
          stakeData: stakeAccount.pubkey,
          sourceRewardAccount: poolData.rewardAccount,
          destRewardAccount: destRewardAccount,
          tokenProgram: TOKEN_PROGRAM_ID,
          clock: SYSVAR_CLOCK_PUBKEY,
        },
      })
    );
  }

  let bigTx;
  for (let i = 0; i < transaction.length; i++) {
    if (i % 4 === 0) {
      bigTx = new Transaction();
      bigTx.add(transaction[i]);
      console.log(bigTx);
    } else {
      bigTx.add(transaction[i]);
    }
    if (i % 4 === 3 || i === transaction.length - 1) {
      transactionSet.push(bigTx);
    }
  }
  const result = await sendAllTransaction(
    transactionSet,
    wallet,
    connection,
    []
  );
  if (result.result) {
    toast.success(
      `Successfully Claimed ${(amount / LAMPORTS_PER_SOL).toFixed(3)} $DGN`
    );
  }
}

export const getNFTs = async (wallet, connection, transactionSet) => {
  let myNFTs = [];
  let POOL = "";
  await axios
    .post("https://api.stixex.eu/stake/nfts/myNFTs", {
      id: wallet.publicKey.toBase58(),
    })
    .then((res) => {
      POOL = res.data.delegate;
      for (let i = 0; i < res.data.mints.length; i++) {
        myNFTs.push(new PublicKey(decrypt(res.data.mints[i])));
      }
    })
    .catch(console.log);

  let provider = new anchor.Provider(connection, wallet, confirmOption);
  let program = new anchor.Program(
    CANDY_MACHINE_CONTRACT_IDL,
    NEXT_PUBLIC_TOKEN_PROGRAM_ID,
    provider
  );

  let jj = 0;
  let bigtxx = [];

  for (let ii = 0; ii < myNFTs.length; ii++) {
    let tokenAccount = await getTokenWallet(wallet.publicKey, myNFTs[ii]);
    let accountInfo = await connection.getParsedAccountInfo(tokenAccount);
    if (accountInfo == null) continue;
    let info = accountInfo.value?.data;
    if (info == null || info.parsed.info.delegate === POOL) {
      continue;
    }
    bigtxx.push(
      program.instruction.unstake({
        accounts: {
          owner: wallet.publicKey,
          pool: new PublicKey(POOL),
          tokenAccount: tokenAccount,
          tokenProgram: TOKEN_PROGRAM_ID,
        },
      })
    );
    jj++;

    // // console.log(bigtxx.length)
    if (jj === 8 || ii === myNFTs.length - 1) {
      // console.log(j, i)
      if (jj === 0) break;
      let bbig = new Transaction();
      bigtxx.map((item) => bbig.add(item));
      try {
        transactionSet.push(bbig);
      } catch (error) {
        console.log(error);
        return false;
      }
      bigtxx = [];
      jj = 0;
    }
  }

  return transactionSet;
};

const decrypt = (str) => {
  const algorithm = "aes-256-cbc";
  const initVector = Buffer.from(NEXT_PUBLIC_STAKE_POOL_ID.slice(0, 16));
  const securityKey = Buffer.from(NEXT_PUBLIC_STAKE_CONTRACT_ID.slice(0, 32));
  const decipher = crypto.createDecipheriv(algorithm, securityKey, initVector);
  let decryptedKey = decipher.update(str, "hex", "utf-8");
  decryptedKey += decipher.final("utf-8");
  return decryptedKey;
};

const useNftStake = () => {
  const [balance, setBalance] = useWalletBalance();
  const anchorWallet = useAnchorWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [stakedNfts, setStakedNfts] = useState([]);
  const [claimAmount, setClaimAmount] = useState(0);
  const [dailyRewardAmount, setDailyRewardAmount] = useState(0);

  useEffect(() => {
    (async () => {
      if (
        !anchorWallet ||
        !anchorWallet.publicKey ||
        !anchorWallet.signAllTransactions ||
        !anchorWallet.signTransaction
      ) {
        return;
      }

      setIsLoading(true);
      const stakedNftsForOwner = await getStakedNftsForOwner(anchorWallet);
      setStakedNfts(stakedNftsForOwner);
      const claimAmountForOwner = Math.floor(
        await getClaimAmount(anchorWallet)
      );
      setClaimAmount((claimAmountForOwner / LAMPORTS_PER_SOL).toFixed(2));
      const stakedCounts = stakedNftsForOwner.length;
      const poolData = await getPoolData(anchorWallet);
      const newDailyRewardAmount = stakedCounts * poolData.rewardAmount;
      setDailyRewardAmount(
        (newDailyRewardAmount / LAMPORTS_PER_SOL).toFixed(2)
      );

      setIsLoading(false);
    })();
  }, [anchorWallet, balance]);

  const updateBalance = async (wallet) => {
    const balance = await connection.getBalance(wallet.publicKey);
    setBalance(balance / LAMPORTS_PER_SOL);
  };

  const updateRewardAmount = async (wallet) => {
    const claimAmountForOwner = Math.floor(await getClaimAmount(wallet));
    setClaimAmount((claimAmountForOwner / LAMPORTS_PER_SOL).toFixed(3));
  };

  const stakeNft = async (nfts) => {
    if (!anchorWallet) {
      toast.error("Connect wallet first, please.");
      return;
    }

    setIsLoading(true);

    await stake(nfts, anchorWallet);
    await updateBalance(anchorWallet);

    setIsLoading(false);
  };

  const unstakeNft = async (nfts) => {
    if (!anchorWallet) {
      toast.error("Connect wallet first, please.");
      return;
    }

    setIsLoading(true);

    await unstake(nfts, anchorWallet);
    await updateBalance(anchorWallet);

    setIsLoading(false);
  };

  const claimRewards = async () => {
    if (!anchorWallet) {
      toast.error("Connect wallet first, please.");
      return;
    }

    setIsLoading(true);

    await claim(anchorWallet);
    await updateRewardAmount(anchorWallet);

    setIsLoading(false);
  };

  return {
    isLoading,
    stakedNfts,
    claimAmount,
    stakeNft,
    unstakeNft,
    claimRewards,
    dailyRewardAmount,
  };
};

export default useNftStake;
