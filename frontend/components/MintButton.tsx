import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ethers } from "ethers";
import { useWallet } from "@/hooks/useWallet";
import SongNFTAbi from "@/contracts/SongNFT.sol/SongNFT.json";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;

type Props = {
  onMintSuccess?: () => void;
};

const MintButton: React.FC<Props> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { account, provider, connectWallet, isHardhatNetwork } = useWallet();

  const handleMint = async () => {
    try {
      setIsLoading(true);

      // 如果未连接钱包，先连接钱包
      if (!account) {
        await connectWallet();
        return;
      }

      // 检查是否在 Hardhat 网络
      const isCorrectNetwork = await isHardhatNetwork();
      if (!isCorrectNetwork) {
        toast.error("Please switch to Hardhat network");
        return;
      }

      if (!provider) {
        throw new Error("Provider not found");
      }

      const signer = await provider.getSigner();
      console.log("signer", signer);
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        SongNFTAbi.abi,
        signer
      );

      const tx = await contract.safeMint();

      const toastId = toast.info("Minting NFT...");

      const receipt = await tx.wait();
      toast.dismiss(toastId);

      toast.success(
        `NFT minted successfully! TX: ${receipt.hash.slice(0, 10)}...`
      );

      props.onMintSuccess?.();
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "Failed to mint NFT");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleMint}
      disabled={isLoading}
      className="bg-teal-400 hover:bg-teal-700 text-black font-bold"
    >
      {isLoading ? "Processing..." : account ? "Mint NFT" : "Connect Wallet"}
    </Button>
  );
};

export default MintButton;
