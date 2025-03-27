"use client";

import { GraduationCap, BookOpen, Award, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-[#00f3ff]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8">
              <GraduationCap className="w-8 h-8 text-[#00f3ff] animate-pulse" />
              <div className="absolute inset-0 bg-[#00f3ff] blur-md opacity-20 animate-pulse"></div>
            </div>
            <span className="text-xl font-bold text-white">DApp Learn</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/learn" active={isActive("/learn")}>
              <BookOpen className="w-5 h-5 mr-2" />
              Learn
            </NavLink>
            <NavLink href="/rewards" active={isActive("/rewards")}>
              <Award className="w-5 h-5 mr-2" />
              Rewards
            </NavLink>
            <NavLink href="/marketplace" active={isActive("/marketplace")}>
              <ShoppingCart className="w-5 h-5 mr-2" />
              Marketplace
            </NavLink>
          </div>

          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 rounded-md neon-border text-[#00f3ff] hover:text-white bg-[#0a0a0f]/80 backdrop-blur-sm transition-all duration-300 hover:scale-105">
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        active
          ? "text-[#00f3ff] bg-[#00f3ff]/10 neon-border"
          : "text-gray-300 hover:text-[#00f3ff] hover:bg-[#00f3ff]/5"
      }`}
    >
      {children}
    </Link>
  );
}