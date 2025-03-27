"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { UserCircle } from "lucide-react";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { jwtDecode } from "jwt-decode";
import LoginButton from "./LoginButton";

interface DecodedToken {
  user_id: number;
  eth_address: string;
  edu_username: string;
  iss: string;
  iat: number;
  exp: number;
  aud: string;
  [key: string]: any;
}

const Header: React.FC = () => {
  const { authState } = useOCAuth();
  const userInfo = authState.idToken
    ? jwtDecode<DecodedToken>(authState.idToken)
    : null;

  return (
    <header className="w-full fixed top-0 bg-[#0a0a0f] cyber-grid shadow-md z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div>
          <Image
            src="/eduhub.png"
            alt="EduHub Logo"
            width={32}
            height={32}
            className="w-6 h-6 sm:w-8 sm:h-8"
          />
        </div>
        {userInfo ? (
          <div className="flex items-center">
            {userInfo && (
              <div className="flex items-center text-teal-300 mr-4">
                <UserCircle
                  className="w-6 h-6 sm:w-8 sm:h-8 text-teal-600 hover:text-teal-800 transition-colors mr-2"
                  aria-hidden="true"
                />
                {userInfo.edu_username}
              </div>
            )}
          </div>
        ) : (
          <LoginButton />
        )}
      </div>
    </header>
  );
};

export default Header;
