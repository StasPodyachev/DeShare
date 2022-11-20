// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IDeShare {
    struct PublishParam {
        bytes hash_;
        uint256 size;
        uint256 duration;
        uint256[] prices;
        address[] tokens;
        string name;
        string description;
        string provider;
        uint256 categoryId;
    }

    struct StoreItem {
        address owner;
        address[] tokens;
        uint256[] prices;
        uint256 id;
        uint256 size;
        uint256 duration;
        uint256 timestamp;
        uint256 categoryId;
        string name;
        string description;
        string dealCId;
        bytes hash_;
        bool isFreezed;
        bool isDeleted;
    }

    function setFactory(address factory) external;

    function setFeePercent(uint256 val) external;

    function withdraw(address token, uint256 amount) external;

    function getAllItems() external view returns (StoreItem[] memory);

    function getAllSellerItems() external view returns (StoreItem[] memory);

    function getAllBuyerItems() external view returns (StoreItem[] memory);

    function publishItem(PublishParam calldata param) external payable;

    function buyItem(
        uint256 id,
        address token,
        uint256 amount,
        bytes calldata sign
    ) external;

    function getUri(uint256 id, bytes calldata sign)
        external
        view
        returns (bytes memory);

    function getItem(uint256 id) external view returns (StoreItem memory);

    function deleteItem(uint256 id) external;

    function freezeItem(uint256 id, bool isFreezed) external;
}
