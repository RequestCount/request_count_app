import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useConnectWallet } from "@web3-onboard/react";
import { LayoutDashboard, Wallet, Menu, X } from 'lucide-react';
import { truncateAddress } from "@/utils/walletUtils";
import { Button } from "../common";

const Sidebar = () => {
  const router = useRouter();
  const [{ wallet }, connect] = useConnectWallet();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const links = [
    {
      name: "My Dashboard",
      href: "/",
      icon: <LayoutDashboard className="w-6 h-6" />,
    },
    {
      name: "List of Invoices",
      href: "/invoice",
      icon: <LayoutDashboard className="w-6 h-6" />,
    },
    {
      name: "Create an Invoice",
      href: "/create-invoice",
      icon: <LayoutDashboard className="w-6 h-6" />,
    },
  ];

  return (
    <div className={`fixed top-0 left-0 h-screen bg-[#103861] text-white transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-20'} overflow-hidden z-50 shadow-lg flex flex-col justify-between font-sans`}>
      <div className="flex flex-col items-center mt-6 relative">
     {isOpen ? (  <><a
          target="_blank"
          rel="noreferrer noopener"
          href="https://request.network/"
          className="mb-[30px] flex items-center justify-center"
        >
          <img
            src="assets/logo.svg"
            alt="Request Network Logo"
            className={`transition-opacity duration-300 ${isOpen ? 'w-[100px] xl:w-[140px] hover:opacity-80' : 'w-16 xl:w-[40px]'}`}
          />
        </a>

        <button
          className={`absolute top-4 right-2 text-white focus:outline-none ${isOpen ? 'right-10' : 'top-20'}`}
          onClick={toggleSidebar}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 absolute right-7 top-10" />}
        </button>
        </> ):
        (  

          <>
        <button
          className={`absolute top-0.5 right-2 text-white focus:outline-none ${isOpen ? 'right-10' : 'top-20'}`}
          onClick={toggleSidebar}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 absolute right-7 " />}
        </button>
       <a
       target="_blank"
       rel="noreferrer noopener"
       href="https://request.network/"
       className="mb-[30px] flex items-center justify-center"
     >
       <img
         src="assets/logo.svg"
         alt="Request Network Logo"
         className={`transition-opacity duration-300 absolute top-16 ${isOpen ? 'w-[100px] xl:w-[140px] hover:opacity-80' : 'w-16 xl:w-[40px]'}`}
       />
     </a>
     </>
      
      
      )}


        <ul className="flex flex-col items-start mt-16 w-full gap-4"> {/* Added gap-4 for more spacing */}
          {links.map((link, index) => (
            <li
              className={`relative w-full ${router.pathname === link.href ? 'bg-blue-700' : 'hover:bg-blue-800'} transition-colors duration-300`}
              key={index}
            >
              <Link href={link.href} className="flex items-center gap-[10px] p-[15px] w-full"> {/* Adjusted padding to p-[15px] */}
                {link.icon}
                <span className={`${isOpen ? 'inline' : 'hidden'} transition-all duration-300 text-sm font-medium`}>{link.name}</span>
              </Link>
              <div
                className={`${
                  router.pathname === link.href &&
                  "h-[4px] bg-green w-full absolute bottom-0"
                }`}
              ></div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col items-center gap-[15px] lg:gap-[35px] mb-6 w-full">
        {isOpen ? (
          <Button
            className="px-[14px] lg:px-[20px] text-sm lg:text-base py-[8px] bg-white text-purple-600 rounded hover:bg-gray-200 transition-all duration-300 w-3/4"
            text={
              wallet
                ? truncateAddress(wallet.accounts[0].address)
                : "Connect Wallet"
            }
            onClick={() => {
              connect();
            }}
          />
        ) : (
          <button
            className="flex items-center justify-center w-12 h-12 bg-black text-purple-600 rounded-full hover:bg-gray-200 transition-all duration-300"
            onClick={() => {
              connect();
            }}
          >
            <Wallet className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
