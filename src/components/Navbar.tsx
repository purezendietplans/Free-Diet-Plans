"use client";

import { useState } from "react";
import { Search, ShoppingCart, User, ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const shopAllLinks = [
    { name: "All Products", href: "https://shoppurezen.com/collections/all" },
    {
      name: "Best Sellers",
      href: "https://shoppurezen.com/collections/best-sellers",
    },
    {
      name: "New Arrivals",
      href: "https://shoppurezen.com/collections/new-arrivals",
    },
  ];

  const healthBundlesLinks = [
    { name: "Organ Care", href: "https://shoppurezen.com/pages/organ-care" },
    {
      name: "Mental Well-being",
      href: "https://shoppurezen.com/pages/mental-well-being",
    },
    { name: "Beauty", href: "https://shoppurezen.com/pages/beauty" },
    { name: "Diabetes", href: "https://shoppurezen.com/pages/diabetes" },
  ];

  const learnLinks = [
    {
      name: "Know our Ingredients",
      href: "https://shoppurezen.com/pages/ingredients",
    },
    {
      name: "Videos/Podcasts",
      href: "https://shoppurezen.com/pages/videos-podcasts",
    },
    { name: "Press", href: "https://shoppurezen.com/pages/press" },
    { name: "Blog", href: "https://shoppurezen.com/blogs/all-blogs" },
    {
      name: "Explore Our Site",
      href: "https://shoppurezen.com/pages/full-store-map",
    },
  ];

  const referLinks = [
    {
      name: "Zencoins",
      href: "https://shoppurezen.com/#smile-home",
    },
    { name: "Zenfluence", href: "https://shoppurezen.goaffpro.com/" },
  ];

  return (
    <nav className="bg-[#02807f] text-white">
      <div className=" mx-auto px-4 lg:px-12">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div className="flex items-center gap-10">
            <Link href="https://shoppurezen.com/" className="flex items-center">
              <img
                src="https://shoppurezen.com/cdn/shop/files/Purezen_Final_Logo_01_12ca1db0-e411-4573-a8fe-8a6962b17d58.webp"
                alt="Purezen Logo"
                className="h-[30px] w-[130px]"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-9 text-[17.25px] font-medium">
              {/* Shop All Dropdown */}
              <div className="relative group">
                <button
                  onClick={() =>
                    (window.location.href =
                      "https://shoppurezen.com/collections/")
                  }
                  className="flex hover:cursor-pointer items-center gap-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                >
                  Shop All
                  {/* <ChevronDown className="w-3 h-3" /> */}
                </button>

                {/* Drop Down  */}
                {/* <div className="absolute left-0 top-full mt-2 w-48 text-[#0b4c49] rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="py-2">
                    {shopAllLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        className="block px-4 py-3 hover:text-white transition-colors relative"
                      >
                        <span
                          className="relative 
                          font-medium
      after:content-[''] 
      after:absolute 
      after:bottom-0 
      after:left-0 
      after:w-0 
      after:h-0.5 
      after:bg-white 
      after:transition-all 
      after:duration-300 
      hover:after:w-full"
                        >
                          {link.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </div> */}
              </div>

              {/* Health Bundles Dropdown */}
              <div className="relative group">
                <button
                  style={{ fontFamily: "Open Sans" }}
                  className="flex items-center gap-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                >
                  Health Bundles
                  <ChevronDown className="w-3 h-3" />
                </button>

                <div className="absolute left-0 top-full mt-2 w-48 text-white bg-[#02807f] shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="py-2">
                    {healthBundlesLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        className="block px-4 py-1 hover:text-white transition-colors relative"
                      >
                        <span
                          className="relative 
                          font-medium
      after:content-[''] 
      after:absolute 
      after:bottom-0 
      after:left-0 
      after:w-0 
      after:h-0.5 
      after:bg-white 
      after:transition-all 
      after:duration-300 
      hover:after:w-full"
                        >
                          {link.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Learn Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full">
                  Learn
                  <ChevronDown className="w-3 h-3" />
                </button>
                <div className="absolute left-0 top-full mt-2 w-50 text-white bg-[#02807f] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="py-2">
                    {learnLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        className="block px-4 py-1 hover:text-white transition-colors relative "
                      >
                        <span
                          className="relative 
                          font-medium
      after:content-[''] 
      after:absolute 
      after:bottom-0 
      after:left-0 
      after:w-0 
      after:h-0.5 
      after:bg-white 
      after:transition-all 
      after:duration-300 
      hover:after:w-full"
                        >
                          {link.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() =>
                  (window.location.href =
                    "https://shoppurezen.com/pages/about-us")
                }
                className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                Our Story
              </button>

              {/* Refer and Earn Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full">
                  Refer and Earn
                  <ChevronDown className="w-3 h-3" />
                </button>
                <div className="absolute left-0 top-full mt-2 w-48 text-white bg-[#02807f] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="py-2">
                    {referLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        className="block px-4 py-1 hover:text-white transition-colors relative"
                      >
                        <span
                          className="relative 
      after:content-[''] 
      after:absolute 
      after:bottom-0 
      after:left-0 
      after:w-0 
      after:h-0.5 
      after:bg-white 
      after:transition-all 
      after:duration-300 
      hover:after:w-full"
                        >
                          {link.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-2">
            <button className="text-white">
              <Link href="/admin/login">
                {/* <User className="w-6 h-6" /> */}

                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  id="svgkp"
                >
                  <path
                    d="M22.9129 12.935L13.7571 23.0474C13.5348 23.2929 13.1284 23.1084 13.1669 22.7794L14.0816 14.9731H10.6991C10.4034 14.9731 10.2484 14.6219 10.4478 14.4035L20.3133 3.59739C20.5589 3.32834 20.9984 3.58134 20.8891 3.92887L18.2354 12.3664H22.6607C22.9557 12.3664 23.1109 12.7163 22.9129 12.935Z"
                    fill="#FEA203"
                  ></path>
                  <path
                    id="svgkp-path"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16.6079 5.35819C16.4805 5.1933 16.3421 5.03582 16.1932 4.8869C15.2702 3.96387 14.0183 3.44531 12.7129 3.44531C11.4075 3.44531 10.1556 3.96387 9.2326 4.8869C8.30957 5.80993 7.79102 7.06183 7.79102 8.36719C7.79102 9.67255 8.30957 10.9244 9.2326 11.8475C9.48368 12.0986 9.75909 12.3197 10.0533 12.5086L11.0235 11.4503C10.7335 11.2914 10.4649 11.0911 10.227 10.8531C9.56766 10.1938 9.19727 9.29959 9.19727 8.36719C9.19727 7.43479 9.56766 6.54057 10.227 5.88127C10.8863 5.22196 11.7805 4.85156 12.7129 4.85156C13.6453 4.85156 14.5395 5.22196 15.1988 5.88127C15.3636 6.04604 15.5103 6.22549 15.6377 6.41654L16.6079 5.35819ZM20.6413 18.6497L19.6746 19.7132C20.1676 20.4122 20.4473 21.2264 20.4473 22.0781V23.8359C20.4473 24.2243 20.7621 24.5391 21.1504 24.5391C21.5387 24.5391 21.8535 24.2243 21.8535 23.8359V22.0781C21.8535 20.7863 21.4016 19.6103 20.6413 18.6497ZM12.3111 17.5078H10.3026C7.27113 17.5078 4.97852 19.6394 4.97852 22.0781V23.8359C4.97852 24.2243 4.66372 24.5391 4.27539 24.5391C3.88707 24.5391 3.57227 24.2243 3.57227 23.8359V22.0781C3.57227 18.6922 6.67684 16.1016 10.3026 16.1016H12.4885L12.3111 17.5078Z"
                    fill="currentColor"
                    stroke="currentColor"
                  ></path>
                </svg>
              </Link>
            </button>

            <Button variant="ghost" size="icon" className="text-white">
              <Link href="https://shoppurezen.com/search">
                <Search className="w-20 h-20" />
              </Link>
            </Button>

            <Button variant="ghost" size="icon" className=" relative">
              <a href="https://shoppurezen.com/cart">
                {/* <ShoppingCart className="w-6 h-6" /> */}

                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.6 2.20033L3.3 3.93366C3.04251 4.27697 2.91377 4.44863 2.91676 4.59232C2.91936 4.71736 2.97799 4.83462 3.07646 4.91172C3.18962 5.00032 3.40419 5.00032 3.83333 5.00032H16.1667C16.5958 5.00032 16.8104 5.00032 16.9235 4.91172C17.022 4.83462 17.0806 4.71736 17.0832 4.59232C17.0862 4.44863 16.9575 4.27697 16.7 3.93366L15.4 2.20033M4.6 2.20033C4.74667 2.00477 4.82 1.90699 4.91294 1.83647C4.99525 1.77401 5.08846 1.72741 5.18782 1.69903C5.3 1.66699 5.42222 1.66699 5.66667 1.66699H14.3333C14.5778 1.66699 14.7 1.66699 14.8122 1.69903C14.9115 1.72741 15.0047 1.77401 15.0871 1.83647C15.18 1.90699 15.2533 2.00477 15.4 2.20033M4.6 2.20033L3.03333 4.28921C2.83545 4.55306 2.73651 4.68498 2.66625 4.83026C2.6039 4.95917 2.55843 5.09559 2.53096 5.23612C2.5 5.3945 2.5 5.55941 2.5 5.88921L2.5 15.667C2.5 16.6004 2.5 17.0671 2.68166 17.4236C2.84144 17.7372 3.09641 17.9922 3.41002 18.152C3.76654 18.3337 4.23325 18.3337 5.16667 18.3337L14.8333 18.3337C15.7668 18.3337 16.2335 18.3337 16.59 18.152C16.9036 17.9922 17.1586 17.7372 17.3183 17.4236C17.5 17.0671 17.5 16.6004 17.5 15.667V5.88921C17.5 5.55941 17.5 5.3945 17.469 5.23613C17.4416 5.09559 17.3961 4.95918 17.3338 4.83026C17.2635 4.68498 17.1646 4.55306 16.9667 4.28921L15.4 2.20033M13.3333 8.33366C13.3333 9.21771 12.9821 10.0656 12.357 10.6907C11.7319 11.3158 10.8841 11.667 10 11.667C9.11594 11.667 8.2681 11.3158 7.64298 10.6907C7.01786 10.0656 6.66667 9.21771 6.66667 8.33366"
                    stroke="currentColor"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    fill="none"
                  ></path>
                </svg>

                <span className="absolute -top-1 -right-1   text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  0
                </span>
              </a>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-white/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-y-0 right-0 w-64 bg-[#02807f] shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-4 border-b border-white/20">
                <span className="font-semibold">Menu</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
              <div className="flex flex-col space-y-4 p-4">
                <a
                  href="https://shoppurezen.com/collections/"
                  className="hover:opacity-80"
                >
                  Shop All
                </a>
                <a
                  href="https://shoppurezen.com/collections/bundles"
                  className="hover:opacity-80"
                >
                  Health Bundles
                </a>
                <a
                  href="https://shoppurezen.com/pages/learn"
                  className="hover:opacity-80"
                >
                  Learn
                </a>
                <a
                  href="https://shoppurezen.com/pages/about-us"
                  className="hover:opacity-80"
                >
                  Our Story
                </a>
                <a href="https://shoppurezen.com" className="hover:opacity-80">
                  Refer and Earn
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </div>
    </nav>
  );
}
