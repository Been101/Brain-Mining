"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { NFTCard } from "@/components/nft-card";
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

export default function EvolutionLabPage() {
  const [draggingNFT, setDraggingNFT] = useState<number | null>(null);
  const [evolutionProgress, setEvolutionProgress] = useState(0);
  const [isEvolving, setIsEvolving] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isEvolving) {
      const interval = setInterval(() => {
        setEvolutionProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsEvolving(false);
            playEvolutionCompleteSound();
            return 100;
          }
          return prev + 1;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isEvolving]);

  const playEvolutionCompleteSound = () => {
    const audio = new Audio("/sounds/evolution-complete.mp3");
    audio.play();

    toast.success("Evolution Complete!");
  };

  const handleDrop = (e: React.DragEvent, targetId: number) => {
    e.preventDefault();
    if (draggingNFT === null || draggingNFT === targetId) return;

    const audio = new Audio("/sounds/fusion.mp3");
    audio.play();
    setIsEvolving(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] cyber-grid pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/rewards"
          className="inline-flex items-center text-[#00f3ff] hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Rewards
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#00f3ff] to-[#ff00ff]">
            NFT Evolution Laboratory
          </h1>
          <p className="text-gray-400">
            Drag and drop two NFTs to fuse them together
          </p>
        </div>

        {isEvolving ? (
          <div className="relative p-8 rounded-lg neon-border bg-gray-900/30 backdrop-blur-sm">
            <div className="mb-4">
              <div className="text-center mb-2">Evolution in Progress</div>
              <Progress value={evolutionProgress} className="h-4" />
            </div>
            <canvas
              ref={canvasRef}
              className="w-full h-64 rounded-lg bg-black/50"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {nfts.map((nft) => (
              <div
                key={nft.id}
                draggable
                onDragStart={() => setDraggingNFT(nft.id)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, nft.id)}
              >
                <NFTCard nft={nft as NFT} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
