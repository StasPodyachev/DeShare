// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IDeShare {
    struct StoreItem {
        address owner;
        address[] tokens;
        uint256[] prices;
        uint256 id;
        uint256 size;
        uint256 duration;
        string name;
        string dealCId;
        bytes hash_;
    }

    function publishItem(
        bytes calldata hash_,
        uint256 size,
        uint256 duration,
        uint256[] calldata prices,
        address[] calldata tokens,
        string calldata name
    ) external payable;

    function deleteItem(uint256 id) external;

    function freezeItem(uint256 id) external;

    function getUri(uint256 id, bytes calldata sign)
        external
        returns (bytes memory);

    function buyItem(
        uint256 id,
        address token,
        uint256 amount,
        bytes calldata sign
    ) external;

    function setFactory(address factory) external;
}
