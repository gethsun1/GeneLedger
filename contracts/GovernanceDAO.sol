// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title GovernanceDAO
 * @dev Decentralized Autonomous Organization for genomic research governance
 * Implements quadratic funding and democratic decision-making
 */
contract GovernanceDAO is Ownable, ReentrancyGuard {

    struct Proposal {
        uint256 id;
        string title;
        string description;
        address proposer;
        uint256 createdAt;
        uint256 endDate;
        ProposalType proposalType;
        ProposalStatus status;
        uint256 votesFor;
        uint256 votesAgainst;
        uint256 totalVotes;
        uint256 requiredQuorum;
        uint256 fundingAmount;
        address fundingRecipient;
        string protocolId;
        bool executed;
    }

    struct Vote {
        address voter;
        bool support; // true for yes, false for no
        uint256 weight;
        uint256 quadraticWeight;
        uint256 timestamp;
    }

    struct QuadraticFundingRound {
        uint256 id;
        string title;
        string description;
        uint256 startDate;
        uint256 endDate;
        uint256 matchingPool;
        uint256 totalContributions;
        bool isActive;
        bool distributed;
    }

    struct FundingProject {
        uint256 id;
        uint256 roundId;
        string title;
        string description;
        address recipient;
        uint256 totalContributions;
        uint256 contributorCount;
        uint256 quadraticScore;
        mapping(address => uint256) contributions;
        address[] contributors;
    }

    enum ProposalType {
        Funding,
        Governance,
        Protocol
    }

    enum ProposalStatus {
        Active,
        Passed,
        Failed,
        Executed
    }

    // State variables
    uint256 private _proposalIds;
    uint256 private _fundingRoundIds;
    uint256 private _projectIds;

    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => Vote)) public votes;
    mapping(uint256 => address[]) public proposalVoters;
    mapping(address => uint256) public votingPower;
    mapping(address => uint256) public reputation;

    mapping(uint256 => QuadraticFundingRound) public fundingRounds;
    mapping(uint256 => FundingProject) public fundingProjects;
    mapping(uint256 => uint256[]) public roundProjects;

    uint256 public constant PROPOSAL_DURATION = 7 days;
    uint256 public constant MIN_QUORUM = 100; // Minimum votes needed
    uint256 public treasuryBalance;

    // Events
    event ProposalCreated(
        uint256 indexed proposalId,
        address indexed proposer,
        string title,
        ProposalType proposalType,
        uint256 endDate
    );

    event VoteCast(
        uint256 indexed proposalId,
        address indexed voter,
        bool support,
        uint256 weight,
        uint256 quadraticWeight
    );

    event ProposalExecuted(
        uint256 indexed proposalId,
        ProposalStatus status
    );

    event FundingRoundCreated(
        uint256 indexed roundId,
        string title,
        uint256 matchingPool,
        uint256 endDate
    );

    event ProjectFunded(
        uint256 indexed projectId,
        address indexed contributor,
        uint256 amount
    );

    event QuadraticFundsDistributed(
        uint256 indexed roundId,
        uint256 totalDistributed
    );

    constructor() Ownable(msg.sender) {
        // Initialize with some default voting power for the deployer
        votingPower[msg.sender] = 100;
        reputation[msg.sender] = 100;
    }

    /**
     * @dev Submit a new proposal
     */
    function submitProposal(
        string memory _title,
        string memory _description,
        ProposalType _proposalType,
        uint256 _fundingAmount,
        address _fundingRecipient,
        string memory _protocolId
    ) external {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_description).length > 0, "Description cannot be empty");
        require(votingPower[msg.sender] > 0, "No voting power");

        _proposalIds++;
        uint256 proposalId = _proposalIds;

        proposals[proposalId] = Proposal({
            id: proposalId,
            title: _title,
            description: _description,
            proposer: msg.sender,
            createdAt: block.timestamp,
            endDate: block.timestamp + PROPOSAL_DURATION,
            proposalType: _proposalType,
            status: ProposalStatus.Active,
            votesFor: 0,
            votesAgainst: 0,
            totalVotes: 0,
            requiredQuorum: MIN_QUORUM,
            fundingAmount: _fundingAmount,
            fundingRecipient: _fundingRecipient,
            protocolId: _protocolId,
            executed: false
        });

        emit ProposalCreated(proposalId, msg.sender, _title, _proposalType, block.timestamp + PROPOSAL_DURATION);
    }

    /**
     * @dev Vote on a proposal with quadratic voting
     */
    function voteOnProposal(uint256 _proposalId, bool _support, uint256 _voteWeight) external {
        require(_proposalId > 0 && _proposalId <= _proposalIds, "Invalid proposal ID");
        require(proposals[_proposalId].status == ProposalStatus.Active, "Proposal not active");
        require(block.timestamp <= proposals[_proposalId].endDate, "Voting period ended");
        require(votingPower[msg.sender] >= _voteWeight, "Insufficient voting power");
        require(votes[_proposalId][msg.sender].voter == address(0), "Already voted");

        // Calculate quadratic weight (square root of vote weight)
        uint256 quadraticWeight = sqrt(_voteWeight);

        votes[_proposalId][msg.sender] = Vote({
            voter: msg.sender,
            support: _support,
            weight: _voteWeight,
            quadraticWeight: quadraticWeight,
            timestamp: block.timestamp
        });

        proposalVoters[_proposalId].push(msg.sender);

        if (_support) {
            proposals[_proposalId].votesFor += quadraticWeight;
        } else {
            proposals[_proposalId].votesAgainst += quadraticWeight;
        }

        proposals[_proposalId].totalVotes += quadraticWeight;

        // Reduce voting power (consumed in voting)
        votingPower[msg.sender] -= _voteWeight;

        emit VoteCast(_proposalId, msg.sender, _support, _voteWeight, quadraticWeight);

        // Auto-execute if quorum reached and voting period ended
        if (block.timestamp > proposals[_proposalId].endDate) {
            _executeProposal(_proposalId);
        }
    }

    /**
     * @dev Execute a proposal after voting period
     */
    function executeProposal(uint256 _proposalId) external {
        require(_proposalId > 0 && _proposalId <= _proposalIds, "Invalid proposal ID");
        require(block.timestamp > proposals[_proposalId].endDate, "Voting period not ended");
        require(!proposals[_proposalId].executed, "Proposal already executed");

        _executeProposal(_proposalId);
    }

    /**
     * @dev Internal function to execute proposal
     */
    function _executeProposal(uint256 _proposalId) internal {
        Proposal storage proposal = proposals[_proposalId];
        
        if (proposal.totalVotes >= proposal.requiredQuorum && proposal.votesFor > proposal.votesAgainst) {
            proposal.status = ProposalStatus.Passed;
            
            // Execute funding if it's a funding proposal
            if (proposal.proposalType == ProposalType.Funding && proposal.fundingAmount > 0) {
                _distributeFunds(proposal.fundingRecipient, proposal.fundingAmount);
            }
        } else {
            proposal.status = ProposalStatus.Failed;
        }

        proposal.executed = true;
        emit ProposalExecuted(_proposalId, proposal.status);
    }

    /**
     * @dev Create a new quadratic funding round
     */
    function createFundingRound(
        string memory _title,
        string memory _description,
        uint256 _duration,
        uint256 _matchingPool
    ) external payable onlyOwner {
        require(msg.value >= _matchingPool, "Insufficient matching pool");

        _fundingRoundIds++;
        uint256 roundId = _fundingRoundIds;

        fundingRounds[roundId] = QuadraticFundingRound({
            id: roundId,
            title: _title,
            description: _description,
            startDate: block.timestamp,
            endDate: block.timestamp + _duration,
            matchingPool: _matchingPool,
            totalContributions: 0,
            isActive: true,
            distributed: false
        });

        treasuryBalance += msg.value;

        emit FundingRoundCreated(roundId, _title, _matchingPool, block.timestamp + _duration);
    }

    /**
     * @dev Contribute to a project in quadratic funding
     */
    function contributeToProject(uint256 _projectId) external payable nonReentrant {
        require(msg.value > 0, "Contribution must be greater than 0");
        require(_projectId > 0 && _projectId <= _projectIds, "Invalid project ID");

        FundingProject storage project = fundingProjects[_projectId];
        QuadraticFundingRound storage round = fundingRounds[project.roundId];
        
        require(round.isActive, "Funding round not active");
        require(block.timestamp <= round.endDate, "Funding round ended");

        if (project.contributions[msg.sender] == 0) {
            project.contributors.push(msg.sender);
            project.contributorCount++;
        }

        project.contributions[msg.sender] += msg.value;
        project.totalContributions += msg.value;
        round.totalContributions += msg.value;

        // Update quadratic score (sum of square roots of individual contributions)
        project.quadraticScore = _calculateQuadraticScore(_projectId);

        emit ProjectFunded(_projectId, msg.sender, msg.value);
    }

    /**
     * @dev Calculate quadratic score for a project
     */
    function _calculateQuadraticScore(uint256 _projectId) internal view returns (uint256) {
        FundingProject storage project = fundingProjects[_projectId];
        uint256 score = 0;
        
        for (uint256 i = 0; i < project.contributors.length; i++) {
            address contributor = project.contributors[i];
            uint256 contribution = project.contributions[contributor];
            score += sqrt(contribution);
        }
        
        return score;
    }

    /**
     * @dev Distribute funds (internal)
     */
    function _distributeFunds(address _recipient, uint256 _amount) internal {
        require(_amount <= treasuryBalance, "Insufficient treasury balance");
        require(_amount <= address(this).balance, "Insufficient contract balance");
        
        treasuryBalance -= _amount;
        payable(_recipient).transfer(_amount);
    }

    /**
     * @dev Add voting power to an address (only owner)
     */
    function addVotingPower(address _user, uint256 _power) external onlyOwner {
        votingPower[_user] += _power;
    }

    /**
     * @dev Add reputation to an address (only owner)
     */
    function addReputation(address _user, uint256 _rep) external onlyOwner {
        reputation[_user] += _rep;
    }

    /**
     * @dev Get proposal details
     */
    function getProposal(uint256 _proposalId) external view returns (Proposal memory) {
        require(_proposalId > 0 && _proposalId <= _proposalIds.current(), "Invalid proposal ID");
        return proposals[_proposalId];
    }

    /**
     * @dev Get total number of proposals
     */
    function getTotalProposals() external view returns (uint256) {
        return _proposalIds.current();
    }

    /**
     * @dev Square root function (Babylonian method)
     */
    function sqrt(uint256 x) internal pure returns (uint256) {
        if (x == 0) return 0;
        uint256 z = (x + 1) / 2;
        uint256 y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
        return y;
    }

    /**
     * @dev Receive function to accept ETH
     */
    receive() external payable {
        treasuryBalance += msg.value;
    }
}
