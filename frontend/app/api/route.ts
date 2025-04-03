import { ethers } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";

// 这个私钥需要和合约部署时设置的 signer 地址对应
const NEXT_PUBLIC_SIGNER_PRIVATE_KEY =
  process.env.NEXT_PUBLIC_SIGNER_PRIVATE_KEY!;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { address, tokenId, progress } = req.body;

    if (!address || tokenId === undefined || progress === undefined) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    // 创建签名者
    const signer = new ethers.Wallet(NEXT_PUBLIC_SIGNER_PRIVATE_KEY);

    // 创建消息哈希
    const messageHash = ethers.solidityPackedKeccak256(
      ["address", "uint256", "uint8"],
      [address, tokenId, progress]
    );

    // 添加以太坊签名前缀
    const prefixedHash = ethers.getBytes(
      ethers.solidityPackedKeccak256(
        ["string", "bytes32"],
        ["\x19Ethereum Signed Message:\n32", messageHash]
      )
    );

    // 生成签名
    const signature = await signer.signMessage(ethers.getBytes(messageHash));

    return res.status(200).json({ signature });
  } catch (error: any) {
    console.error("Error generating signature:", error);
    return res.status(500).json({ message: error.message });
  }
}
