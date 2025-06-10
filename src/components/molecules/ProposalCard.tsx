import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, TrendingUp, Vote } from 'lucide-react';
import Card from '../atoms/Card';
import Badge from '../atoms/Badge';
import Button from '../atoms/Button';
import type { DAOProposal } from '../../types';

interface ProposalCardProps {
  proposal: DAOProposal;
  onVote: (id: string, vote: 'for' | 'against') => void;
  onView: (id: string) => void;
}

const ProposalCard: React.FC<ProposalCardProps> = ({ 
  proposal, 
  onVote, 
  onView 
}) => {
  const getStatusColor = (status: DAOProposal['status']) => {
    switch (status) {
      case 'active': return 'success';
      case 'passed': return 'info';
      case 'failed': return 'error';
      case 'executed': return 'primary';
    }
  };

  const getTypeColor = (type: DAOProposal['type']) => {
    switch (type) {
      case 'funding': return 'warning';
      case 'governance': return 'primary';
      case 'protocol': return 'secondary';
    }
  };

  const votePercentage = proposal.totalVotes > 0 
    ? (proposal.votesFor / proposal.totalVotes) * 100 
    : 0;

  const daysRemaining = Math.ceil(
    (proposal.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <Card hover className="p-6">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant={getStatusColor(proposal.status)} size="sm">
                {proposal.status}
              </Badge>
              <Badge variant={getTypeColor(proposal.type)} size="sm">
                {proposal.type}
              </Badge>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
              {proposal.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-3">
              {proposal.description}
            </p>
          </div>
        </div>

        {/* Funding Amount */}
        {proposal.type === 'funding' && proposal.fundingAmount && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
              <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Requesting: {proposal.fundingAmount.toLocaleString()} ETH
              </span>
            </div>
          </div>
        )}

        {/* Voting Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Voting Progress</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {votePercentage.toFixed(1)}% For
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div 
              className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${votePercentage}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>For: {proposal.votesFor.toLocaleString()}</span>
            <span>Against: {proposal.votesAgainst.toLocaleString()}</span>
            <span>Total: {proposal.totalVotes.toLocaleString()}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span>
              {daysRemaining > 0 ? `${daysRemaining} days left` : 'Ended'}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <Users className="w-4 h-4" />
            <span>{proposal.author}</span>
          </div>
        </div>

        {/* Quorum Progress */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Quorum Progress</span>
            <span>{((proposal.totalVotes / proposal.requiredQuorum) * 100).toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
            <motion.div 
              className="bg-purple-500 h-1 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((proposal.totalVotes / proposal.requiredQuorum) * 100, 100)}%` }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
            />
          </div>
        </div>

        {/* Actions */}
        {proposal.status === 'active' ? (
          <div className="flex space-x-2 pt-2">
            <Button 
              variant="primary" 
              size="sm" 
              onClick={() => onVote(proposal.id, 'for')}
              className="flex-1"
            >
              <Vote className="w-4 h-4 mr-2" />
              Vote For
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onVote(proposal.id, 'against')}
              className="flex-1"
            >
              Vote Against
            </Button>
          </div>
        ) : (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onView(proposal.id)}
            className="w-full"
          >
            View Details
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ProposalCard;