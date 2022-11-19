// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IDeShare {
    function publishItem(
        bytes calldata hash_,
        uint256 size,
        uint256 duration,
        uint256 price,
        address token,
        string calldata name
    ) external payable;

    function deleteItem(uint256 id) external;

    function freezeItem(uint256 id) external;

    function getUri(uint256 id, bytes calldata sign) external;

    function buyItem(uint256 id, bytes calldata sign) external;

    function setFactory(address factory) external;
}
