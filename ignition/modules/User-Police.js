

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("UserAndPoliceModule", (m) => {
  // Deploy UserContract
  const userContract = m.contract("UserContract");

  // Deploy PoliceContract
  const policeContract = m.contract("PoliceContract");


  return { userContract, policeContract };
});
