import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Heart, Share2 } from 'lucide-react';
import Card from '../atoms/Card';
import Badge from '../atoms/Badge';
import Button from '../atoms/Button';
import type { GenomicNFT } from '../../types';

interface NFTCardProps {
  nft: GenomicNFT;
  onView: (id: string) => void;
}

const NFTCard: React.FC<NFTCardProps> = ({ nft, onView }) => {
  const getRarityColor = (rarity: GenomicNFT['rarity']) => {
    switch (rarity) {
      case 'legendary': return 'text-yellow-500';
      case 'epic': return 'text-purple-500';
      case 'rare': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <Card hover onClick={() => onView(nft.id)} className="overflow-hidden">
      <div className="relative">
        {/* Image */}
        <div className="aspect-square bg-gradient-to-br from-purple-100 to-teal-100 dark:from-purple-900 dark:to-teal-900 flex items-center justify-center">
          <img 
            src={nft.image} 
            alt={nft.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling!.classList.remove('hidden');
            }}
          />
          <div className="hidden flex-col items-center justify-center text-center p-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-2">
              {nft.title.charAt(0)}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Genomic Data NFT</p>
          </div>
        </div>

        {/* Overlay Actions */}
        <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <motion.button
            className="p-1.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Heart className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          </motion.button>
          <motion.button
            className="p-1.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Share2 className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          </motion.button>
        </div>

        {/* Rarity Badge */}
        <div className="absolute top-2 left-2">
          <Badge 
            variant={nft.rarity === 'legendary' ? 'warning' : nft.rarity === 'epic' ? 'primary' : 'info'}
            size="sm"
          >
            {nft.rarity}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">
            {nft.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {nft.description}
          </p>
        </div>

        {/* Owner Info */}
        <div className="flex items-center justify-between text-sm">
          <div>
            <span className="text-gray-500 dark:text-gray-400">Owner:</span>
            <span className="ml-1 font-medium text-gray-900 dark:text-white">
              {nft.owner}
            </span>
          </div>
          {nft.price && (
            <div className="text-right">
              <span className="text-gray-500 dark:text-gray-400">Price:</span>
              <span className="ml-1 font-semibold text-purple-600 dark:text-purple-400">
                {nft.price} ETH
              </span>
            </div>
          )}
        </div>

        {/* Attributes Preview */}
        <div className="flex flex-wrap gap-1">
          {nft.attributes.slice(0, 2).map((attr, index) => (
            <Badge key={index} variant="secondary" size="sm">
              {attr.trait_type}: {attr.value}
            </Badge>
          ))}
          {nft.attributes.length > 2 && (
            <Badge variant="info" size="sm">
              +{nft.attributes.length - 2}
            </Badge>
          )}
        </div>

        {/* Action */}
        {nft.isForSale && (
          <Button variant="primary" size="sm" className="w-full">
            {nft.price ? 'Buy Now' : 'Make Offer'}
          </Button>
        )}
      </div>
    </Card>
  );
};

export default NFTCard;