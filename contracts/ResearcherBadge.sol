// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title ResearcherBadge
 * @dev NFT contract for genomic research protocol badges
 * Each verified protocol gets a unique NFT representing its contribution
 */
contract ResearcherBadge is ERC721URIStorage, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    using Strings for uint256;

    struct BadgeMetadata {
        uint256 tokenId;
        uint256 protocolId;
        string protocolTitle;
        address researcher;
        string researchField;
        uint256 verificationScore;
        string impactFactor;
        uint256 mintedAt;
        BadgeRarity rarity;
        string metadataURI;
    }

    enum BadgeRarity {
        Common,
        Rare,
        Epic,
        Legendary
    }

    // State variables
    Counters.Counter private _tokenIds;
    mapping(uint256 => BadgeMetadata) public badgeMetadata;
    mapping(uint256 => uint256) public protocolToBadge; // protocolId => tokenId
    mapping(address => uint256[]) public researcherBadges;
    mapping(BadgeRarity => uint256) public rarityCount;

    // Marketplace functionality
    mapping(uint256 => uint256) public tokenPrices;
    mapping(uint256 => bool) public tokensForSale;

    // Base URI for metadata
    string private _baseTokenURI;

    // Events
    event BadgeMinted(
        uint256 indexed tokenId,
        uint256 indexed protocolId,
        address indexed researcher,
        BadgeRarity rarity,
        uint256 timestamp
    );

    event BadgeListed(
        uint256 indexed tokenId,
        address indexed seller,
        uint256 price
    );

    event BadgeSold(
        uint256 indexed tokenId,
        address indexed seller,
        address indexed buyer,
        uint256 price
    );

    event BadgeUnlisted(
        uint256 indexed tokenId,
        address indexed owner
    );

    constructor(string memory _name, string memory _symbol, string memory _baseURI) 
        ERC721(_name, _symbol) {
        _baseTokenURI = _baseURI;
    }

    /**
     * @dev Mint a researcher badge for a verified protocol
     * @param _to Address to mint the badge to
     * @param _protocolId ID of the verified protocol
     * @param _protocolTitle Title of the protocol
     * @param _researchField Research field category
     * @param _verificationScore Verification score (0-100)
     * @param _impactFactor Impact factor (Low, Medium, High)
     * @param _metadataURI URI for the token metadata
     */
    function mintResearcherBadge(
        address _to,
        uint256 _protocolId,
        string memory _protocolTitle,
        string memory _researchField,
        uint256 _verificationScore,
        string memory _impactFactor,
        string memory _metadataURI
    ) external onlyOwner returns (uint256) {
        require(_to != address(0), "Cannot mint to zero address");
        require(_protocolId > 0, "Invalid protocol ID");
        require(protocolToBadge[_protocolId] == 0, "Badge already minted for this protocol");
        require(_verificationScore <= 100, "Verification score must be <= 100");

        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();

        // Determine rarity based on verification score and impact
        BadgeRarity rarity = _determineRarity(_verificationScore, _impactFactor);

        // Create badge metadata
        badgeMetadata[tokenId] = BadgeMetadata({
            tokenId: tokenId,
            protocolId: _protocolId,
            protocolTitle: _protocolTitle,
            researcher: _to,
            researchField: _researchField,
            verificationScore: _verificationScore,
            impactFactor: _impactFactor,
            mintedAt: block.timestamp,
            rarity: rarity,
            metadataURI: _metadataURI
        });

        // Update mappings
        protocolToBadge[_protocolId] = tokenId;
        researcherBadges[_to].push(tokenId);
        rarityCount[rarity]++;

        // Mint the NFT
        _safeMint(_to, tokenId);
        _setTokenURI(tokenId, _metadataURI);

        emit BadgeMinted(tokenId, _protocolId, _to, rarity, block.timestamp);

        return tokenId;
    }

    /**
     * @dev Determine badge rarity based on verification score and impact factor
     */
    function _determineRarity(uint256 _verificationScore, string memory _impactFactor) 
        internal pure returns (BadgeRarity) {
        
        bytes32 impactHash = keccak256(abi.encodePacked(_impactFactor));
        bytes32 highImpact = keccak256(abi.encodePacked("High"));
        bytes32 mediumImpact = keccak256(abi.encodePacked("Medium"));

        if (_verificationScore >= 95 && impactHash == highImpact) {
            return BadgeRarity.Legendary;
        } else if (_verificationScore >= 90 && impactHash == highImpact) {
            return BadgeRarity.Epic;
        } else if (_verificationScore >= 85 || impactHash == mediumImpact) {
            return BadgeRarity.Rare;
        } else {
            return BadgeRarity.Common;
        }
    }

    /**
     * @dev List a badge for sale
     * @param _tokenId Token ID to list
     * @param _price Price in wei
     */
    function listBadgeForSale(uint256 _tokenId, uint256 _price) external {
        require(ownerOf(_tokenId) == msg.sender, "Not the owner of this badge");
        require(_price > 0, "Price must be greater than 0");
        require(!tokensForSale[_tokenId], "Badge already listed");

        tokensForSale[_tokenId] = true;
        tokenPrices[_tokenId] = _price;

        emit BadgeListed(_tokenId, msg.sender, _price);
    }

    /**
     * @dev Buy a badge that's listed for sale
     * @param _tokenId Token ID to purchase
     */
    function buyBadge(uint256 _tokenId) external payable nonReentrant {
        require(tokensForSale[_tokenId], "Badge not for sale");
        require(msg.value >= tokenPrices[_tokenId], "Insufficient payment");

        address seller = ownerOf(_tokenId);
        uint256 price = tokenPrices[_tokenId];

        // Remove from sale
        tokensForSale[_tokenId] = false;
        tokenPrices[_tokenId] = 0;

        // Update researcher badges mapping
        _removeFromResearcherBadges(seller, _tokenId);
        researcherBadges[msg.sender].push(_tokenId);

        // Transfer the NFT
        _transfer(seller, msg.sender, _tokenId);

        // Transfer payment to seller
        payable(seller).transfer(price);

        // Refund excess payment
        if (msg.value > price) {
            payable(msg.sender).transfer(msg.value - price);
        }

        emit BadgeSold(_tokenId, seller, msg.sender, price);
    }

    /**
     * @dev Unlist a badge from sale
     * @param _tokenId Token ID to unlist
     */
    function unlistBadge(uint256 _tokenId) external {
        require(ownerOf(_tokenId) == msg.sender, "Not the owner of this badge");
        require(tokensForSale[_tokenId], "Badge not listed for sale");

        tokensForSale[_tokenId] = false;
        tokenPrices[_tokenId] = 0;

        emit BadgeUnlisted(_tokenId, msg.sender);
    }

    /**
     * @dev Remove token from researcher's badge array
     */
    function _removeFromResearcherBadges(address _researcher, uint256 _tokenId) internal {
        uint256[] storage badges = researcherBadges[_researcher];
        for (uint256 i = 0; i < badges.length; i++) {
            if (badges[i] == _tokenId) {
                badges[i] = badges[badges.length - 1];
                badges.pop();
                break;
            }
        }
    }

    /**
     * @dev Get badge metadata
     * @param _tokenId Token ID
     */
    function getBadgeMetadata(uint256 _tokenId) external view returns (BadgeMetadata memory) {
        require(_exists(_tokenId), "Badge does not exist");
        return badgeMetadata[_tokenId];
    }

    /**
     * @dev Get badges owned by a researcher
     * @param _researcher Address of the researcher
     */
    function getBadgesByResearcher(address _researcher) external view returns (uint256[] memory) {
        return researcherBadges[_researcher];
    }

    /**
     * @dev Get total number of badges
     */
    function getTotalBadges() external view returns (uint256) {
        return _tokenIds.current();
    }

    /**
     * @dev Get badges for sale
     */
    function getBadgesForSale() external view returns (uint256[] memory, uint256[] memory) {
        uint256 totalTokens = _tokenIds.current();
        uint256 forSaleCount = 0;

        // Count badges for sale
        for (uint256 i = 1; i <= totalTokens; i++) {
            if (tokensForSale[i]) {
                forSaleCount++;
            }
        }

        uint256[] memory tokenIds = new uint256[](forSaleCount);
        uint256[] memory prices = new uint256[](forSaleCount);
        uint256 index = 0;

        // Populate arrays
        for (uint256 i = 1; i <= totalTokens; i++) {
            if (tokensForSale[i]) {
                tokenIds[index] = i;
                prices[index] = tokenPrices[i];
                index++;
            }
        }

        return (tokenIds, prices);
    }

    /**
     * @dev Get rarity statistics
     */
    function getRarityStats() external view returns (uint256, uint256, uint256, uint256) {
        return (
            rarityCount[BadgeRarity.Common],
            rarityCount[BadgeRarity.Rare],
            rarityCount[BadgeRarity.Epic],
            rarityCount[BadgeRarity.Legendary]
        );
    }

    /**
     * @dev Set base URI for metadata (only owner)
     */
    function setBaseURI(string memory _baseURI) external onlyOwner {
        _baseTokenURI = _baseURI;
    }

    /**
     * @dev Get base URI
     */
    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    /**
     * @dev Override transfer to update researcher badges mapping
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal virtual override {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);

        if (from != address(0) && to != address(0)) {
            // Remove from old owner's badges
            _removeFromResearcherBadges(from, tokenId);
            // Add to new owner's badges
            researcherBadges[to].push(tokenId);
        }
    }

    /**
     * @dev Check if badge exists
     */
    function badgeExists(uint256 _tokenId) external view returns (bool) {
        return _exists(_tokenId);
    }
}
