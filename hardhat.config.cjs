require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    calibration: {
      url: process.env.FVM_CALIBRATION_RPC || "https://calibration.node.glif.io/rpc/v1",
      accounts: process.env.DEPLOYER_PRIVATE_KEY && process.env.DEPLOYER_PRIVATE_KEY !== "your_testnet_private_key_here"
        ? [process.env.DEPLOYER_PRIVATE_KEY]
        : [],
      chainId: 314159,
      gasPrice: 1000000000, // 1 gwei
    },
    hardhat: {
      chainId: 1337,
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./src/types/abis",
  },
  typechain: {
    outDir: "./src/types/contracts",
    target: "ethers-v6",
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    // Filecoin calibration testnet explorer
    apiKey: {
      calibration: "placeholder", // Not needed for Filecoin
    },
    customChains: [
      {
        network: "calibration",
        chainId: 314159,
        urls: {
          apiURL: "https://calibration.filfox.info/api/v1",
          browserURL: "https://calibration.filfox.info/en",
        },
      },
    ],
  },
};
