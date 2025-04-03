import { Inter } from "next/font/google";
import "./globals.css";
import OCIDProvider from "../components/OCIDProvider";
import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import { WalletProvider } from "@/contexts/WalletContext";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: " 🔥  💻",
};

const RootLayout: React.FC<PropsWithChildren> = (props) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider>
          <OCIDProvider>{props.children}</OCIDProvider>
          <ToastContainer />
          <Toaster />
        </WalletProvider>
      </body>
    </html>
  );
};

export default RootLayout;
