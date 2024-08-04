require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition-ethers");
require("@nomicfoundation/hardhat-verify");
require('dotenv').config();

task("deploy", "Deploy contracts using Ignition")
  .setAction(async ({}, { ethers, run }) => {
    // Load the Ignition module
    const module = require("./ignition/UserAndPoliceModule");

    // Build the Ignition runner
    const { buildIgnition } = require("@nomicfoundation/hardhat-ignition");
    const ignition = buildIgnition({ ethers, run });

    // Run the module to deploy contracts
    const result = await ignition.run(module);

    console.log("UserContract deployed to:", result.userContract.address);
    console.log("PoliceContract deployed to:", result.policeContract.address);
  });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    alfajores: {
      url: 'https://alfajores-forno.celo-testnet.org',
      accounts: [process.env.PRIVATE_KEY], // Use environment variable
    },
    celodango: {
      url: 'https://forno.dango.celo-testnet.org',
      accounts: [process.env.PRIVATE_KEY], // Use environment variable
    },
  },
  etherscan: {
    apiKey: {
      celodango: "abc", // Placeholder API key
    },
    customChains: [
      {
        network: "celodango",
        chainId: 44787,
        urls: {
          apiURL: "https://celo-dango.blockscout.com/api",
          browserURL: "https://celo-dango.blockscout.com/",
        }
      }
    ],
  },
};
