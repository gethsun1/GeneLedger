import React from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, Shield, Calendar, User } from 'lucide-react';
import Card from '../atoms/Card';
import Badge from '../atoms/Badge';
import Button from '../atoms/Button';
import type { Protocol } from '../../types';

interface ProtocolCardProps {
  protocol: Protocol;
  onView: (id: string) => void;
  onDownload: (id: string) => void;
}

const ProtocolCard: React.FC<ProtocolCardProps> = ({ 
  protocol, 
  onView, 
  onDownload 
}) => {
  const getStatusColor = (status: Protocol['status']) => {
    switch (status) {
      case 'verified': return 'success';
      case 'pending': return 'warning';
      case 'rejected': return 'error';
      default: return 'info';
    }
  };

  return (
    <Card hover className="p-6">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
              {protocol.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-3">
              {protocol.description}
            </p>
          </div>
          <Badge variant={getStatusColor(protocol.status)} size="sm">
            {protocol.status}
          </Badge>
        </div>

        {/* Metadata */}
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>{protocol.author}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>{protocol.createdAt.toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>{protocol.verificationCount} verifications</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {protocol.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" size="sm">
              {tag}
            </Badge>
          ))}
          {protocol.tags.length > 3 && (
            <Badge variant="info" size="sm">
              +{protocol.tags.length - 3} more
            </Badge>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Download className="w-4 h-4" />
              <span>{protocol.downloads.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{(protocol.downloads * 3.2).toFixed(0)}</span>
            </div>
          </div>
          <span className="text-xs">
            {(protocol.fileSize / 1024 / 1024).toFixed(1)} MB
          </span>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onView(protocol.id)}
            className="flex-1"
          >
            <Eye className="w-4 h-4 mr-2" />
            View
          </Button>
          <Button 
            variant="primary" 
            size="sm" 
            onClick={() => onDownload(protocol.id)}
            className="flex-1"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProtocolCard;