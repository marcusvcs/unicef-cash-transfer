var Registry = artifacts.require("./Registry.sol");
var UNIToken = artifacts.require("./UNIToken.sol");

module.exports = async (deployer, network, accounts) => {
  
  registry = await Registry.deployed()
  await registry.registerImplementingPartner("111111", "ABRAPEC - Associação Brasileira de Assistência às Pessoas com Câncer", accounts[1])
  await registry.registerImplementingPartner("222222", "APAE - Associação de Pais e Amigos dos Excepcionais", accounts[2])
  await registry.registerImplementingPartner("333333", "Ação Brasileira pela Nutrição e Direitos Humanos", accounts[3])
  await registry.registerImplementingPartner("444444", "Ação Social Nossa Senhora do Perpétuo Socorro", accounts[4])
  await registry.registerImplementingPartner("555555", "Voluntários da Amizade", accounts[5])
  await registry.registerImplementingPartner("666666", "WWF Brasil", accounts[6])

  unitoken = await UNIToken.deployed()

  await unitoken.transfer(accounts[1], 801)
  await unitoken.transfer(accounts[2], 744)
  await unitoken.transfer(accounts[3], 514)
  await unitoken.transfer(accounts[4], 510)
  await unitoken.transfer(accounts[5], 363)
  await unitoken.transfer(accounts[6], 218)

};
