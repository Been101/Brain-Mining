import { Inter } from "next/font/google";
import "./globals.css";
import OCIDProvider from "../components/OCIDProvider";
import { PropsWithChildren } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: " 🔥  💻",
};

const RootLayout: React.FC<PropsWithChildren> = (props) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <OCIDProvider>{props.children}</OCIDProvider>
      </body>
    </html>
  );
};

export default RootLayout;
