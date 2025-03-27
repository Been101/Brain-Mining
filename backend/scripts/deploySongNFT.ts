import { ethers } from "hardhat";

async function main() {
  // 获取部署账户
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // 获取部署账户余额
  const balance = await deployer.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance));

  // 部署合约
  // 这里需要传入一个 signer 地址作为构造函数参数
  const signerAddress = deployer.address; // 这里使用部署者地址作为 signer，您可以根据需要修改

  const SongNFT = await ethers.getContractFactory("SongNFT");
  const songNFT = await SongNFT.deploy(signerAddress);
  await songNFT.waitForDeployment();

  const contractAddress = await songNFT.getAddress();
  console.log("SongNFT deployed to:", contractAddress);
  console.log("Signer address:", signerAddress);
}

// 执行部署脚本
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
