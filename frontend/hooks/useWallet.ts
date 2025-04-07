import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useToast } from "@/components/ui/use-toast";

// Hardhat 网络配置
const HARDHAT_CONFIG = {
  chainId: "0x7A69", // 31337 的十六进制
  chainIdNumber: 31337, // 添加数字形式的 chainId
  chainName: "Hardhat Local",
  nativeCurrency: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: ["http://127.0.0.1:8545"],
};

export const useWallet = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  // 检查是否是正确的网络
  const isHardhatNetwork = async () => {
    console.log("window.ethereum", window.ethereum);
    if (!window.ethereum) return false;
    try {
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      const chainIdNumber = parseInt(chainId, 16);
      return chainIdNumber === HARDHAT_CONFIG.chainIdNumber;
    } catch (error) {
      console.error("Error checking network:", error);
      return false;
    }
  };

  // 切换到 Hardhat 网络
  const switchToHardhatNetwork = async () => {
    if (!window.ethereum) {
      toast.error("Please install MetaMask!");
      return false;
    }

    try {
      // 尝试切换到 Hardhat 网络
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: HARDHAT_CONFIG.chainId }],
      });
      return true;
    } catch (switchError: any) {
      // 如果网络不存在，则添加网络
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [HARDHAT_CONFIG],
          });
          return true;
        } catch (addError: any) {
          toast.error("Failed to add Hardhat network");
          return false;
        }
      }
      toast.error("Failed to switch network");
      return false;
    }
  };

  // 连接钱包
  const connectWallet = async () => {
    if (isConnecting) return;

    if (!window.ethereum) {
      toast.error("Please install MetaMask!");
      return;
    }

    try {
      setIsConnecting(true);

      // 确保在正确的网络上
      const networkSwitched = await switchToHardhatNetwork();
      if (!networkSwitched) return;

      // 请求连接钱包
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);

      setAccount(accounts[0]);
      setProvider(provider);

      toast.success("Wallet connected successfully!");

      return accounts[0];
    } catch (error: any) {
      console.error("Error connecting wallet:", error);
      toast.error(error.message || "Failed to connect wallet");
    } finally {
      setIsConnecting(false);
    }
  };

  // 检查钱包连接状态
  const checkConnection = async () => {
    if (!window.ethereum) return;

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.listAccounts();

      if (accounts.length > 0) {
        // 检查是否在正确的网络上
        const isCorrectNetwork = await isHardhatNetwork();
        if (isCorrectNetwork) {
          setAccount(accounts[0].address);
          setProvider(provider);
        }
      }
    } catch (error) {
      console.error("Error checking wallet connection:", error);
    }
  };

  // 监听账户和网络变化
  useEffect(() => {
    checkConnection();

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          checkConnection();
        } else {
          setAccount(null);
          setProvider(null);
        }
      });

      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", () => {});
        window.ethereum.removeListener("chainChanged", () => {});
      }
    };
  }, []);

  // 断开连接
  const disconnect = () => {
    setAccount(null);
    setProvider(null);
  };

  return {
    account,
    provider,
    isConnecting,
    connectWallet,
    disconnect,
    switchToHardhatNetwork,
    isHardhatNetwork,
  };
};
