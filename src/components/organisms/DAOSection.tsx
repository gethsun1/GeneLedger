import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign, Clock, Plus } from 'lucide-react';
import ProposalCard from '../molecules/ProposalCard';
import Button from '../atoms/Button';
import Card from '../atoms/Card';
import type { DAOProposal } from '../../types';

const DAOSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'all'>('active');

  // Mock data - replace with actual data fetching
  const mockProposals: DAOProposal[] = [
    {
      id: '1',
      title: 'Fund Advanced CRISPR Research Initiative',
      description: 'Proposal to allocate 500 ETH for groundbreaking CRISPR research focused on treating genetic disorders. This funding will support 3 research teams over 12 months.',
      author: 'Dr. Research Collective',
      authorId: 'dao-member-1',
      createdAt: new Date('2024-01-20'),
      endDate: new Date('2024-02-05'),
      status: 'active',
      type: 'funding',
      votesFor: 1247,
      votesAgainst: 89,
      totalVotes: 1336,
      requiredQuorum: 2000,
      fundingAmount: 500,
    },
    {
      id: '2',
      title: 'Update Protocol Verification Standards',
      description: 'Proposal to implement enhanced verification standards for protocol submissions, including mandatory peer review and automated quality checks.',
      author: 'Verification Committee',
      authorId: 'dao-member-2',
      createdAt: new Date('2024-01-18'),
      endDate: new Date('2024-02-03'),
      status: 'active',
      type: 'governance',
      votesFor: 892,
      votesAgainst: 156,
      totalVotes: 1048,
      requiredQuorum: 1500,
    },
    {
      id: '3',
      title: 'Integrate New Genomic Analysis Protocol',
      description: 'Proposal to officially integrate the AI-enhanced genomic analysis protocol developed by the Stanford team into our standard toolkit.',
      author: 'Protocol Integration Team',
      authorId: 'dao-member-3',
      createdAt: new Date('2024-01-15'),
      endDate: new Date('2024-01-30'),
      status: 'passed',
      type: 'protocol',
      votesFor: 1567,
      votesAgainst: 234,
      totalVotes: 1801,
      requiredQuorum: 1500,
    },
  ];

  const filteredProposals = activeTab === 'active' 
    ? mockProposals.filter(p => p.status === 'active')
    : mockProposals;

  const stats = [
    { icon: TrendingUp, label: 'Active Proposals', value: '12', color: 'text-green-600' },
    { icon: Users, label: 'DAO Members', value: '2,847', color: 'text-purple-600' },
    { icon: DollarSign, label: 'Treasury', value: '1,250 ETH', color: 'text-teal-600' },
    { icon: Clock, label: 'Avg. Proposal Time', value: '14 days', color: 'text-orange-600' },
  ];

  const handleVote = (id: string, vote: 'for' | 'against') => {
    console.log('Vote:', id, vote);
  };

  const handleView = (id: string) => {
    console.log('View proposal:', id);
  };

  return (
    <section id="dao" className="py-20 bg-white dark:bg-slate-800">
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
            Decentralized Governance
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Shape the future of genomic research through democratic decision-making. 
            Vote on proposals, fund research, and govern the protocol together.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
            >
              <Card className="p-6 hover:shadow-xl transition-shadow duration-300">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${
                  stat.color === 'text-green-600' ? 'bg-green-100 dark:bg-green-900' :
                  stat.color === 'text-purple-600' ? 'bg-purple-100 dark:bg-purple-900' :
                  stat.color === 'text-teal-600' ? 'bg-teal-100 dark:bg-teal-900' :
                  'bg-orange-100 dark:bg-orange-900'
                }`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Tabs and Create Button */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex bg-gray-100 dark:bg-slate-700 rounded-lg p-1 mb-4 md:mb-0">
            {[
              { key: 'active', label: 'Active Proposals' },
              { key: 'all', label: 'All Proposals' },
            ].map((tab) => (
              <motion.button
                key={tab.key}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.key
                    ? 'bg-white dark:bg-slate-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
                onClick={() => setActiveTab(tab.key as 'active' | 'all')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
          <Button variant="primary" size="md">
            <Plus className="w-4 h-4 mr-2" />
            Create Proposal
          </Button>
        </motion.div>

        {/* Proposals Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {filteredProposals.map((proposal, index) => (
            <motion.div
              key={proposal.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProposalCard
                proposal={proposal}
                onVote={handleVote}
                onView={handleView}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Quadratic Funding Visualization */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Card className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Quadratic Funding Round
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Current funding round ends in 12 days. Contribute to projects you believe in.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'AI-Enhanced Diagnostics', raised: '125 ETH', contributors: 89, match: '67%' },
                { name: 'Rare Disease Research', raised: '98 ETH', contributors: 156, match: '78%' },
                { name: 'Open Source Tools', raised: '67 ETH', contributors: 234, match: '45%' },
              ].map((project, index) => (
                <motion.div
                  key={project.name}
                  className="bg-gray-50 dark:bg-slate-700 rounded-lg p-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {project.name}
                  </h4>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex justify-between">
                      <span>Raised:</span>
                      <span className="font-medium">{project.raised}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Contributors:</span>
                      <span className="font-medium">{project.contributors}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Match:</span>
                      <span className="font-medium text-green-600">{project.match}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    Contribute
                  </Button>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default DAOSection;