import { ethers } from "ethers";

export async function POST(req: Request) {
  try {
    const { userAddress, tokenId, progress } = await req.json();
    console.log(
      "process.env.NEXT_PUBLIC_PRIVATE_KEY",
      process.env.NEXT_PUBLIC_PRIVATE_KEY
    );
    // 创建钱包实例
    const wallet = new ethers.Wallet(process.env.NEXT_PUBLIC_PRIVATE_KEY!);
    console.log("userAddress", userAddress);
    console.log("tokenId", tokenId);
    console.log("progress", progress);
    // 生成消息哈希
    const messageHash = ethers.solidityPackedKeccak256(
      ["address", "uint256", "uint8"],
      [userAddress, tokenId, progress]
    );
    // 0x3f3d00f83d9dbe85e8b24ddb33d0cdcd88283e03090c349a91c1b3eebed09da7

    const signature = await wallet.signMessage(ethers.getBytes(messageHash));

    return Response.json({ signature });
  } catch (error) {
    console.error("Error generating signature:", error);
    return Response.json(
      { error: "Failed to generate signature" },
      { status: 500 }
    );
  }
}
