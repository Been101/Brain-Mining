"use client";

import { useState } from 'react';
import { Filter, ArrowUpDown } from 'lucide-react';
import Link from 'next/link';
import { NFTCard } from '@/components/nft-card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { NFT, SortOption, FilterOption } from '@/lib/types';

const marketplaceNFTs: NFT[] = [
  {
    id: 1,
    name: "Cyber Fox",
    rarity: "common",
    level: 1,
    image: "https://api.dicebear.com/7.x/adventurer/svg?seed=cyber-fox&backgroundColor=00f3ff",
    price: 0.1,
    owner: "0x1234...5678",
    description: "A cunning digital fox with enhanced cybernetic abilities",
    evolutionStage: 1,
    rarityPercentage: 75,
    listingTime: "2024-03-15T10:00:00Z",
    transactionHistory: [
      {
        time: "2024-03-14T15:30:00Z",
        price: 0.08,
        from: "0xabcd...efgh",
        to: "0x1234...5678"
      }
    ]
  },
  {
    id: 2,
    name: "Digital Dragon",
    rarity: "rare",
    level: 2,
    image: "https://api.dicebear.com/7.x/adventurer/svg?seed=digital-dragon&backgroundColor=9d00ff",
    price: 0.3,
    owner: "0x5678...9abc",
    description: "A majestic dragon born from pure digital energy",
    evolutionStage: 2,
    rarityPercentage: 92,
    listingTime: "2024-03-14T09:00:00Z"
  },
  {
    id: 3,
    name: "Golden Guardian",
    rarity: "epic",
    level: 3,
    image: "https://api.dicebear.com/7.x/adventurer/svg?seed=golden-guardian&backgroundColor=ff00ff",
    price: 0.5,
    owner: "0x9abc...def0",
    description: "An ancient guardian forged in digital gold",
    evolutionStage: 3,
    rarityPercentage: 98,
    listingTime: "2024-03-13T14:00:00Z"
  }
];

export default function MarketplacePage() {
  const [sortBy, setSortBy] = useState<SortOption>("time-desc");
  const [filterBy, setFilterBy] = useState<FilterOption>("all");

  const filteredAndSortedNFTs = marketplaceNFTs
    .filter(nft => filterBy === "all" || nft.rarity === filterBy)
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "time-asc":
          return new Date(a.listingTime!).getTime() - new Date(b.listingTime!).getTime();
        case "time-desc":
          return new Date(b.listingTime!).getTime() - new Date(a.listingTime!).getTime();
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-[#0a0a0f] cyber-grid pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00f3ff] to-[#ff00ff]">
            NFT Marketplace
          </h1>
          <Link href="/marketplace/profile">
            <Button variant="outline" className="neon-border">
              My Profile
            </Button>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 flex gap-4">
            <Select value={filterBy} onValueChange={(value: FilterOption) => setFilterBy(value)}>
              <SelectTrigger className="w-[180px] neon-border">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by Rarity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Rarities</SelectItem>
                <SelectItem value="common">Common</SelectItem>
                <SelectItem value="rare">Rare</SelectItem>
                <SelectItem value="epic">Epic</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
              <SelectTrigger className="w-[180px] neon-border">
                <ArrowUpDown className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="time-asc">Oldest Listings</SelectItem>
                <SelectItem value="time-desc">Newest Listings</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredAndSortedNFTs.map((nft) => (
            <Link key={nft.id} href={`/marketplace/${nft.id}`}>
              <NFTCard
                nft={nft}
                showOwner
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}