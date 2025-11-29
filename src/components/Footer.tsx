// "use client";

// import { Facebook, Instagram, Youtube, ArrowUp } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// export default function Footer() {
//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//   //   <footer className="bg-[#02807f] text-white">
//   //     <div className="mx-auto px-12 mt-12">
//   //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
//   //         {/* Quick Links */}
//   //         <div>
//   //           <p className="text-[16px] mb-4 font-semibold" style={{ letterSpacing: "0.1em" }} >QUICK LINKS</p>
//   //           <ul className="space-y-2">
//   //             <li>
//   //               <a href="#" className="hover:text-[rgb(223,228,96)]">
//   //                 Shop All
//   //               </a>
//   //             </li>
//   //             <li>
//   //               <a href="#" className="hover:text-[rgb(223,228,96)]">
//   //                 Track Your Order
//   //               </a>
//   //             </li>
//   //             <li>
//   //               <a href="#" className="hover:text-[rgb(223,228,96)]">
//   //                 Refer and Earn
//   //               </a>
//   //             </li>
//   //             <li>
//   //               <a href="#" className="hover:text-[rgb(223,228,96)]">
//   //                 Blog
//   //               </a>
//   //             </li>
//   //             <li>
//   //               <a href="#" className="hover:text-[rgb(223,228,96)]">
//   //                 FSSAI Grievance Connect
//   //               </a>
//   //             </li>
//   //           </ul>
//   //         </div>

//   //         {/* About */}
//   //         <div>
//   //           <p className="text-[#14px] mb-4 font-semibold" style={{ letterSpacing: "0.1em" }} >ABOUT</p>
//   //           <ul className="space-y-2">
//   //             <li>
//   //               <a href="#" className="hover:text-[rgb(223,228,96)]">
//   //                 Know our Ingredients
//   //               </a>
//   //             </li>
//   //             <li>
//   //               <a href="#" className="hover:text-[rgb(223,228,96)]">
//   //                 Our Story
//   //               </a>
//   //             </li>
//   //             <li>
//   //               <a href="#" className="hover:text-[rgb(223,228,96)]">
//   //                 Contact Us
//   //               </a>
//   //             </li>
//   //             <li>
//   //               <a href="#" className="hover:text-[rgb(223,228,96)]">
//   //                 Licences and Certificates
//   //               </a>
//   //             </li>
//   //           </ul>
//   //         </div>

//   //         {/* Policies */}
//   //         <div>
//   //           <h3 className="text-[14px] mb-4 font-semibold" style={{ letterSpacing: "0.1em" }} >POLICIES</h3>
//   //           <ul className="space-y-2">
//   //             <li>
//   //               <a href="#" className="hover:text-[rgb(223,228,96)]">
//   //                 Privacy Policy
//   //               </a>
//   //             </li>
//   //             <li>
//   //               <a href="#" className="hover:text-[rgb(223,228,96)]">
//   //                 Return and Refund Policy
//   //               </a>
//   //             </li>
//   //             <li>
//   //               <a href="#" className="hover:text-[rgb(223,228,96)]">
//   //                 Shipping Policy
//   //               </a>
//   //             </li>
//   //             <li>
//   //               <a href="#" className="hover:text-[rgb(223,228,96)]">
//   //                 Terms of Service
//   //               </a>
//   //             </li>
//   //           </ul>
//   //         </div>

//   //         {/* Newsletter */}
//   //         {/* <div>
//   //           <h3 className="text-lg font-semibold mb-4">
//   //             Get the latest Health News and Offers in your inbox
//   //           </h3>
//   //           <div className="flex gap-2">
//   //             <input
//   //               type="email"
//   //               placeholder="Email"
//   //               // className="bg-transparent border-white text-white placeholder:text-white/70"
//   //               className="border px-3 py-3 border-amber-300 bg-transparent  hover:cursor-pointer relative w-full"
//   //             />
//   //               <button className="border px-3 py-3 border-amber-300 bg-transparent  hover:cursor-pointer">
//   //                 →
//   //               </button>

//   //           </div>
//   //         </div> */}

//   //       </div>

