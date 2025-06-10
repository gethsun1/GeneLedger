import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
  console.log("🚀 Starting GeneLedger contract deployment to Filecoin Calibration Testnet...");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("📝 Deploying contracts with account:", deployer.address);

  // Check deployer balance
  const balance = await deployer.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", ethers.formatEther(balance), "FIL");

  if (balance < ethers.parseEther("0.1")) {
    console.warn("⚠️  Warning: Low balance. Make sure you have enough FIL for deployment.");
  }

  console.log("\n📋 Deployment Plan:");
  console.log("1. StorageRetrieval Contract");
  console.log("2. GovernanceDAO Contract");
  console.log("3. ResearcherBadge Contract");
  console.log("4. ZKVerifier Contract");
  console.log("5. Contract Configuration");

  // Deploy contracts
  const deployedContracts: { [key: string]: string } = {};

  try {
    // 1. Deploy StorageRetrieval
    console.log("\n🔄 Deploying StorageRetrieval contract...");
    const StorageRetrieval = await ethers.getContractFactory("StorageRetrieval");
    const storageRetrieval = await StorageRetrieval.deploy();
    await storageRetrieval.waitForDeployment();
    const storageRetrievalAddress = await storageRetrieval.getAddress();
    deployedContracts.StorageRetrieval = storageRetrievalAddress;
    console.log("✅ StorageRetrieval deployed to:", storageRetrievalAddress);

    // 2. Deploy GovernanceDAO
    console.log("\n🔄 Deploying GovernanceDAO contract...");
    const GovernanceDAO = await ethers.getContractFactory("GovernanceDAO");
    const governanceDAO = await GovernanceDAO.deploy();
    await governanceDAO.waitForDeployment();
    const governanceDAOAddress = await governanceDAO.getAddress();
    deployedContracts.GovernanceDAO = governanceDAOAddress;
    console.log("✅ GovernanceDAO deployed to:", governanceDAOAddress);

    // 3. Deploy ResearcherBadge
    console.log("\n🔄 Deploying ResearcherBadge contract...");
    const ResearcherBadge = await ethers.getContractFactory("ResearcherBadge");
    const researcherBadge = await ResearcherBadge.deploy(
      "GeneLedger Research Badge",
      "GLRB",
      "https://api.geneledger.io/metadata/"
    );
    await researcherBadge.waitForDeployment();
    const researcherBadgeAddress = await researcherBadge.getAddress();
    deployedContracts.ResearcherBadge = researcherBadgeAddress;
    console.log("✅ ResearcherBadge deployed to:", researcherBadgeAddress);

    // 4. Deploy ZKVerifier
    console.log("\n🔄 Deploying ZKVerifier contract...");
    const ZKVerifier = await ethers.getContractFactory("ZKVerifier");
    const zkVerifier = await ZKVerifier.deploy();
    await zkVerifier.waitForDeployment();
    const zkVerifierAddress = await zkVerifier.getAddress();
    deployedContracts.ZKVerifier = zkVerifierAddress;
    console.log("✅ ZKVerifier deployed to:", zkVerifierAddress);

    // 5. Configure contracts
    console.log("\n🔧 Configuring contracts...");

    // Add some initial voting power to deployer in DAO
    console.log("- Adding initial voting power to deployer...");
    await governanceDAO.addVotingPower(deployer.address, 1000);
    await governanceDAO.addReputation(deployer.address, 1000);

    // Authorize deployer as verifier in ZKVerifier
    console.log("- Authorizing deployer as ZK verifier...");
    await zkVerifier.setVerifierAuthorization(deployer.address, true);

    console.log("✅ Contract configuration completed!");

    // Generate contract addresses file
    const contractsConfig = {
      network: "calibration",
      chainId: 314159,
      contracts: {
        StorageRetrieval: {
          address: storageRetrievalAddress,
          abi: "StorageRetrieval.json"
        },
        GovernanceDAO: {
          address: governanceDAOAddress,
          abi: "GovernanceDAO.json"
        },
        ResearcherBadge: {
          address: researcherBadgeAddress,
          abi: "ResearcherBadge.json"
        },
        ZKVerifier: {
          address: zkVerifierAddress,
          abi: "ZKVerifier.json"
        }
      },
      deployedAt: new Date().toISOString(),
      deployer: deployer.address
    };

    // Ensure config directory exists
    const configDir = path.join(__dirname, "..", "src", "config");
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }

    // Write contracts config
    const configPath = path.join(configDir, "contracts.ts");
    const configContent = `// Auto-generated contract configuration
// Generated on: ${new Date().toISOString()}

export const contractConfig = ${JSON.stringify(contractsConfig, null, 2)} as const;

export const STORAGE_RETRIEVAL_ADDRESS = "${storageRetrievalAddress}";
export const GOVERNANCE_DAO_ADDRESS = "${governanceDAOAddress}";
export const RESEARCHER_BADGE_ADDRESS = "${researcherBadgeAddress}";
export const ZK_VERIFIER_ADDRESS = "${zkVerifierAddress}";

export const FILECOIN_CALIBRATION_CONFIG = {
  chainId: 314159,
  name: "Filecoin Calibration Testnet",
  rpcUrl: "https://calibration.node.glif.io/rpc/v1",
  blockExplorer: "https://calibration.filfox.info/en",
  nativeCurrency: {
    name: "Filecoin",
    symbol: "FIL",
    decimals: 18,
  },
} as const;
`;

    fs.writeFileSync(configPath, configContent);
    console.log("📄 Contract configuration written to:", configPath);

    // Update .env file with contract addresses
    const envPath = path.join(__dirname, "..", ".env");
    let envContent = fs.readFileSync(envPath, "utf8");

    envContent = envContent.replace(
      /STORAGE_RETRIEVAL_ADDRESS=.*/,
      `STORAGE_RETRIEVAL_ADDRESS=${storageRetrievalAddress}`
    );
    envContent = envContent.replace(
      /GOVERNANCE_DAO_ADDRESS=.*/,
      `GOVERNANCE_DAO_ADDRESS=${governanceDAOAddress}`
    );
    envContent = envContent.replace(
      /RESEARCHER_BADGE_ADDRESS=.*/,
      `RESEARCHER_BADGE_ADDRESS=${researcherBadgeAddress}`
    );
    envContent = envContent.replace(
      /ZK_VERIFIER_ADDRESS=.*/,
      `ZK_VERIFIER_ADDRESS=${zkVerifierAddress}`
    );

    fs.writeFileSync(envPath, envContent);
    console.log("📄 Environment file updated with contract addresses");

    // Display deployment summary
    console.log("\n🎉 Deployment Summary:");
    console.log("========================");
    console.log(`Network: Filecoin Calibration Testnet (Chain ID: 314159)`);
    console.log(`Deployer: ${deployer.address}`);
    console.log(`Deployment Time: ${new Date().toISOString()}`);
    console.log("\n📋 Contract Addresses:");
    Object.entries(deployedContracts).forEach(([name, address]) => {
      console.log(`${name}: ${address}`);
    });

    console.log("\n🔗 Useful Links:");
    console.log(`Block Explorer: https://calibration.filfox.info/en`);
    console.log(`RPC Endpoint: https://calibration.node.glif.io/rpc/v1`);

    console.log("\n📝 Next Steps:");
    console.log("1. Verify contracts on the block explorer");
    console.log("2. Test contract functionality");
    console.log("3. Update frontend configuration");
    console.log("4. Deploy to production when ready");

    console.log("\n✅ Deployment completed successfully!");

  } catch (error) {
    console.error("\n❌ Deployment failed:", error);
    process.exit(1);
  }
}

// Handle script execution
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment script error:", error);
    process.exit(1);
  });
