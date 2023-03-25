const SupplyChain = artifacts.require("SupplyChain");

contract("SupplyChain", (accounts) => {
  let instance;

  beforeEach(async () => {
    instance = await SupplyChain.deployed();
  });

  it("should add a new product", async () => {
    const name = "Product 1";
    const price = web3.utils.toWei("1", "ether");
    const tx = await instance.addProduct(name, price, { from: accounts[0] });
    assert.equal(tx.logs[0].event, "ProductAdded");
    assert.equal(tx.logs[0].args.name, name);
    assert.equal(tx.logs[0].args.price, price);
  });

  it("should change the price of an existing product", async () => {
    const name = "Product 1";
    const newPrice = web3.utils.toWei("2", "ether");
    const tx = await instance.changeProductPrice(name, newPrice, { from: accounts[0] });
    assert.equal(tx.logs[0].event, "ProductPriceChanged");
    assert.equal(tx.logs[0].args.name, name);
    assert.equal(tx.logs[0].args.price, newPrice);
  });

  it("should not change the price of a non-existent product", async () => {
    const name = "Product 2";
    const newPrice = web3.utils.toWei("2", "ether");
    try {
      await instance.changeProductPrice(name, newPrice, { from: accounts[0] });
      assert.fail("Expected throw not received");
    } catch (error) {
      assert.include(error.message, "Product not found");
    }
  });
});
