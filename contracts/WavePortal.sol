// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;

    constructor() {
        console.log("That's one small step for man, one giant leap for mankind");
    }

    mapping(address => uint256) public wavesByAccount;

    function wave() public {
        wavesByAccount[msg.sender] += 1;
        totalWaves += 1;
        console.log("%s has waved!", msg.sender);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }

    function getMyWaves() public view returns (uint256) {
        console.log("Account", msg.sender, "number of waves is", wavesByAccount[msg.sender] );
        return wavesByAccount[msg.sender];
    }
}