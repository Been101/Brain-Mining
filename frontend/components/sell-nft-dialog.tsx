"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { NFT } from "@/lib/types";

interface SellNFTDialogProps {
  nft: NFT | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (price: string) => void;
}

export function SellNFTDialog({
  nft,
  open,
  onOpenChange,
  onConfirm,
}: SellNFTDialogProps) {
  const [price, setPrice] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const platformFee = price ? parseFloat(price) * 0.025 : 0; // 2.5% platform fee

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) { // Allow only numbers and decimal point
      setPrice(value);
    }
  };

  const handleConfirm = async () => {
    if (!price || parseFloat(price) <= 0) return;
    
    setIsValidating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
      onConfirm(price);
    } finally {
      setIsValidating(false);
      setPrice("");
    }
  };

  if (!nft) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900/95 border-[#00f3ff]/30 text-white">
        <DialogHeader>
          <DialogTitle>List NFT for Sale</DialogTitle>
          <DialogDescription className="text-gray-400">
            Set a price for your NFT. Platform fee is 2.5%.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-lg overflow-hidden">
              <img
                src={nft.image}
                alt={nft.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-medium">{nft.name}</h4>
              <p className="text-sm text-gray-400">Level {nft.level}</p>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Price (ETH)</Label>
            <Input
              id="price"
              type="text"
              value={price}
              onChange={handlePriceChange}
              className="bg-gray-800/50 border-gray-700 text-white"
              placeholder="0.00"
            />
          </div>
          {price && (
            <div className="p-4 rounded-lg bg-gray-800/50">
              <div className="flex justify-between mb-2">
                <span>Listing Price</span>
                <span>{price} ETH</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Platform Fee (2.5%)</span>
                <span>{platformFee.toFixed(4)} ETH</span>
              </div>
              <div className="border-t border-gray-700 mt-2 pt-2 flex justify-between font-bold">
                <span>You'll Receive</span>
                <span>{(parseFloat(price) - platformFee).toFixed(4)} ETH</span>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!price || parseFloat(price) <= 0 || isValidating}
            className="bg-gradient-to-r from-[#00f3ff] to-[#ff00ff] text-white hover:opacity-90"
          >
            {isValidating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Confirming
              </>
            ) : (
              "List for Sale"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}