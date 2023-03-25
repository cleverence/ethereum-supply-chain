pragma solidity ^0.8.0;

contract Product {
    struct ProductData {
        uint id;
        string name;
        string origin;
        uint quantity;
        uint price;
        address owner;
    }

    ProductData[] public products;

    function createProduct(string memory _name, string memory _origin, uint _quantity, uint _price) public {
        products.push(ProductData({
            id: products.length + 1,
            name: _name,
            origin: _origin,
            quantity: _quantity,
            price: _price,
            owner: msg.sender
        }));
    }

    function getProductCount() public view returns (uint) {
        return products.length;
    }

    function getProduct(uint _id) public view returns (ProductData memory) {
        require(_id > 0 && _id <= products.length, "Product does not exist");
        return products[_id - 1];
    }
}
