import { ethers } from "ethers";
import SongNFTAbi from "@/contracts/SongNFT.sol/SongNFT.json";

// 合约地址，需要替换为实际部署后的地址
const CONTRACT_ADDRESS = "0x86A2EE8FAf9A840F7a2c64CA3d51209F9A02081D";

export const mintNFT = async () => {
  try {
    // 检查是否安装了 MetaMask
    if (!window.ethereum) {
      throw new Error("Please install MetaMask!");
    }

    // 请求用户连接钱包
    await window.ethereum.request({ method: "eth_requestAccounts" });

    // 创建 provider 和 signer
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // 创建合约实例
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      SongNFTAbi as any,
      signer
    );

    // 调用合约的 safeMint 方法
    const tx = await contract.safeMint();

    // 等待交易确认
    const receipt = await tx.wait();

    // 返回交易结果
    return {
      success: true,
      hash: receipt.hash,
      tokenId: receipt.events[0].args[2], // 获取 mint 的 tokenId
    };
  } catch (error) {
    console.error("Error minting NFT:", error);
    throw error;
  }
};
