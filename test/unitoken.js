var UNIToken = artifacts.require("./UNIToken.sol");
var Registry = artifacts.require("./Registry.sol");

contract('Registry', async (accounts) => {
  it("should registry an IP", async () => {

    var account_two = accounts[1];

    registry = await Registry.deployed()
    let info = await registry.ImplementingPartners(account_two);
    let infoName = info[1]
    assert.equal(infoName, "IP 1");

  });
});
contract('UNIToken', async (accounts) => {
  it("should transfer money to an IP", async () => {

    let account_two = accounts[1];

    registry = await Registry.deployed()
    unitoken = await UNIToken.deployed()

    let previousBalance = await unitoken.balanceOf(account_two)

    await unitoken.transfer(account_two, 20)
    
    let newBalance = await unitoken.balanceOf(account_two)

    assert.equal(newBalance.toNumber() - previousBalance.toNumber(), 20)

  });
});
