// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./interfaces/IFactory.sol";

contract Factory is IFactory {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function setOwner(address _owner) external override {
        require(msg.sender == owner);
        owner = _owner;
    }
}