//   //       <div className="font-semibold grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 ">
//   //         <div>
//   //           <p className="text-m mb-4 font-semibold ">
//   //             Join our Purezen community
//   //           </p>
//   //           <div className="flex gap-2">
//   //             <button className="border px-3 py-3 border-amber-300 bg-transparent  hover:cursor-pointer">
//   //               <Facebook className="w-5 h-5" />
//   //             </button>
//   //             <button className="border px-3 py-3 border-amber-300 bg-transparent  hover:cursor-pointer">
//   //               <Instagram className="w-5 h-5" />
//   //             </button>
//   //             <button className="border px-3 py-3 border-amber-300 bg-transparent  hover:cursor-pointer">
//   //               <Youtube className="w-5 h-5" />
//   //             </button>
//   //           </div>
//   //         </div>

//   //         {/* <div className="my-8 md:my-0">
//   //           <p className="text-m mb-4">CIN: U21000MH2024PTC428351</p>

//   //           <div className="flex items-center gap-4">
//   //             <div className="w-20 h-20 rounded-full flex items-center justify-center shrink-0">
//   //               <img
//   //                 src="https://cdn.shopify.com/s/files/1/0886/6532/5865/files/certification-icon-3_ca816917-03ee-42d0-91c8-96509589754d.webp"
//   //                 alt="GMP"
//   //                 className="w-full h-full object-contain"
//   //               />
//   //             </div>
//   //             <div className="w-20 h-20 rounded-full flex items-center justify-center shrink-0">
//   //               <img
//   //                 src="https://cdn.shopify.com/s/files/1/0886/6532/5865/files/certification-icon-4_8d33874d-5a9b-4583-83cd-4cbedb150816.webp"
//   //                 alt="HACCP"
//   //                 className="w-full h-full object-contain"
//   //               />
//   //             </div>
//   //             <div className="w-20 h-20 rounded-full flex items-center justify-center shrink-0">
//   //               <img
//   //                 src="https://cdn.shopify.com/s/files/1/0886/6532/5865/files/certification-icon-1_53164c85-8e95-4eda-ba3d-2b4d79704d71.webp"
//   //                 alt="ISO"
//   //                 className="w-full h-full object-contain"
//   //               />
//   //             </div>
//   //             <div className="w-20 h-20 rounded-full flex items-center justify-center shrink-0">
//   //               <img
//   //                 src="https://cdn.shopify.com/s/files/1/0886/6532/5865/files/certification-icon-2_1fb8b786-2f8d-453f-a78e-c101576dba2d.webp"
//   //                 alt="USDA"
//   //                 className="w-full h-full object-contain"
//   //               />
//   //             </div>
//   //             <div className="w-20 h-20 rounded-full flex items-center justify-center shrink-0">
//   //               <img
//   //                 src="https://cdn.shopify.com/s/files/1/0886/6532/5865/files/certification-icon-5_3c83c29e-b704-4e20-a966-16c405521820.webp"
//   //                 alt="FSSAI"
//   //                 className="w-full h-full object-contain"
//   //               />
//   //             </div>
//   //           </div>
//   //         </div> */}

//   //  {/* Certifications */}
//   //         <div>
//   //           <p className="text-xs md:text-sm mb-3 md:mb-4">CIN: U21000MH2024PTC428351</p>

//   //           <div className="flex items-center gap-2 md:gap-4  pb-2">
//   //             <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center shrink-0">
//   //               <img
//   //                 src="https://cdn.shopify.com/s/files/1/0886/6532/5865/files/certification-icon-3_ca816917-03ee-42d0-91c8-96509589754d.webp"
//   //                 alt="GMP"
//   //                 className="w-full h-full object-contain"
//   //               />
//   //             </div>
//   //             <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center shrink-0">
//   //               <img
//   //                 src="https://cdn.shopify.com/s/files/1/0886/6532/5865/files/certification-icon-4_8d33874d-5a9b-4583-83cd-4cbedb150816.webp"
//   //                 alt="HACCP"
//   //                 className="w-full h-full object-contain"
//   //               />
//   //             </div>
//   //             <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center shrink-0">
//   //               <img
//   //                 src="https://cdn.shopify.com/s/files/1/0886/6532/5865/files/certification-icon-1_53164c85-8e95-4eda-ba3d-2b4d79704d71.webp"
//   //                 alt="ISO"
//   //                 className="w-full h-full object-contain"
//   //               />
//   //             </div>
//   //             <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center shrink-0">
//   //               <img
//   //                 src="https://cdn.shopify.com/s/files/1/0886/6532/5865/files/certification-icon-2_1fb8b786-2f8d-453f-a78e-c101576dba2d.webp"
//   //                 alt="USDA"
//   //                 className="w-full h-full object-contain"
//   //               />
//   //             </div>
//   //             <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center shrink-0">
//   //               <img
//   //                 src="https://cdn.shopify.com/s/files/1/0886/6532/5865/files/certification-icon-5_3c83c29e-b704-4e20-a966-16c405521820.webp"
//   //                 alt="FSSAI"
//   //                 className="w-full h-full object-contain"
//   //               />
//   //             </div>
//   //           </div>
//   //         </div>

