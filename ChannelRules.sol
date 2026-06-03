// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

/**
 * @title ChannelRules
 * @dev An optional escrow coordinator that settles token rewards to authors verified by our bot.
 */
contract ChannelRules {
    address public moderatorNode;
    mapping(uint256 => bool) public rewardedCasts;

    event RewardDisbursed(uint256 indexed castHash, address indexed author, uint256 tokenVolume);

    constructor() {
        moderatorNode = msg.sender;
    }

    /**
     * @notice Settles performance micro-grants directly to creators for quality analytics.
     */
    function disburseEngagementReward(
        uint256 castHash, 
        address payable authorAddress, 
        uint256 rewardAmount
    ) external {
        require(msg.sender == moderatorNode, "AuthError: Caller must be verified moderator node");
        require(!rewardedCasts[castHash], "StateError: Reward already claimed for target item");

        rewardedCasts[castHash] = true;
        
        (bool success, ) = authorAddress.call{value: rewardAmount}("");
        require(success, "ExecutionError: Transfer crashed");

        emit RewardDisbursed(castHash, authorAddress, rewardAmount);
    }

    receive() external payable {}
}
