var FundRaising = artifacts.require("./FundRaising.sol");

module.exports = function(deployer) {
  deployer.deploy(FundRaising);
};
