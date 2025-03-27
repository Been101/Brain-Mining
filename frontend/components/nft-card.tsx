"use client";

import { cn } from '@/lib/utils';
import type { NFT } from '@/lib/types';

interface NFTCardProps {
  nft: NFT;
  selected?: boolean;
  onSelect?: () => void;
  showOwner?: boolean;
}

const rarityColors = {
  common: "from-blue-500 to-blue-700",
  rare: "from-purple-500 to-purple-700",
  epic: "from-yellow-500 to-yellow-700",
};

export function NFTCard({ nft, selected, onSelect, showOwner }: NFTCardProps) {
  return (
    <div
      onClick={onSelect}
      className={cn(
        "group relative overflow-hidden rounded-xl transition-all duration-300 transform hover:-translate-y-2",
        "neon-border bg-gray-900/30 backdrop-blur-sm",
        selected && "ring-2 ring-[#00f3ff]"
      )}
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={nft.image}
          alt={nft.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-white">{nft.name}</h3>
          <span className={cn(
            "px-2 py-1 rounded-full text-xs font-medium",
            "bg-gradient-to-r",
            rarityColors[nft.rarity]
          )}>
            {nft.rarity.toUpperCase()}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-300">Level {nft.level}</span>
          <span className="text-[#00f3ff]">{nft.price} ETH</span>
        </div>
        {showOwner && (
          <div className="mt-2 text-xs text-gray-400">
            Owner: {nft.owner}
          </div>
        )}
      </div>
    </div>
  );
}