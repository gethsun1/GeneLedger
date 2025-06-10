export interface Protocol {
  id: string;
  title: string;
  description: string;
  author: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'pending' | 'verified' | 'rejected';
  category: string;
  tags: string[];
  fileSize: number;
  fileName: string;
  zkProofHash?: string;
  verificationCount: number;
  downloads: number;
  nftTokenId?: string;
}

export interface DAOProposal {
  id: string;
  title: string;
  description: string;
  author: string;
  authorId: string;
  createdAt: Date;
  endDate: Date;
  status: 'active' | 'passed' | 'failed' | 'executed';
  type: 'funding' | 'governance' | 'protocol';
  votesFor: number;
  votesAgainst: number;
  totalVotes: number;
  requiredQuorum: number;
  fundingAmount?: number;
  protocolId?: string;
}

export interface Vote {
  id: string;
  proposalId: string;
  voterId: string;
  voterAddress: string;
  vote: 'for' | 'against';
  weight: number;
  timestamp: Date;
  quadraticWeight?: number;
}

export interface GenomicNFT {
  id: string;
  tokenId: string;
  title: string;
  description: string;
  image: string;
  owner: string;
  ownerAddress: string;
  protocolId: string;
  mintedAt: Date;
  attributes: NFTAttribute[];
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  price?: number;
  isForSale: boolean;
}

export interface NFTAttribute {
  trait_type: string;
  value: string | number;
  rarity?: number;
}

export interface User {
  id: string;
  address: string;
  username?: string;
  avatar?: string;
  reputation: number;
  protocolsSubmitted: number;
  nftsOwned: number;
  votingPower: number;
  joinedAt: Date;
}

export interface QuadraticFunding {
  id: string;
  title: string;
  description: string;
  totalPool: number;
  matchingPool: number;
  contributors: number;
  endDate: Date;
  projects: FundingProject[];
}

export interface FundingProject {
  id: string;
  title: string;
  description: string;
  author: string;
  raised: number;
  contributors: number;
  matchingAmount: number;
  contributions: Contribution[];
}

export interface Contribution {
  id: string;
  projectId: string;
  contributor: string;
  amount: number;
  timestamp: Date;
  quadraticMatch: number;
}

export interface Theme {
  name: 'light' | 'dark';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
  };
}