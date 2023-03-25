const HDWalletProvider = require('@truffle/hdwallet-provider');
const infuraKey = "bc021480a21745f484560364f0852ff1";
const fs = require('fs');
const mnemonic = fs.readFileSync("./key.secret").toString().trim();



module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
    },

    goerli: {
      provider: () => new HDWalletProvider(mnemonic, `https://goerli.infura.io/v3/${infuraKey}`),
      network_id: 5,       // Goerli's id
      confirmations: 2,    // # of confirmations to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },

    sepolia: {
      provider: () => new HDWalletProvider(mnemonic, `https://sepolia.infura.io/v3/${infuraKey}`),
      network_id:11155111,      
      gasPrice:1000000000,     
    },

  },
  compilers: {
    solc: {
      version: "0.8.0", // Fetch exact version from solc-bin (default: truffle's version)
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
  db: {
    enabled: false,
  },
};
