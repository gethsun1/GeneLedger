# GeneLedger 🧬⛓️

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Solidity](https://img.shields.io/badge/Solidity-363636?style=flat&logo=solidity&logoColor=white)](https://soliditylang.org/)
[![Filecoin](https://img.shields.io/badge/Filecoin-0090FF?style=flat&logo=filecoin&logoColor=white)](https://filecoin.io/)

> **Revolutionizing genomic research through decentralized collaboration and blockchain technology**

GeneLedger is a cutting-edge decentralized platform that transforms how genomic research protocols are stored, verified, and shared. Built on the Filecoin network, it combines the power of blockchain technology with advanced cryptographic verification to create a trustless, transparent ecosystem for scientific collaboration.

## 🌟 Key Features

### 🔬 **Protocol Storage & Retrieval**
- **Decentralized Storage**: Secure protocol storage on Filecoin with IPFS integration
- **Integrity Verification**: Zero-knowledge proofs ensure protocol authenticity
- **Version Control**: Track protocol updates and maintain research lineage
- **Access Control**: Flexible permissions for public and private research

### 🏛️ **DAO Governance**
- **Democratic Decision Making**: Community-driven protocol governance
- **Quadratic Voting**: Fair representation with quadratic voting mechanisms
- **Funding Allocation**: Transparent research funding through smart contracts
- **Proposal System**: Submit and vote on platform improvements

### 🏆 **Research NFT Badges**
- **Achievement Recognition**: ERC721 tokens for verified research contributions
- **Rarity System**: Dynamic rarity based on impact and verification scores
- **Marketplace**: Trade and showcase research achievements
- **Reputation Building**: Build scientific credibility through verifiable contributions

### 🔐 **Zero-Knowledge Verification**
- **Privacy-Preserving**: Verify protocol integrity without revealing sensitive data
- **Cryptographic Proofs**: Advanced ZK-SNARK implementation
- **Batch Verification**: Efficient verification of multiple protocols
- **Tamper Detection**: Immutable proof of research authenticity

## 🛠️ Technology Stack

### **Frontend**
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions

### **Blockchain**
- **Solidity ^0.8.18** - Smart contract development
- **Hardhat** - Ethereum development environment
- **OpenZeppelin** - Secure contract libraries
- **Ethers.js v6** - Blockchain interaction library
- **Filecoin (FVM)** - Decentralized storage network

### **Development Tools**
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Git** - Version control
- **npm** - Package management

## 📋 Smart Contracts

### 🗄️ **StorageRetrieval.sol**
Manages the core functionality of protocol storage and retrieval on the Filecoin network.

**Key Functions:**
- `storeProtocol()` - Store research protocols with FIL payment
- `retrieveProtocol()` - Access stored protocols with download tracking
- `verifyProtocol()` - Community verification system
- `topUpFunding()` - Add funding to existing protocols

### 🏛️ **GovernanceDAO.sol**
Implements decentralized governance with quadratic voting and funding mechanisms.

**Key Functions:**
- `submitProposal()` - Create governance proposals
- `voteOnProposal()` - Quadratic voting implementation
- `executeProposal()` - Execute passed proposals
- `createFundingRound()` - Launch quadratic funding rounds

### 🏆 **ResearcherBadge.sol**
ERC721 NFT contract for research achievement recognition and marketplace functionality.

**Key Functions:**
- `mintResearcherBadge()` - Mint NFTs for verified protocols
- `listBadgeForSale()` - Marketplace listing functionality
- `buyBadge()` - Purchase listed NFTs
- `getBadgesByResearcher()` - Query researcher's achievements

### 🔐 **ZKVerifier.sol**
Zero-knowledge proof verification system for protocol integrity.

**Key Functions:**
- `verifyProtocolIntegrity()` - ZK proof verification
- `batchVerifyProtocols()` - Efficient batch verification
- `setVerificationKey()` - Configure verification parameters
- `isHashVerified()` - Check verification status

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0 or **yarn** >= 1.22.0
- **Git** for version control

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/gethsun1/GeneLedger.git
cd GeneLedger
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment setup**
```bash
cp .env.example .env
```

Edit `.env` file with your configuration:
```env
# Filecoin Calibration Testnet Configuration
FVM_CALIBRATION_RPC=https://calibration.node.glif.io/rpc/v1
VITE_FVM_RPC=https://calibration.node.glif.io/rpc/v1

# Deployer Private Key (Add your testnet private key)
# ⚠️ NEVER commit real private keys to version control
DEPLOYER_PRIVATE_KEY=your_testnet_private_key_here

# Network Configuration
CHAIN_ID=314159
NETWORK_NAME=calibration
```

4. **Compile smart contracts**
```bash
npx hardhat compile
```

5. **Run development server**
```bash
npm run dev
```

### Filecoin Testnet Setup

1. **Get Calibration Testnet FIL**
   - Visit [Filecoin Calibration Faucet](https://faucet.calibration.fildev.network/)
   - Request test FIL for your wallet address

2. **Deploy contracts to testnet**
```bash
npx hardhat run scripts/deploy.ts --network calibration
```

3. **Verify deployment**
   - Check contract addresses in the console output
   - Verify on [Calibration Explorer](https://calibration.filfox.info/)

## 📁 Project Structure

```
GeneLedger/
├── contracts/                 # Smart contracts
│   ├── StorageRetrieval.sol  # Protocol storage & retrieval
│   ├── GovernanceDAO.sol     # DAO governance system
│   ├── ResearcherBadge.sol   # NFT badges for researchers
│   └── ZKVerifier.sol        # Zero-knowledge verification
├── scripts/                  # Deployment scripts
│   └── deploy.ts            # Contract deployment script
├── src/                     # Frontend application
│   ├── components/          # React components
│   │   ├── atoms/          # Basic UI components
│   │   ├── molecules/      # Composite components
│   │   └── organisms/      # Complex page sections
│   ├── hooks/              # Custom React hooks
│   ├── types/              # TypeScript type definitions
│   └── config/             # Configuration files
├── test/                   # Contract tests
├── hardhat.config.cjs      # Hardhat configuration
├── package.json           # Dependencies and scripts
└── README.md              # Project documentation
```

## 🎮 Usage Instructions

### Development Workflow

1. **Start the development server**
```bash
npm run dev
```
Access the application at `http://localhost:5173`

2. **Build for production**
```bash
npm run build
```

3. **Preview production build**
```bash
npm run preview
```

### Smart Contract Development

1. **Compile contracts**
```bash
npx hardhat compile
```

2. **Run tests**
```bash
npx hardhat test
```

3. **Deploy to local network**
```bash
npx hardhat node
npx hardhat run scripts/deploy.ts --network localhost
```

4. **Deploy to Filecoin Calibration testnet**
```bash
npx hardhat run scripts/deploy.ts --network calibration
```

### Frontend Integration

After contract deployment, the contract addresses will be automatically updated in:
- `src/config/contracts.ts` - Contract configuration
- `.env` - Environment variables

## ⚠️ Important Security Notes

- **Never commit private keys** to version control
- **Use testnet only** for development and testing
- **Audit contracts** before mainnet deployment
- **Verify contract addresses** before interacting
- **Keep dependencies updated** for security patches

## 🤝 Contributing

We welcome contributions from the community! Please follow these guidelines:

### Development Process

1. **Fork the repository**
2. **Create a feature branch**
```bash
git checkout -b feature/your-feature-name
```

3. **Make your changes**
   - Follow existing code style and conventions
   - Add tests for new functionality
   - Update documentation as needed

4. **Test your changes**
```bash
npm run test
npm run lint
```

5. **Commit your changes**
```bash
git commit -m "feat: add your feature description"
```

6. **Push to your fork**
```bash
git push origin feature/your-feature-name
```

7. **Create a Pull Request**

### Coding Standards

- **TypeScript**: Use strict type checking
- **React**: Follow React best practices and hooks patterns
- **Solidity**: Follow OpenZeppelin standards and security practices
- **Testing**: Maintain >80% test coverage
- **Documentation**: Update README and inline comments

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation updates
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test additions or updates
- `chore:` - Maintenance tasks

## 🧪 Testing

### Frontend Tests
```bash
npm run test
```

### Smart Contract Tests
```bash
npx hardhat test
```

### Coverage Reports
```bash
npx hardhat coverage
```

## 🚀 Deployment

### Testnet Deployment

1. **Configure environment variables**
2. **Fund your wallet** with Calibration testnet FIL
3. **Deploy contracts**:
```bash
npx hardhat run scripts/deploy.ts --network calibration
```

### Production Deployment

⚠️ **Production deployment requires additional security measures:**

- Professional security audit
- Multi-signature wallet setup
- Gradual rollout strategy
- Comprehensive testing on testnet

## 📚 Documentation

- **Smart Contract Documentation**: Generated with NatSpec
- **API Documentation**: Available in `/docs` (coming soon)
- **User Guide**: Comprehensive user documentation (coming soon)
- **Developer Guide**: Technical implementation details (coming soon)

## 🔗 Useful Links

- **Filecoin Documentation**: [https://docs.filecoin.io/](https://docs.filecoin.io/)
- **Hardhat Documentation**: [https://hardhat.org/docs](https://hardhat.org/docs)
- **OpenZeppelin Contracts**: [https://docs.openzeppelin.com/contracts](https://docs.openzeppelin.com/contracts)
- **React Documentation**: [https://react.dev/](https://react.dev/)
- **Calibration Testnet Explorer**: [https://calibration.filfox.info/](https://calibration.filfox.info/)

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🆘 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/gethsun1/GeneLedger/issues)
- **Discussions**: [GitHub Discussions](https://github.com/gethsun1/GeneLedger/discussions)
- **Email**: [Contact the team](mailto:support@geneledger.io)

## 🙏 Acknowledgments

- **Filecoin Foundation** for the decentralized storage infrastructure
- **OpenZeppelin** for secure smart contract libraries
- **React Team** for the excellent frontend framework
- **Hardhat Team** for the development environment
- **The genomics research community** for inspiration and feedback

---

**Built with ❤️ for the future of decentralized science**

*GeneLedger - Where genomic research meets blockchain innovation*
