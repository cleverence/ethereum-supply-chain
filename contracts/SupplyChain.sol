pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SupplyChain {
    ERC20 public token;

    struct Product {
        uint id;
        string name;
        string origin;
        uint quantity;
        uint price;
        address owner;
        bool isAvailable;
    }

    Product[] public products;

    constructor(ERC20 _token) {
        token = _token;
    }

    function createProduct(string memory _name, string memory _origin, uint _quantity, uint _price) public {
        products.push(Product({
            id: products.length + 1,
            name: _name,
            origin: _origin,
            quantity: _quantity,
            price: _price,
            owner: msg.sender,
            isAvailable: true
        }));
    }

    function buyProduct(uint _id) public {
        require(_id > 0 && _id <= products.length, "Product does not exist");
        Product storage product = products[_id - 1];
        require(product.isAvailable == true, "Product is not available");

        uint totalPrice = product.price * product.quantity;
        require(token.balanceOf(msg.sender) >= totalPrice, "Insufficient balance");

        token.transferFrom(msg.sender, product.owner, totalPrice);
        product.isAvailable = false;
    }


// function buyProduct(uint256 productId) public payable {
//     require(productId > 0 && productId <= products.length, "Invalid product ID");
//     Product storage product = products[productId - 1];
//     require(msg.value >= product.price, "Insufficient funds");

//     product.buyer = msg.sender;
//     product.seller.transfer(msg.value);

//     emit ProductPurchased(productId, product.name, product.origin, product.quantity, product.price, msg.sender);
// }


    function getProductCount() public view returns (uint) {
        return products.length;
    }

    function getProduct(uint _id) public view returns (Product memory) {
        require(_id > 0 && _id <= products.length, "Product does not exist");
        return products[_id - 1];
    }

    function getProductStatus(uint _id) public view returns (bool) {
        require(_id > 0 && _id <= products.length, "Product does not exist");
        return products[_id - 1].isAvailable;
    }
}
