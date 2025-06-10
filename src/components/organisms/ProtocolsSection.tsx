import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, Upload } from 'lucide-react';
import ProtocolCard from '../molecules/ProtocolCard';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import type { Protocol } from '../../types';

const ProtocolsSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data - replace with actual data fetching
  const mockProtocols: Protocol[] = [
    {
      id: '1',
      title: 'CRISPR-Cas9 Gene Editing Protocol for Therapeutic Applications',
      description: 'Comprehensive protocol for precise gene editing using CRISPR-Cas9 system with enhanced specificity and reduced off-target effects.',
      author: 'Dr. Sarah Chen',
      authorId: 'author1',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
      status: 'verified',
      category: 'Gene Editing',
      tags: ['CRISPR', 'Gene Therapy', 'Precision Medicine'],
      fileSize: 2500000,
      fileName: 'crispr-protocol-v3.pdf',
      zkProofHash: '0x1234...abcd',
      verificationCount: 847,
      downloads: 15632,
      nftTokenId: 'nft-001',
    },
    {
      id: '2',
      title: 'Single-Cell RNA Sequencing Analysis Pipeline',
      description: 'Advanced computational pipeline for analyzing single-cell RNA sequencing data with machine learning integration.',
      author: 'Prof. Michael Rodriguez',
      authorId: 'author2',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-12'),
      status: 'verified',
      category: 'Genomics',
      tags: ['RNA-seq', 'Single Cell', 'Bioinformatics'],
      fileSize: 1800000,
      fileName: 'scrna-pipeline.zip',
      verificationCount: 523,
      downloads: 8934,
    },
    {
      id: '3',
      title: 'Pharmacogenomics Testing Protocol',
      description: 'Standardized protocol for pharmacogenomic testing to personalize drug therapies based on genetic variations.',
      author: 'Dr. Emily Watson',
      authorId: 'author3',
      createdAt: new Date('2024-01-08'),
      updatedAt: new Date('2024-01-08'),
      status: 'pending',
      category: 'Pharmacogenomics',
      tags: ['Pharmacogenomics', 'Personalized Medicine', 'Drug Testing'],
      fileSize: 3200000,
      fileName: 'pharmacogenomics-protocol.pdf',
      verificationCount: 12,
      downloads: 234,
    },
  ];

  const categories = ['all', 'Gene Editing', 'Genomics', 'Pharmacogenomics', 'Bioinformatics'];

  const filteredProtocols = mockProtocols.filter(protocol => {
    const matchesSearch = protocol.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         protocol.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         protocol.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || protocol.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleView = (id: string) => {
    console.log('View protocol:', id);
  };

  const handleDownload = (id: string) => {
    console.log('Download protocol:', id);
  };

  return (
    <section id="protocols" className="py-20 bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Research Protocols
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover, verify, and contribute to the world's largest decentralized repository of genomic research protocols.
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          className="mb-12 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Search and Upload */}
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 max-w-md">
              <Input
                placeholder="Search protocols..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search className="w-5 h-5 text-gray-400" />}
              />
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" size="md">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button variant="primary" size="md">
                <Upload className="w-4 h-4 mr-2" />
                Upload Protocol
              </Button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-slate-700 border border-gray-200 dark:border-gray-600'
                }`}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category === 'all' ? 'All Categories' : category}
              </motion.button>
            ))}
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
            Found {filteredProtocols.length} protocol{filteredProtocols.length !== 1 ? 's' : ''}
            {searchTerm && ` matching "${searchTerm}"`}
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
          </p>
        </motion.div>

        {/* Protocol Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {filteredProtocols.map((protocol, index) => (
            <motion.div
              key={protocol.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProtocolCard
                protocol={protocol}
                onView={handleView}
                onDownload={handleDownload}
              />
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
            <Plus className="w-4 h-4 mr-2" />
            Load More Protocols
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProtocolsSection;