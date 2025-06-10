// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title StorageRetrieval
 * @dev Contract for storing and retrieving genomic research protocols on Filecoin
 * Handles protocol storage, retrieval, and funding mechanisms
 */
contract StorageRetrieval is Ownable, ReentrancyGuard {

    struct Protocol {
        uint256 id;
        string title;
        string description;
        address author;
        string ipfsHash;
        string fileHash;
        uint256 fileSize;
        uint256 createdAt;
        uint256 updatedAt;
        ProtocolStatus status;
        string category;
        uint256 verificationCount;
        uint256 downloads;
        uint256 fundingReceived;
        bool isActive;
    }

    enum ProtocolStatus {
        Draft,
        Pending,
        Verified,
        Rejected
    }

    // State variables
    uint256 private _protocolIds;
    mapping(uint256 => Protocol) public protocols;
    mapping(address => uint256[]) public authorProtocols;
    mapping(uint256 => mapping(address => bool)) public hasVerified;
    mapping(uint256 => mapping(address => bool)) public hasDownloaded;
    
    // Protocol categories
    mapping(string => bool) public validCategories;
    string[] public categories;

    // Funding and rewards
    uint256 public constant VERIFICATION_REWARD = 0.001 ether;
    uint256 public constant STORAGE_FEE = 0.01 ether;
    uint256 public totalTreasuryFunds;

    // Events
    event ProtocolStored(
        uint256 indexed protocolId,
        address indexed author,
        string title,
        string ipfsHash,
        uint256 timestamp
    );

    event ProtocolRetrieved(
        uint256 indexed protocolId,
        address indexed retriever,
        uint256 timestamp
    );

    event ProtocolVerified(
        uint256 indexed protocolId,
        address indexed verifier,
        uint256 timestamp
    );

    event FundingReceived(
        uint256 indexed protocolId,
        address indexed funder,
        uint256 amount,
        uint256 timestamp
    );

    event CategoryAdded(string category);

    constructor() Ownable(msg.sender) {
        // Initialize default categories
        _addCategory("Gene Editing");
        _addCategory("Genomics");
        _addCategory("Pharmacogenomics");
        _addCategory("Bioinformatics");
        _addCategory("Systems Biology");
        _addCategory("Microbiome");
    }

    /**
     * @dev Store a new protocol on the network
     * @param _title Protocol title
     * @param _description Protocol description
     * @param _ipfsHash IPFS hash of the protocol file
     * @param _fileHash Hash of the original file for integrity verification
     * @param _fileSize Size of the protocol file
     * @param _category Protocol category
     */
    function storeProtocol(
        string memory _title,
        string memory _description,
        string memory _ipfsHash,
        string memory _fileHash,
        uint256 _fileSize,
        string memory _category
    ) external payable nonReentrant {
        require(msg.value >= STORAGE_FEE, "Insufficient storage fee");
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_ipfsHash).length > 0, "IPFS hash cannot be empty");
        require(bytes(_fileHash).length > 0, "File hash cannot be empty");
        require(validCategories[_category], "Invalid category");

        _protocolIds++;
        uint256 protocolId = _protocolIds;

        protocols[protocolId] = Protocol({
            id: protocolId,
            title: _title,
            description: _description,
            author: msg.sender,
            ipfsHash: _ipfsHash,
            fileHash: _fileHash,
            fileSize: _fileSize,
            createdAt: block.timestamp,
            updatedAt: block.timestamp,
            status: ProtocolStatus.Pending,
            category: _category,
            verificationCount: 0,
            downloads: 0,
            fundingReceived: msg.value,
            isActive: true
        });

        authorProtocols[msg.sender].push(protocolId);
        totalTreasuryFunds += msg.value;

        emit ProtocolStored(protocolId, msg.sender, _title, _ipfsHash, block.timestamp);
    }

    /**
     * @dev Retrieve a protocol (increments download count)
     * @param _protocolId ID of the protocol to retrieve
     */
    function retrieveProtocol(uint256 _protocolId) external {
        require(_protocolId > 0 && _protocolId <= _protocolIds, "Invalid protocol ID");
        require(protocols[_protocolId].isActive, "Protocol is not active");

        if (!hasDownloaded[_protocolId][msg.sender]) {
            protocols[_protocolId].downloads++;
            hasDownloaded[_protocolId][msg.sender] = true;
        }

        emit ProtocolRetrieved(_protocolId, msg.sender, block.timestamp);
    }

    /**
     * @dev Verify a protocol (only by different users, not the author)
     * @param _protocolId ID of the protocol to verify
     */
    function verifyProtocol(uint256 _protocolId) external {
        require(_protocolId > 0 && _protocolId <= _protocolIds, "Invalid protocol ID");
        require(protocols[_protocolId].isActive, "Protocol is not active");
        require(protocols[_protocolId].author != msg.sender, "Cannot verify own protocol");
        require(!hasVerified[_protocolId][msg.sender], "Already verified this protocol");

        protocols[_protocolId].verificationCount++;
        hasVerified[_protocolId][msg.sender] = true;

        // Auto-verify if enough verifications
        if (protocols[_protocolId].verificationCount >= 3) {
            protocols[_protocolId].status = ProtocolStatus.Verified;
        }

        emit ProtocolVerified(_protocolId, msg.sender, block.timestamp);
    }

    /**
     * @dev Add funding to a protocol
     * @param _protocolId ID of the protocol to fund
     */
    function topUpFunding(uint256 _protocolId) external payable nonReentrant {
        require(_protocolId > 0 && _protocolId <= _protocolIds, "Invalid protocol ID");
        require(protocols[_protocolId].isActive, "Protocol is not active");
        require(msg.value > 0, "Funding amount must be greater than 0");

        protocols[_protocolId].fundingReceived += msg.value;
        totalTreasuryFunds += msg.value;

        emit FundingReceived(_protocolId, msg.sender, msg.value, block.timestamp);
    }

    /**
     * @dev Get protocol details
     * @param _protocolId ID of the protocol
     */
    function getProtocol(uint256 _protocolId) external view returns (Protocol memory) {
        require(_protocolId > 0 && _protocolId <= _protocolIds, "Invalid protocol ID");
        return protocols[_protocolId];
    }

    /**
     * @dev Get protocols by author
     * @param _author Address of the author
     */
    function getProtocolsByAuthor(address _author) external view returns (uint256[] memory) {
        return authorProtocols[_author];
    }

    /**
     * @dev Get total number of protocols
     */
    function getTotalProtocols() external view returns (uint256) {
        return _protocolIds;
    }

    /**
     * @dev Add a new category (only owner)
     * @param _category New category name
     */
    function addCategory(string memory _category) external onlyOwner {
        _addCategory(_category);
    }

    /**
     * @dev Internal function to add category
     */
    function _addCategory(string memory _category) internal {
        require(!validCategories[_category], "Category already exists");
        validCategories[_category] = true;
        categories.push(_category);
        emit CategoryAdded(_category);
    }

    /**
     * @dev Get all categories
     */
    function getCategories() external view returns (string[] memory) {
        return categories;
    }

    /**
     * @dev Withdraw treasury funds (only owner)
     */
    function withdrawTreasury(uint256 _amount) external onlyOwner nonReentrant {
        require(_amount <= totalTreasuryFunds, "Insufficient treasury funds");
        require(_amount <= address(this).balance, "Insufficient contract balance");
        
        totalTreasuryFunds -= _amount;
        payable(owner()).transfer(_amount);
    }

    /**
     * @dev Get contract balance
     */
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    /**
     * @dev Emergency function to deactivate a protocol (only owner)
     */
    function deactivateProtocol(uint256 _protocolId) external onlyOwner {
        require(_protocolId > 0 && _protocolId <= _protocolIds, "Invalid protocol ID");
        protocols[_protocolId].isActive = false;
    }
}
