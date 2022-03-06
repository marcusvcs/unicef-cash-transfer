var registry = artifacts.require("./Registry.sol");
var unitoken = artifacts.require("./UNIToken.sol");

module.exports = async (deployer) => {
  await deployer.deploy(registry)
  await deployer.deploy(unitoken, registry.address)

};
