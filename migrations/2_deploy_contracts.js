const Product = artifacts.require("Product");
const SupplyChain = artifacts.require("SupplyChain");

module.exports = function (deployer) {
  deployer.deploy(Product).then(function() {
    return deployer.deploy(SupplyChain, Product.address);
  });
};
