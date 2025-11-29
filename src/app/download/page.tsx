// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { CheckCircle, Download, Home } from 'lucide-react';
// import { DietPlan } from '@/types';

// export default function DownloadPage() {
//     const params = useParams();
//     const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);

//     useEffect(() => {
//         fetchDietPlan();
//     }, [params.id]);

//     const fetchDietPlan = async () => {
//         try {
//             const response = await fetch(`/api/diet-plans/${params.id}`);
//             if (response.ok) {
//                 const data = await response.json();
//                 setDietPlan(data);
//             }
//         } catch (error) {
//             console.error('Error fetching diet plan:', error);
//         }
//     };

//     const handleDownload = async () => {
//         if (!dietPlan?.pdfUrl) return;

//         try {
//             // Fetch the PDF from Cloudinary
//             const response = await fetch(dietPlan.pdfUrl);
//             const blob = await response.blob();

//             // Create a download link
//             const url = window.URL.createObjectURL(blob);
//             const link = document.createElement('a');
//             link.href = url;
//             link.download = `${dietPlan.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;
//             document.body.appendChild(link);
//             link.click();

//             // Cleanup
//             document.body.removeChild(link);
//             window.URL.revokeObjectURL(url);
//         } catch (error) {
//             console.error('Error downloading PDF:', error);
//             // Fallback to opening in new tab
//             window.open(dietPlan.pdfUrl, '_blank');
//         }
//     };

//     return (
//         <div className="container mx-auto px-4 py-12">
//             <div className="max-w-2xl mx-auto">
//                 <Card className="text-center">
//                     <CardHeader>
//                         <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
//                             <CheckCircle className="w-10 h-10 text-green-600" />
//                         </div>
//                         <CardTitle className="text-3xl">Thank You!</CardTitle>
//                         <p className="text-muted-foreground mt-2">
//                             Your details have been submitted successfully
//                         </p>
//                     </CardHeader>
//                     <CardContent className="space-y-6">
//                         {dietPlan && (
//                             <div className="bg-muted/50 rounded-lg p-6">
//                                 <h3 className="font-semibold text-lg mb-2">{dietPlan.title}</h3>
//                                 <p className="text-sm text-muted-foreground">
//                                     Your diet plan is ready to download
//                                 </p>
//                             </div>
//                         )}

//                         <div className="space-y-3">
//                             <Button
//                                 size="lg"
//                                 className="w-full"
//                                 onClick={handleDownload}
//                             >
//                                 <Download className="mr-2 h-5 w-5" />
//                                 Download Diet Plan PDF
//                             </Button>

//                             <Link href="/" className="block">
//                                 <Button variant="outline" size="lg" className="w-full">
//                                     <Home className="mr-2 h-5 w-5" />
//                                     Browse More Diet Plans
//                                 </Button>
//                             </Link>
//                         </div>

//                         <p className="text-sm text-muted-foreground">
//                             Your details have been saved and you can download the diet plan anytime.
//                         </p>
//                     </CardContent>
//                 </Card>
//             </div>
//         </div>
//     );
// }

// V2 add to cart feature
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Download, Home } from "lucide-react";
import { getCart, clearCart, CartItem } from "@/lib/cart";

export default function DownloadPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleDownload = async (item: CartItem) => {
    if (!item.pdfUrl) return;

    try {
      const response = await fetch(item.pdfUrl);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${item.title
        .replace(/[^a-z0-9]/gi, "_")
        .toLowerCase()}.pdf`;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      window.open(item.pdfUrl, "_blank");
    }
  };

  const handleDownloadAll = () => {
    cart.forEach((item, index) => {
      setTimeout(() => {
        handleDownload(item);
      }, index * 500);
    });
  };

  const handleClearAndGoHome = () => {
    clearCart();
    router.push("/");
  };

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <Card className="text-center mb-8">
          <CardHeader>
            <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl md:text-3xl">Thank You!</CardTitle>
            <p className="text-sm md:text-base text-muted-foreground mt-2">
              Your details have been submitted successfully
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              size="lg"
              className="w-full hover:cursor-pointer"
              onClick={handleDownloadAll}
            >
              <Download className="mr-2 h-5 w-5" />
              Download All Plans
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-full hover:cursor-pointer"
              onClick={handleClearAndGoHome}
            >
              <Home className="mr-2 h-5 w-5" />
              Browse More Diet Plans
            </Button>
          </CardContent>
        </Card>

        {/* Individual Downloads */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">
              Your Diet Plans
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Download individually
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {cart.map((item) => (
              <Card key={item._id} className="overflow-hidden">
                <div className="flex flex-col sm:flex-row gap-4 p-4">
                  <div className="relative w-full sm:w-32 h-32 shrink-0">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base md:text-lg mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 mb-3">
                      {item.description}
                    </p>
                    <Button
                      size="sm"
                      onClick={() => handleDownload(item)}
                      className="w-full sm:w-auto hover:cursor-pointer "
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
