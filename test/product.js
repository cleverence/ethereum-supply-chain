const Product = artifacts.require("Product");

contract("Product", (accounts) => {
  let productInstance;

  before(async () => {
    productInstance = await Product.deployed();
  });

  it("should add a new product", async () => {
    const productName = "iPhone 13";
    const productOrigin = "USA";
    const productQuantity = 100;
    const productPrice = 1000;

    const tx = await productInstance.addProduct(
      productName,
      productOrigin,
      productQuantity,
      productPrice,
      { from: accounts[0] }
    );

    const { productCount } = await productInstance.productIndex();

    assert.equal(productCount, 1);
  });

  it("should get the details of a product", async () => {
    const productName = "iPhone 13";
    const productOrigin = "USA";
    const productQuantity = 100;
    const productPrice = 1000;

    const { product } = await productInstance.getProduct(0);

    assert.equal(product.name, productName);
    assert.equal(product.origin, productOrigin);
    assert.equal(product.quantity, productQuantity);
    assert.equal(product.price, productPrice);
  });

  it("should buy a product", async () => {
    const buyer = accounts[1];

    const tx = await productInstance.buyProduct(0, { from: buyer, value: 1000 });

    const { product } = await productInstance.getProduct(0);

    assert.equal(product.quantity, 99);
  });
});
