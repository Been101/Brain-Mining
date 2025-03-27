import { ethers } from "ethers";
import SongNFTAbi from "./SongNFTAbi.json"; // 需要从编译后的合约中获取 ABI

// 合约地址，需要替换为实际部署后的地址
const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

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
    const contract = new ethers.Contract(CONTRACT_ADDRESS, SongNFTAbi, signer);

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
