// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@uniswap/lib/contracts/libraries/TransferHelper.sol";

import "./interfaces/IFactory.sol";
import "./interfaces/IDeShare.sol";

contract DeShare is IDeShare, Ownable {
    mapping(uint256 => mapping(address => bool)) internal _buyerAccess;
    mapping(address => uint256[]) internal _buyerItems;
    mapping(address => uint256[]) internal _sellerItems;
    mapping(uint256 => uint256) internal _itemsMap;

    StoreItem[] internal _items;

    uint256 public lastId;
    uint256 public feePercent = 1e16;

    IFactory _factory;

    modifier itemExists(uint256 id) {
        require(_itemsMap[id] > 0, "DeShare: Wrong Id");
        _;
    }

    function setFactory(address factory) external onlyOwner {
        _factory = IFactory(factory);
    }

    function setFeePercent(uint256 val) external onlyOwner {
        feePercent = val;
    }

    function withdraw(address token, uint256 amount) external onlyOwner {
        TransferHelper.safeTransfer(token, msg.sender, amount);
    }

    function publishItem(
        bytes calldata hash_,
        uint256 size,
        uint256 duration,
        uint256[] calldata prices,
        address[] calldata tokens,
        string calldata name
    ) external payable {
        require(msg.value > 0, "DeShare: msg.value cannot be 0");

        // call filecoin method

        _items.push(
            StoreItem({
                id: ++lastId,
                owner: msg.sender,
                tokens: tokens,
                prices: prices,
                size: size,
                duration: duration,
                name: name,
                dealCId: "",
                hash_: hash_,
                isFreezed: false
            })
        );

        _sellerItems[msg.sender].push(lastId);
        _itemsMap[lastId] = _items.length - 1;
    }

    function buyItem(
        uint256 id,
        address token,
        uint256 amount,
        bytes calldata sign
    ) external itemExists(id) {
        uint256 index = _itemsMap[id];
        StoreItem memory item = _items[index];

        require(item.isFreezed == false, "DeShare: Item is freezed");

        for (uint256 i = 0; i < item.tokens.length; i++) {
            if (item.tokens[i] == token) {
                require(item.prices[i] == amount, "DeShare: Incorrect price");

                TransferHelper.safeTransferFrom(
                    token,
                    msg.sender,
                    address(this),
                    amount - (amount * feePercent) / 1e18
                );

                _buyerAccess[id][msg.sender] = true;
                _buyerItems[msg.sender].push(id);
                return;
            }
        }

        require(false, "DeShare: Incorrect token");
    }

    function getUri(uint256 id, bytes calldata sign)
        external
        view
        itemExists(id)
        returns (bytes memory)
    {
        require(_buyerAccess[id][msg.sender], "DeShare: ACCESS_FORBIDDEN");

        // decode with private key seller ..

        return _items[_itemsMap[id]].hash_;
    }

    function getItem(uint256 id)
        external
        view
        itemExists(id)
        returns (StoreItem memory)
    {
        return _items[_itemsMap[id]];
    }

    function deleteItem(uint256 id) external itemExists(id) {}

    function freezeItem(uint256 id) external itemExists(id) {}
}
