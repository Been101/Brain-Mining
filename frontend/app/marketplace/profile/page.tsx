"use client";

import { useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { NFTCard } from "@/components/nft-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { NFT } from "@/lib/types";

const userNFTs: NFT[] = [
  {
    id: 1,
    name: "Cyber Fox",
    rarity: "common",
    level: 1,
    image:
      "https://api.dicebear.com/7.x/adventurer/svg?seed=cyber-fox&backgroundColor=00f3ff",
    price: 0.1,
    owner: "0x1234...5678",
  },
  {
    id: 2,
    name: "Digital Dragon",
    rarity: "rare",
    level: 2,
    image:
      "https://api.dicebear.com/7.x/adventurer/svg?seed=digital-dragon&backgroundColor=9d00ff",
    price: 0.3,
    owner: "0x1234...5678",
  },
];

export default function ProfilePage() {
  const [isListing, setIsListing] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const [listingPrice, setListingPrice] = useState("");
  const { toast } = useToast();

  const handleList = async () => {
    setIsListing(false);
    // Here you would integrate with MetaMask and smart contract
    toast.success("Listing Created");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] cyber-grid pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/marketplace"
          className="inline-flex items-center text-[#00f3ff] hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Marketplace
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#00f3ff] to-[#ff00ff]">
            My NFT Collection
          </h1>
          <p className="text-gray-400">Manage your NFTs and listings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {userNFTs.map((nft) => (
            <div key={nft.id} className="relative group">
              <NFTCard nft={nft} />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  onClick={() => {
                    setSelectedNFT(nft);
                    setIsListing(true);
                  }}
                  className="bg-gradient-to-r from-[#00f3ff] to-[#ff00ff] text-white hover:opacity-90"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  List for Sale
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isListing} onOpenChange={setIsListing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>List NFT for Sale</DialogTitle>
            <DialogDescription>
              Set a price for your NFT. Platform fee is 2.5%.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Price (ETH)</label>
              <Input
                type="number"
                step="0.01"
                value={listingPrice}
                onChange={(e) => setListingPrice(e.target.value)}
                placeholder="0.00"
                className="neon-border"
              />
            </div>
            {listingPrice && (
              <div className="p-4 rounded-lg bg-gray-900/30">
                <div className="flex justify-between mb-2">
                  <span>Listing Price</span>
                  <span>{listingPrice} ETH</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Platform Fee (2.5%)</span>
                  <span>
                    {(parseFloat(listingPrice) * 0.025).toFixed(4)} ETH
                  </span>
                </div>
                <div className="border-t border-gray-700 mt-2 pt-2 flex justify-between font-bold">
                  <span>You'll Receive</span>
                  <span>
                    {(parseFloat(listingPrice) * 0.975).toFixed(4)} ETH
                  </span>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsListing(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleList}
              disabled={!listingPrice}
              className="bg-gradient-to-r from-[#00f3ff] to-[#ff00ff] text-white hover:opacity-90"
            >
              List NFT
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
