export const COLLECTION = "FnKXCAbNzvAGKtTqSxH2NrWemR4CoJhCMrdk4ihBG2P6";
// export const COLLECTION_2 = "8QC7gM7brwPZ6CBSUi6jYWCvFHu1B6nXSmeYiXPNgHCc";
// export const COLLECTION_3 = "JDmFUAWmGF1USSTxLb37e1W3ZBQQ1uRSK5zhvi5YVQz5";

export const STAKE_DATA_SIZE = 8 + 1 + 32 + 32 + 32 + 8 + 8;

export const STAKE_CONTRACT_IDL = {
  version: "0.1.0",
  name: "solana_anchor",
  instructions: [
    {
      name: "initPool",
      accounts: [
        {
          name: "owner",
          isMut: true,
          isSigner: true,
        },
        {
          name: "pool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "rand",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rewardMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rewardAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "stakeCollection",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "bump",
          type: "u8",
        },
        {
          name: "rewardAmount",
          type: "u64",
        },
        {
          name: "period",
          type: "i64",
        },
      ],
    },
    {
      name: "updatePool",
      accounts: [
        {
          name: "owner",
          isMut: true,
          isSigner: true,
        },
        {
          name: "pool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakeCollection",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rewardMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rewardAccount",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "rewardAmount",
          type: "u64",
        },
        {
          name: "period",
          type: "i64",
        },
      ],
    },
    {
      name: "switchClaim",
      accounts: [
        {
          name: "owner",
          isMut: true,
          isSigner: true,
        },
        {
          name: "pool",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "getReward",
      accounts: [
        {
          name: "owner",
          isMut: true,
          isSigner: true,
        },
        {
          name: "pool",
          isMut: false,
          isSigner: false,
        },
        {
          name: "reward",
          isMut: true,
          isSigner: true,
        },
        {
          name: "sourceRewardAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "destRewardAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "claimAmount",
          type: "u64",
        },
      ],
    },
    {
      name: "stake",
      accounts: [
        {
          name: "owner",
          isMut: true,
          isSigner: true,
        },
        {
          name: "pool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakeData",
          isMut: true,
          isSigner: true,
        },
        {
          name: "nftMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "metadata",
          isMut: true,
          isSigner: false,
        },
        {
          name: "sourceNftAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "destNftAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "clock",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "unstake",
      accounts: [
        {
          name: "owner",
          isMut: true,
          isSigner: true,
        },
        {
          name: "pool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakeData",
          isMut: true,
          isSigner: false,
        },
        {
          name: "sourceNftAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "destNftAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "sourceRewardAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "destRewardAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "clock",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "claim",
      accounts: [
        {
          name: "owner",
          isMut: true,
          isSigner: true,
        },
        {
          name: "pool",
          isMut: false,
          isSigner: false,
        },
        {
          name: "receiver",
          isMut: false,
          isSigner: false,
        },
        {
          name: "stakeData",
          isMut: true,
          isSigner: false,
        },
        {
          name: "sourceRewardAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "destRewardAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "clock",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "usePeroid",
          type: "u64",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "Pool",
      type: {
        kind: "struct",
        fields: [
          {
            name: "owner",
            type: "publicKey",
          },
          {
            name: "rand",
            type: "publicKey",
          },
          {
            name: "rewardMint",
            type: "publicKey",
          },
          {
            name: "rewardAccount",
            type: "publicKey",
          },
          {
            name: "rewardAmount",
            type: "u64",
          },
          {
            name: "period",
            type: "i64",
          },
          {
            name: "claimAble",
            type: "bool",
          },
          {
            name: "stakeCollection",
            type: "publicKey",
          },
          {
            name: "total",
            type: "u64",
          },
          {
            name: "bump",
            type: "u8",
          },
        ],
      },
    },
    {
      name: "StakeData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "unstaked",
            type: "bool",
          },
          {
            name: "owner",
            type: "publicKey",
          },
          {
            name: "pool",
            type: "publicKey",
          },
          {
            name: "account",
            type: "publicKey",
          },
          {
            name: "stakeTime",
            type: "i64",
          },
          {
            name: "withdrawnNumber",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "RewardCheck",
      type: {
        kind: "struct",
        fields: [
          {
            name: "airdroped",
            type: "bool",
          },
          {
            name: "owner",
            type: "publicKey",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "TokenMintToFailed",
      msg: "Token mint to failed",
    },
    {
      code: 6001,
      name: "TokenSetAuthorityFailed",
      msg: "Token set authority failed",
    },
    {
      code: 6002,
      name: "TokenTransferFailed",
      msg: "Token transfer failed",
    },
    {
      code: 6003,
      name: "InvalidTokenAccount",
      msg: "Invalid token account",
    },
    {
      code: 6004,
      name: "InvalidTokenMint",
      msg: "Invalid token mint",
    },
    {
      code: 6005,
      name: "InvalidMetadata",
      msg: "Invalid metadata",
    },
    {
      code: 6006,
      name: "InvalidStakeData",
      msg: "Invalid stakedata account",
    },
    {
      code: 6007,
      name: "InvalidTime",
      msg: "Invalid time",
    },
    {
      code: 6008,
      name: "NotClaim",
      msg: "Claim is not available.",
    },
    {
      code: 6009,
      name: "NotAdmin",
      msg: "Not admin.",
    },
    {
      code: 6010,
      name: "InvalidPeriod",
      msg: "Invalid Period",
    },
    {
      code: 6011,
      name: "AlreadyUnstaked",
      msg: "Already unstaked",
    },
    {
      code: 6012,
      name: "InvalidType",
      msg: "Invalid NFT type",
    },
  ],
};

export const CANDY_MACHINE_CONTRACT_IDL = {
  version: "0.1.0",
  name: "solana_anchor",
  instructions: [
    {
      name: "unstake",
      accounts: [
        {
          name: "owner",
          isMut: true,
          isSigner: true,
        },
        {
          name: "pool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "claim",
      accounts: [
        {
          name: "owner",
          isMut: true,
          isSigner: true,
        },
        {
          name: "pool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  types: [
    {
      name: "PoolError",
      type: {
        kind: "enum",
        variants: [
          {
            name: "TokenMintToFailed",
          },
          {
            name: "TokenSetAuthorityFailed",
          },
          {
            name: "TokenTransferFailed",
          },
          {
            name: "InvalidTokenAccount",
          },
          {
            name: "InvalidTokenMint",
          },
          {
            name: "InvalidMetadata",
          },
          {
            name: "InvalidStakeData",
          },
          {
            name: "InvalidTime",
          },
          {
            name: "InvalidPeriod",
          },
          {
            name: "AlreadyUnstaked",
          },
        ],
      },
    },
  ],
};