//   //       </div>
//   //     </div>

//   //     {/* Copyright */}
//   //     <div className=" py-4 relative border-t h-16">
//   //       <div className=" mx-auto px-8 text-center">
//   //         <p className="text-sm opacity-50 mt-2 ">Copyright © 2025 Purezen</p>
//   //       </div>
//   //       <Button
//   //         size="icon"
//   //         onClick={scrollToTop}
//   //         className="absolute right-8 top-1/2 -translate-y-1/2 rounded-full bg-white text-teal-600 hover:bg-white/90"
//   //       >
//   //         <ArrowUp className="w-5 h-5" />
//   //       </Button>
//   //     </div>
//   //   </footer>

// );
// }

"use client";

import { Facebook, Instagram, Youtube, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaYoutube, FaFacebook, FaInstagram } from "react-icons/fa6";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className=" bg-[#02807f] text-white">
      <div className="mx-auto px-12 pt-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Quick Links */}
          <div>
            <h3
              className="text-[14px] font-semibold mb-4 tracking-wider"
              style={{ fontFamily: "Open Sans" }}
            >
              QUICK LINKS
            </h3>
            <ul className="space-y-2 ">
              <li>
                <a
                  href="https://shoppurezen.com/collections"
                  className="text-[15px] transition-colors hover:text-[rgb(223,228,96)]"
                >
                  Shop All
                </a>
              </li>
              <li>
                <a
                  href="https://shoppurezen.com/apps/trackingmore"
                  className="text-sm hover:text-[rgb(223,228,96)] transition-colors"
                >
                  Track Your Order
                </a>
              </li>
              <li>
                <a
                  href="https://shoppurezen.com/apps/trackingmore"
                  className="text-sm hover:text-[rgb(223,228,96)] transition-colors"
                >
                  Refer and Earn
                </a>
              </li>
              <li>
                <a
                  href="https://shoppurezen.com/blogs/all-blogs"
                  className="text-sm hover:text-[rgb(223,228,96)] transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="https://foscos.fssai.gov.in/consumergrievance"
                  className="text-sm hover:text-[rgb(223,228,96)] transition-colors"
                >
                  FSSAI Grievance Connect
                </a>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3
              style={{ fontFamily: "Open Sans" }}
              className="text-sm font-semibold mb-4 tracking-wider"
            >
              ABOUT
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://shoppurezen.com/pages/ingredients"
                  className="text-sm hover:text-[rgb(223,228,96)] transition-colors"
                >
                  Know our Ingredients
                </a>
              </li>
              <li>
                <a
                  href="https://shoppurezen.com/pages/about-us"
                  className="text-sm hover:text-[rgb(223,228,96)] transition-colors"
                >
                  Our Story
                </a>
              </li>
              <li>
                <a
                  href="https://shoppurezen.com/pages/contact"
                  className="text-sm hover:text-[rgb(223,228,96)] transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="https://shoppurezen.com/pages/licences-and-certificates"
                  className="text-sm hover:text-[rgb(223,228,96)] transition-colors"
                >
                  Licences and Certificates
                </a>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3
              className="text-sm font-semibold mb-4 tracking-wider"
              style={{ fontFamily: "Open Sans" }}
            >
              POLICIES
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://shoppurezen.com/policies/privacy-policy"
                  className="text-sm hover:text-[rgb(223,228,96)] transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="https://shoppurezen.com/policies/refund-policy"
                  className="text-sm hover:text-[rgb(223,228,96)] transition-colors"
                >
                  Return and Refund Policy
                </a>
              </li>
              <li>
                <a
                  href="https://shoppurezen.com/policies/shipping-policy"
                  className="text-sm hover:text-[rgb(223,228,96)] transition-colors"
                >
                  Shipping Policy
                </a>
              </li>
              <li>
                <a
                  href="https://shoppurezen.com/policies/terms-of-service"
                  className="text-sm hover:text-[rgb(223,228,96)] transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            {/* <h3 className="text-sm font-semibold mb-4">
              Get the latest Health News and Offers in your inbox
            </h3>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Email"
                className="bg-transparent border-white/30 text-white placeholder:text-white/70 focus:border-white"
              />
              <Button
                variant="outline"
                className="border-white/30 bg-transparent text-white hover:bg-white/10 px-4"
              >
                →
              </Button>
            </div> */}
          </div>

          {/* Social Media */}
          <div>
            <p
              className="text-sm font-semibold mb-5"
              style={{ fontFamily: "Open Sans" }}
            >
              Join our Purezen community
            </p>
            <div className="flex gap-1">
              <button
                className="border hover:cursor-pointer border-[rgb(223,228,96)] p-4 transition-colors"
                onClick={() =>
                  window.open(
                    "https://www.facebook.com/profile.php?id=61565121778743",
                    "_blank"
                  )
                }
              >
                <FaFacebook className="w-4 h-4" />
              </button>
              <button
                className="border hover:cursor-pointer border-[rgb(223,228,96)] p-4  transition-colors"
                onClick={() =>
                  window.open(
                    "https://www.instagram.com/purezen.essentials/",
                    "_blank"
                  )
                }
              >
                <FaInstagram className="w-4 h-4" />
              </button>
              <button
                className="border hover:cursor-pointer border-[rgb(223,228,96)] p-4  transition-colors"
                onClick={() =>
                  window.open(
                    "http://www.youtube.com/@purezenessentials",
                    "_blank"
                  )
                }
              >
                <FaYoutube className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <p
              className="text-xs md:text-sm mb-4 font-semibold"
              style={{ fontFamily: "Open Sans" }}
            >
              CIN: U21000MH2024PTC428351
            </p>
            <div className="flex items-center">
              {/* <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 flex items-center justify-center"> */}
              <img
                src="https://cdn.shopify.com/s/files/1/0886/6532/5865/files/certification-icon-3_ca816917-03ee-42d0-91c8-96509589754d.webp"
                alt="GMP"
                className="w-full h-full object-contain pr-1"
              />
              {/* </div> */}
              {/* <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 flex items-center justify-center"> */}
              <img
                src="https://cdn.shopify.com/s/files/1/0886/6532/5865/files/certification-icon-4_8d33874d-5a9b-4583-83cd-4cbedb150816.webp"
                alt="HACCP"
                className="w-full h-full object-contain p-1 "
              />
              {/* </div> */}
              {/* <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 flex items-center justify-center"> */}
              <img
                src="https://cdn.shopify.com/s/files/1/0886/6532/5865/files/certification-icon-1_53164c85-8e95-4eda-ba3d-2b4d79704d71.webp"
                alt="ISO"
                className="w-full h-full object-contain p-1 "
              />
              {/* </div> */}
              {/* <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 flex items-center justify-center"> */}
              <img
                src="https://cdn.shopify.com/s/files/1/0886/6532/5865/files/certification-icon-2_1fb8b786-2f8d-453f-a78e-c101576dba2d.webp"
                alt="USDA"
                className="w-full h-full object-contain p-1 "
              />
              {/* </div> */}
              {/* <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 flex items-center justify-center"> */}
              <img
                src="https://cdn.shopify.com/s/files/1/0886/6532/5865/files/certification-icon-5_3c83c29e-b704-4e20-a966-16c405521820.webp"
                alt="FSSAI"
                className="w-full h-full object-contain p-1"
              />
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/50 py-4 relative h-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mt-2">
          <p className="text-[8px] text-white/70">Copyright © 2025 Purezen</p>
        </div>
        <Button
          size="icon"
          onClick={scrollToTop}
          className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 rounded-full bg-white text-teal-600 hover:bg-white/90 shadow-lg"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      </div>
    </footer>
  );
}
