"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
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

interface GiftNFTDialogProps {
  nft: NFT | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (recipientAddress: string) => void;
}

export function GiftNFTDialog({
  nft,
  open,
  onOpenChange,
  onConfirm,
}: GiftNFTDialogProps) {
  const [recipientAddress, setRecipientAddress] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [isAddressValid, setIsAddressValid] = useState(false);

  const validateAddress = (address: string) => {
    // Basic Ethereum address validation
    const isValid = /^0x[a-fA-F0-9]{40}$/.test(address);
    setIsAddressValid(isValid);
    return isValid;
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const address = e.target.value;
    setRecipientAddress(address);
    validateAddress(address);
  };

  const handleConfirm = async () => {
    if (!isAddressValid) return;
    
    setIsValidating(true);
    try {
      // Here you would typically make a call to your smart contract
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
      onConfirm(recipientAddress);
    } finally {
      setIsValidating(false);
      setRecipientAddress("");
      setIsAddressValid(false);
    }
  };

  if (!nft) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900/95 border-[#00f3ff]/30 text-white">
        <DialogHeader>
          <DialogTitle>Gift NFT</DialogTitle>
          <DialogDescription className="text-gray-400">
            Send your NFT as a gift to another wallet address.
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
            <Label htmlFor="address">Recipient Address</Label>
            <div className="relative">
              <Input
                id="address"
                value={recipientAddress}
                onChange={handleAddressChange}
                className="pr-8 bg-gray-800/50 border-gray-700 text-white"
                placeholder="0x..."
              />
              {recipientAddress && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  {isAddressValid ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <span className="text-red-500 text-sm">Invalid</span>
                  )}
                </div>
              )}
            </div>
          </div>
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
            disabled={!isAddressValid || isValidating}
            className="bg-gradient-to-r from-[#00f3ff] to-[#ff00ff] text-white hover:opacity-90"
          >
            {isValidating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Confirming
              </>
            ) : (
              "Confirm Gift"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}