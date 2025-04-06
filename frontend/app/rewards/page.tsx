"use client";

import { useState } from "react";
import { Gift, Zap, CreditCard, Send } from "lucide-react";
import Link from "next/link";
import { toast, useToast } from "@/components/ui/use-toast";
import { NFTCard } from "@/components/nft-card";
import { GiftNFTDialog } from "@/components/gift-nft-dialog";
import { SendNFTDialog } from "@/components/send-nft-dialog";
import { SellNFTDialog } from "@/components/sell-nft-dialog";
import { cn } from "@/lib/utils";
import { NFT } from "@/lib/types";

const nfts = [
  {
    id: 1,
    name: "Cyber Fox",
    rarity: "common",
    level: 1,
    image:
      "https://api.dicebear.com/7.x/adventurer/svg?seed=cyber-fox&backgroundColor=00f3ff",
    price: 0.1,
  },
  {
    id: 2,
    name: "Digital Dragon",
    rarity: "rare",
    level: 2,
    image:
      "https://api.dicebear.com/7.x/adventurer/svg?seed=digital-dragon&backgroundColor=9d00ff",
    price: 0.3,
  },
  {
    id: 3,
    name: "Golden Guardian",
    rarity: "epic",
    level: 3,
    image:
      "https://api.dicebear.com/7.x/adventurer/svg?seed=golden-guardian&backgroundColor=ff00ff",
    price: 0.5,
  },
];

export default function RewardsPage() {
  const [selectedNFT, setSelectedNFT] = useState<number | null>(null);
  const [isGiftDialogOpen, setIsGiftDialogOpen] = useState(false);
  const [isSendDialogOpen, setIsSendDialogOpen] = useState(false);
  const [isSellDialogOpen, setIsSellDialogOpen] = useState(false);
  const { toast } = useToast();

  const selectedNFTData =
    selectedNFT !== null ? nfts.find((nft) => nft.id === selectedNFT) : null;

  const handleGift = async (recipientAddress: string) => {
    toast.success(
      `Sending NFT to ${recipientAddress.slice(
        0,
        6
      )}...${recipientAddress.slice(-4)}`
    );

    setTimeout(() => {
      toast.success("Gift Sent Successfully!");
      setIsGiftDialogOpen(false);
    }, 2000);
  };

  const handleSend = async (recipientAddress: string) => {
    toast.success(
      `Sending NFT to ${recipientAddress.slice(
        0,
        6
      )}...${recipientAddress.slice(-4)}`
    );

    setTimeout(() => {
      toast.success("Transfer Successful!");
      setIsSendDialogOpen(false);
    }, 2000);
  };

  const handleSell = async (price: string) => {
    toast.success(`Creating marketplace listing for ${price} ETH`);

    setTimeout(() => {
      toast.success("NFT Listed Successfully!");
      setIsSellDialogOpen(false);
    }, 2000);
  };

  const handleAction = (action: string) => {
    const audio = new Audio("/sounds/click.mp3");
    audio.play();

    switch (action) {
      case "Send":
        setIsSendDialogOpen(true);
        break;
      case "Sell":
        setIsSellDialogOpen(true);
        break;
      case "Gift":
        setIsGiftDialogOpen(true);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] cyber-grid pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#00f3ff] to-[#ff00ff]">
            Your NFT Collection
          </h1>
          <p className="text-gray-400">Manage and evolve your digital assets</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {nfts.map((nft) => (
            <NFTCard
              key={nft.id}
              nft={nft as NFT}
              selected={selectedNFT === nft.id}
              onSelect={() => setSelectedNFT(nft.id)}
            />
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => handleAction("Send")}
            className="p-4 rounded-lg neon-border bg-gray-900/30 backdrop-blur-sm hover:bg-gray-900/50 transition-all duration-300"
            disabled={selectedNFT === null}
          >
            <Send className="w-6 h-6 text-[#00f3ff] mb-2 mx-auto" />
            <span className="block text-sm">Send NFT</span>
          </button>
          <button
            onClick={() => handleAction("Sell")}
            className="p-4 rounded-lg neon-border bg-gray-900/30 backdrop-blur-sm hover:bg-gray-900/50 transition-all duration-300"
            disabled={selectedNFT === null}
          >
            <CreditCard className="w-6 h-6 text-[#00f3ff] mb-2 mx-auto" />
            <span className="block text-sm">Sell NFT</span>
          </button>
          <Link
            href="/rewards/lab"
            className="p-4 rounded-lg neon-border bg-gray-900/30 backdrop-blur-sm hover:bg-gray-900/50 transition-all duration-300"
          >
            <Zap className="w-6 h-6 text-[#00f3ff] mb-2 mx-auto" />
            <span className="block text-sm">Evolution Lab</span>
          </Link>
          <button
            onClick={() => handleAction("Gift")}
            className="p-4 rounded-lg neon-border bg-gray-900/30 backdrop-blur-sm hover:bg-gray-900/50 transition-all duration-300"
            disabled={selectedNFT === null}
          >
            <Gift className="w-6 h-6 text-[#00f3ff] mb-2 mx-auto" />
            <span className="block text-sm">Gift NFT</span>
          </button>
        </div>
      </div>

      <SendNFTDialog
        nft={selectedNFTData as NFT | null}
        open={isSendDialogOpen}
        onOpenChange={setIsSendDialogOpen}
        onConfirm={handleSend}
      />

      <SellNFTDialog
        nft={selectedNFTData as NFT | null}
        open={isSellDialogOpen}
        onOpenChange={setIsSellDialogOpen}
        onConfirm={handleSell}
      />

      <GiftNFTDialog
        nft={selectedNFTData as NFT | null}
        open={isGiftDialogOpen}
        onOpenChange={setIsGiftDialogOpen}
        onConfirm={handleGift}
      />
    </div>
  );
}
