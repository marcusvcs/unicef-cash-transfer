pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Registry.sol";

contract UNIToken is ERC20 {
    Registry registry;

    constructor(address registryAddress) ERC20("UNICEF", "UNI") {
        registry = Registry(registryAddress);
    }

    function transfer(address to, uint256 value)
        public
        override
        returns (bool)
    {
        address from = msg.sender;

        require(from != to, "Cannot transfer token to yourself");
        if (registry.isOwner(from)) {
            // UNICEF is providing cash to an IP
            _mint(to, value);
        } else if (registry.isOwner(to)) {
            // An IP is returning cash to UNICEF
            _burn(to, value);
        }

        return true;
    }
}
