'use client'

import { useState } from 'react'
import { ArrowLeft, History } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { NFT } from '@/lib/types';

interface ClientPageProps {
  id: string;
  initialData: NFT;
}

export default function ClientPage({ id, initialData }: ClientPageProps) {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const { toast } = useToast();

  const nft = initialData;
  if (!nft) return <div>NFT not found</div>;

  const handlePurchase = async () => {
    setIsPurchasing(false);
    // Here you would integrate with MetaMask and smart contract
    toast({
      title: "Purchase Initiated",
      description: "Please confirm the transaction in your wallet",
      className: "bg-gray-900 border-[#00f3ff]/30",
    });
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="relative aspect-square rounded-xl overflow-hidden neon-border">
            <img
              src={nft.image}
              alt={nft.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{nft.name}</h1>
              <p className="text-gray-400">{nft.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-900/30 backdrop-blur-sm neon-border">
                <div className="text-sm text-gray-400">Rarity</div>
                <div className="text-lg font-semibold">{nft.rarityPercentage}%</div>
              </div>
              <div className="p-4 rounded-lg bg-gray-900/30 backdrop-blur-sm neon-border">
                <div className="text-sm text-gray-400">Evolution Stage</div>
                <div className="text-lg font-semibold">{nft.evolutionStage}/3</div>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-gray-900/30 backdrop-blur-sm neon-border">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm text-gray-400">Current Price</div>
                  <div className="text-3xl font-bold text-[#00f3ff]">{nft.price} ETH</div>
                </div>
                <Button
                  onClick={() => setIsPurchasing(true)}
                  className="bg-gradient-to-r from-[#00f3ff] to-[#ff00ff] text-white hover:opacity-90"
                >
                  Buy Now
                </Button>
              </div>
              <div className="text-sm text-gray-400">
                Owner: {nft.owner}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center text-lg font-semibold">
                <History className="w-5 h-5 mr-2" />
                Transaction History
              </div>
              <div className="space-y-2">
                {nft.transactionHistory?.map((tx, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-gray-900/30 backdrop-blur-sm neon-border"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm text-gray-400">
                        {new Date(tx.time).toLocaleDateString()}
                      </div>
                      <div className="text-[#00f3ff]">{tx.price} ETH</div>
                    </div>
                    <div className="text-xs text-gray-500">
                      From: {tx.from} → To: {tx.to}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isPurchasing} onOpenChange={setIsPurchasing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Purchase</DialogTitle>
            <DialogDescription>
              You are about to purchase {nft.name} for {nft.price} ETH
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-gray-900/30">
              <div className="flex justify-between mb-2">
                <span>Price</span>
                <span>{nft.price} ETH</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Platform Fee (2.5%)</span>
                <span>{(nft.price * 0.025).toFixed(4)} ETH</span>
              </div>
              <div className="border-t border-gray-700 mt-2 pt-2 flex justify-between font-bold">
                <span>Total</span>
                <span>{(nft.price * 1.025).toFixed(4)} ETH</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPurchasing(false)}>
              Cancel
            </Button>
            <Button
              onClick={handlePurchase}
              className="bg-gradient-to-r from-[#00f3ff] to-[#ff00ff] text-white hover:opacity-90"
            >
              Confirm Purchase
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}