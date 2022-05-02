// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    uint256 private seed;
    bool private winner = false;
    uint256 prizeAmount = 2.3 ether;
    address addrWaver;

    event NewWave(address indexed from, uint256 timestamp, string message, bool luck);
    
    // Struct for storing messages and time when messages where sent. 
    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
        bool lucky;
    }
    Wave[] waves;

    mapping(address => uint256) public wavesByAccount;
    mapping(address => uint256) public lastWavedAt;
 
    constructor() payable {
        console.log("That's one small step for man, one giant leap for mankind");
        // seed = (block.timestamp + block.difficulty) % 100;
    }

  

    function wave(string memory _message) public {
        require(
            lastWavedAt[msg.sender] + 30 seconds < block.timestamp,
            "Wait 30 seconds"
        );
        addrWaver = msg.sender;
        lastWavedAt[addrWaver]  = block.timestamp;
        wavesByAccount[addrWaver] += 1;
        totalWaves += 1;

        seed = (block.timestamp + block.difficulty) % 100;

        console.log("%s waved w/ message -> %s", addrWaver, _message);
        if (seed <= 50) {
            winner = true;
        } else {
            winner = false;
        }

        console.log("Random # generated: %d", seed);
        waves.push(Wave(addrWaver, _message, block.timestamp, winner));

        if (winner) {
            console.log("%s won!", addrWaver);
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has"
            );
            (bool success, ) = addrWaver.call{value: prizeAmount}("");
            console.log("msg.sender address is", addrWaver);
            // payable(addrWaver).transfer(prizeAmount);
            require(success, "Failed to withdraw from contract.");
            //console.log("Sender's balance is ->>>", msg.sender.balance);
        } else {
            console.log("%s lost!", addrWaver);
        }
        // console.log("seed = ", seed);

        emit NewWave(addrWaver, block.timestamp, _message, winner);

    }

    //Returns the struct array of waves
    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }

    function getMyWaves() public view returns (uint256) {
        console.log("Account", msg.sender, "number of waves is", wavesByAccount[msg.sender] );
        return wavesByAccount[msg.sender];
    }

    fallback() external payable {}

    receive() external payable {}
}