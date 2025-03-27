import { useState } from "react";
import { Button } from "@/components/ui/button";
import { mintNFT } from "@/utils/contracts";

const MintButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleMint = async () => {
    try {
      setIsLoading(true);
      const result = await mintNFT();
      console.log("NFT Minted successfully!", result);
      // 可以添加成功提示
      alert(`NFT Minted! Transaction hash: ${result.hash}`);
    } catch (error) {
      console.error("Failed to mint NFT:", error);
      // 错误提示
      alert(`Failed to mint NFT: ${error.message}`);
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
      {isLoading ? "Minting..." : "Mint NFT"}
    </Button>
  );
};

export default MintButton;
