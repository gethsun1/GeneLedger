import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Grid, List, Filter, Sparkles } from 'lucide-react';
import NFTCard from '../molecules/NFTCard';
import Button from '../atoms/Button';
import type { GenomicNFT } from '../../types';

const NFTSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedRarity, setSelectedRarity] = useState<'all' | 'common' | 'rare' | 'epic' | 'legendary'>('all');

  // Mock data - replace with actual data fetching
  const mockNFTs: GenomicNFT[] = [
    {
      id: 'nft-1',
      tokenId: '1001',
      title: 'CRISPR Protocol Genesis',
      description: 'The first verified CRISPR protocol NFT on GeneLedger, representing a breakthrough in gene editing methodology.',
      image: 'https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=400',
      owner: 'Dr. Sarah Chen',
      ownerAddress: '0x1234...abcd',
      protocolId: 'protocol-1',
      mintedAt: new Date('2024-01-15'),
      attributes: [
        { trait_type: 'Research Field', value: 'Gene Editing' },
        { trait_type: 'Verification Score', value: 98 },
        { trait_type: 'Impact Factor', value: 'High' },
        { trait_type: 'Rarity Rank', value: 1 },
      ],
      rarity: 'legendary',
      price: 5.5,
      isForSale: true,
    },
    {
      id: 'nft-2',
      tokenId: '1002',
      title: 'Single-Cell RNA-seq Analysis',
      description: 'Advanced computational pipeline for single-cell RNA sequencing immortalized as a unique NFT.',
      image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
      owner: 'Prof. Michael Rodriguez',
      ownerAddress: '0x5678...efgh',
      protocolId: 'protocol-2',
      mintedAt: new Date('2024-01-12'),
      attributes: [
        { trait_type: 'Research Field', value: 'Genomics' },
        { trait_type: 'Verification Score', value: 94 },
        { trait_type: 'Impact Factor', value: 'High' },
        { trait_type: 'Algorithm Type', value: 'Machine Learning' },
      ],
      rarity: 'epic',
      price: 3.2,
      isForSale: true,
    },
    {
      id: 'nft-3',
      tokenId: '1003',
      title: 'Pharmacogenomics Test Kit',
      description: 'Standardized protocol for personalized medicine testing, enabling precision drug therapy.',
      image: 'https://images.pexels.com/photos/4099237/pexels-photo-4099237.jpeg?auto=compress&cs=tinysrgb&w=400',
      owner: 'Dr. Emily Watson',
      ownerAddress: '0x9abc...ijkl',
      protocolId: 'protocol-3',
      mintedAt: new Date('2024-01-10'),
      attributes: [
        { trait_type: 'Research Field', value: 'Pharmacogenomics' },
        { trait_type: 'Verification Score', value: 89 },
        { trait_type: 'Impact Factor', value: 'Medium' },
        { trait_type: 'Clinical Trials', value: 'Phase II' },
      ],
      rarity: 'rare',
      price: 1.8,
      isForSale: false,
    },
    {
      id: 'nft-4',
      tokenId: '1004',
      title: 'Microbiome Analysis Protocol',
      description: 'Comprehensive protocol for human microbiome analysis and therapeutic applications.',
      image: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=400',
      owner: 'Research Collective',
      ownerAddress: '0xdef0...mnop',
      protocolId: 'protocol-4',
      mintedAt: new Date('2024-01-08'),
      attributes: [
        { trait_type: 'Research Field', value: 'Microbiome' },
        { trait_type: 'Verification Score', value: 91 },
        { trait_type: 'Impact Factor', value: 'Medium' },
        { trait_type: 'Sample Size', value: 'Large Cohort' },
      ],
      rarity: 'rare',
      price: 2.1,
      isForSale: true,
    },
    {
      id: 'nft-5',
      tokenId: '1005',
      title: 'Genetic Variant Calling',
      description: 'High-accuracy variant calling protocol for whole genome sequencing data analysis.',
      image: 'https://images.pexels.com/photos/5726794/pexels-photo-5726794.jpeg?auto=compress&cs=tinysrgb&w=400',
      owner: 'Genomics Lab',
      ownerAddress: '0x1357...qrst',
      protocolId: 'protocol-5',
      mintedAt: new Date('2024-01-05'),
      attributes: [
        { trait_type: 'Research Field', value: 'Bioinformatics' },
        { trait_type: 'Verification Score', value: 87 },
        { trait_type: 'Impact Factor', value: 'Medium' },
        { trait_type: 'Accuracy', value: '99.2%' },
      ],
      rarity: 'common',
      isForSale: false,
    },
    {
      id: 'nft-6',
      tokenId: '1006',
      title: 'Proteomics Integration Study',
      description: 'Multi-omics integration protocol combining genomics and proteomics for systems biology.',
      image: 'https://images.pexels.com/photos/8312515/pexels-photo-8312515.jpeg?auto=compress&cs=tinysrgb&w=400',
      owner: 'Systems Biology Institute',
      ownerAddress: '0x2468...uvwx',
      protocolId: 'protocol-6',
      mintedAt: new Date('2024-01-03'),
      attributes: [
        { trait_type: 'Research Field', value: 'Systems Biology' },
        { trait_type: 'Verification Score', value: 93 },
        { trait_type: 'Impact Factor', value: 'High' },
        { trait_type: 'Data Integration', value: 'Multi-omics' },
      ],
      rarity: 'epic',
      price: 4.7,
      isForSale: true,
    },
  ];

  const filteredNFTs = selectedRarity === 'all' 
    ? mockNFTs 
    : mockNFTs.filter(nft => nft.rarity === selectedRarity);

  const rarityStats = {
    legendary: mockNFTs.filter(nft => nft.rarity === 'legendary').length,
    epic: mockNFTs.filter(nft => nft.rarity === 'epic').length,
    rare: mockNFTs.filter(nft => nft.rarity === 'rare').length,
    common: mockNFTs.filter(nft => nft.rarity === 'common').length,
  };

  const handleView = (id: string) => {
    console.log('View NFT:', id);
  };

  return (
    <section id="nfts" className="py-20 bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-purple-600 mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Genomic NFTs
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Own unique digital assets representing groundbreaking genomic research protocols. 
            Each NFT certifies the authenticity and impact of scientific contributions.
          </p>
        </motion.div>

        {/* Stats and Controls */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Rarity Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { rarity: 'legendary', count: rarityStats.legendary, color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
              { rarity: 'epic', count: rarityStats.epic, color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' },
              { rarity: 'rare', count: rarityStats.rare, color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
              { rarity: 'common', count: rarityStats.common, color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200' },
            ].map((stat) => (
              <motion.div
                key={stat.rarity}
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${stat.color} mb-2`}>
                  {stat.rarity}
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.count}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Rarity Filter */}
            <div className="flex flex-wrap gap-2">
              {['all', 'legendary', 'epic', 'rare', 'common'].map((rarity) => (
                <motion.button
                  key={rarity}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedRarity === rarity
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-slate-700 border border-gray-200 dark:border-gray-600'
                  }`}
                  onClick={() => setSelectedRarity(rarity as any)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {rarity === 'all' ? 'All NFTs' : rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                </motion.button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <div className="flex bg-gray-100 dark:bg-slate-700 rounded-lg p-1">
                <motion.button
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-slate-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                  onClick={() => setViewMode('grid')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Grid className="w-4 h-4" />
                </motion.button>
                <motion.button
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-slate-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                  onClick={() => setViewMode('list')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <List className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Summary */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredNFTs.length} NFTs
            {selectedRarity !== 'all' && ` with ${selectedRarity} rarity`}
          </p>
        </motion.div>

        {/* NFT Grid */}
        <motion.div
          className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1 md:grid-cols-2'
          }`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {filteredNFTs.map((nft, index) => (
            <motion.div
              key={nft.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={viewMode === 'list' ? 'col-span-full' : ''}
            >
              <NFTCard nft={nft} onView={handleView} />
            </motion.div>
          ))}
        </motion.div>

        {/* Load More */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Button variant="outline" size="lg">
            Load More NFTs
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default NFTSection;