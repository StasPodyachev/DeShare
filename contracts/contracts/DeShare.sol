// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@uniswap/lib/contracts/libraries/TransferHelper.sol";

import "./interfaces/IFactory.sol";
import "./interfaces/IDeShare.sol";

import "./MarketAPI.sol";
import "./types/MarketTypes.sol";

contract DeShare is IDeShare, Ownable {
    uint256 constant EPOCH_SECONDS = 30;

    mapping(uint256 => mapping(address => bool)) internal _buyerAccess;
    mapping(address => uint256[]) internal _buyerItems;
    mapping(address => uint256[]) internal _sellerItems;
    mapping(uint256 => uint256) internal _itemsMap;

    StoreItem[] internal _items;

    uint256 public lastId;
    uint256 public feePercent = 1e16;

    IFactory public _factory;
    MarketAPI public _marketApi;

    modifier itemExists(uint256 id) {
        require(_itemsMap[id] > 0, "DeShare: Wrong Id");

        StoreItem storage item = _items[_itemsMap[id]];
        require(item.isDeleted == false, "DeShare: Wrong Id");

        _;
    }

    modifier onlySeller(uint256 id) {
        StoreItem memory item = _items[_itemsMap[id]];

        require(
            item.owner == msg.sender,
            "DeShare: Caller does not own the item"
        );
        _;
    }

    function getAllItems() external view returns (StoreItem[] memory) {
        return _items;
    }

    function getAllSellerItems() external view returns (StoreItem[] memory) {
        uint256[] memory items = _sellerItems[msg.sender];

        StoreItem[] memory result = new StoreItem[](items.length);
        for (uint256 i = 0; i < items.length; i++) {
            uint256 index = _itemsMap[items[i]];
            result[i] = _items[index];
        }

        return result;
    }

    function getAllBuyerItems() external view returns (StoreItem[] memory) {
        uint256[] memory items = _buyerItems[msg.sender];

        StoreItem[] memory result = new StoreItem[](items.length);
        for (uint256 i = 0; i < items.length; i++) {
            uint256 index = _itemsMap[items[i]];
            result[i] = _items[index];
        }
        return result;
    }

    function setFactory(address factory) external onlyOwner {
        _factory = IFactory(factory);
    }

    function setMarketApi(MarketAPI marketApi_) external onlyOwner {
        _marketApi = marketApi_;
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
        string calldata name,
        string calldata provider
    ) external payable {
        MarketTypes.MockDeal memory deal = _marketApi.mock_provider_deal(
            provider
        );

        require(deal.id > 0, "DeShare: invalid provider");
        require(
            msg.value == (duration / EPOCH_SECONDS) * deal.price_per_epoch,
            "DeShare: msg.value incorrect"
        );

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
                dealCId: deal.cid,
                hash_: hash_,
                isFreezed: false,
                isDeleted: false
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

    function deleteItem(uint256 id) external itemExists(id) onlySeller(id) {
        uint256 index = _itemsMap[id];
        StoreItem storage item = _items[index];
        item.isDeleted = true;
    }

    function freezeItem(uint256 id, bool isFreezed)
        external
        itemExists(id)
        onlySeller(id)
    {
        uint256 index = _itemsMap[id];
        StoreItem storage item = _items[index];
        item.isFreezed = isFreezed;
    }
}
