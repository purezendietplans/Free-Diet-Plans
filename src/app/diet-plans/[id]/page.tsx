// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Image from 'next/image';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { Download, ArrowLeft } from 'lucide-react';
// import { DietPlan } from '@/types';
// import Link from 'next/link';

// export default function DietPlanDetailPage() {
//     const params = useParams();
//     const router = useRouter();
//     const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);
//     const [loading, setLoading] = useState(true);

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
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading) {
//         return (
//             <div className="container mx-auto px-4 py-12">
//                 <div className="max-w-4xl mx-auto animate-pulse">
//                     <div className="h-96 bg-muted rounded-xl mb-8" />
//                     <div className="h-8 bg-muted rounded w-3/4 mb-4" />
//                     <div className="h-4 bg-muted rounded w-full mb-2" />
//                     <div className="h-4 bg-muted rounded w-5/6" />
//                 </div>
//             </div>
//         );
//     }

//     if (!dietPlan) {
//         return (
//             <div className="container mx-auto px-4 py-12">
//                 <div className="text-center">
//                     <h1 className="text-2xl font-bold mb-4">Diet Plan Not Found</h1>
//                     <Link href="/">
//                         <Button>Back to Home</Button>
//                     </Link>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="container mx-auto px-4 py-12">
//             <div className="max-w-4xl mx-auto">
//                 {/* Back Button */}
//                 <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
//                     <ArrowLeft className="h-4 w-4 mr-2" />
//                     Back to all plans
//                 </Link>

//                 <Card className="overflow-hidden">
//                     {/* Image */}
//                     <div className="relative aspect-video md:aspect-[21/9]">
//                         <Image
//                             src={dietPlan.imageUrl}
//                             alt={dietPlan.title}
//                             fill
//                             className="object-cover"
//                             priority
//                         />
//                         {dietPlan.price === 0 && (
//                             <div className="absolute top-6 right-6 bg-green-500 text-white px-4 py-2 rounded-full text-lg font-semibold shadow-lg">
//                                 FREE
//                             </div>
//                         )}
//                     </div>

//                     <CardContent className="p-8 md:p-12">
//                         {/* Title and Price */}
//                         <div className="mb-6">
//                             <h1 className="text-4xl font-bold mb-2">{dietPlan.title}</h1>
//                             {dietPlan.price > 0 && (
//                                 <p className="text-2xl font-semibold text-primary">
//                                     ₹{dietPlan.price}
//                                 </p>
//                             )}
//                         </div>

//                         {/* Description */}
//                         <div className="prose prose-lg max-w-none mb-8">
//                             <p className="text-muted-foreground whitespace-pre-wrap">
//                                 {dietPlan.description}
//                             </p>
//                         </div>

//                         {/* Download Button */}
//                         <Button
//                             size="lg"
//                             className="w-full md:w-auto text-lg px-8"
//                             onClick={() => router.push(`/checkout/${dietPlan._id}`)}
//                         >
//                             <Download className="mr-2 h-5 w-5" />
//                             Download Diet Plan
//                         </Button>
//                     </CardContent>
//                 </Card>
//             </div>
//         </div>
//     );
// }





// V2
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { DietPlan } from '@/types';
import { addToCart, getCartCount } from '@/lib/cart';
import { toast } from 'sonner';
import Link from 'next/link';

export default function DietPlanDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDietPlan();
    }, [params.id]);

    const fetchDietPlan = async () => {
        try {
            const response = await fetch(`/api/diet-plans/${params.id}`);
            if (response.ok) {
                const data = await response.json();
                setDietPlan(data);
            }
        } catch (error) {
            console.error('Error fetching diet plan:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = () => {
        if (!dietPlan) return;

        addToCart({
            _id: dietPlan._id!,
            title: dietPlan.title,
            description: dietPlan.description,
            imageUrl: dietPlan.imageUrl,
            pdfUrl: dietPlan.pdfUrl,
            price: dietPlan.price,
        });

        toast.success(`${dietPlan.title} added to cart!`, {
            action: {
                label: 'View Cart',
                onClick: () => router.push('/cart'),
            },
        });
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-12">
                <div className="max-w-4xl mx-auto animate-pulse">
                    <div className="h-64 md:h-96 bg-muted rounded-xl mb-8" />
                    <div className="h-8 bg-muted rounded w-3/4 mb-4" />
                    <div className="h-4 bg-muted rounded w-full mb-2" />
                    <div className="h-4 bg-muted rounded w-5/6" />
                </div>
            </div>
        );
    }

    if (!dietPlan) {
        return (
            <div className="container mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-12">
                <div className="text-center">
                    <h1 className="text-xl md:text-2xl font-bold mb-4">Diet Plan Not Found</h1>
                    <Link href="/">
                        <Button>Back to Home</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-12">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4 md:mb-6">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to all plans
                </Link>

                <Card className="overflow-hidden">
                    {/* Image */}
                    <div className="relative aspect-video md:aspect-[21/9]">
                        <Image
                            src={dietPlan.imageUrl}
                            alt={dietPlan.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        {dietPlan.price === 0 && (
                            <div className="absolute top-4 md:top-6 right-4 md:right-6 bg-green-500 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-sm md:text-lg font-semibold shadow-lg">
                                FREE
                            </div>
                        )}
                    </div>

                    <CardContent className="p-6 md:p-8 lg:p-12">
                        {/* Title and Price */}
                        <div className="mb-6">
                            <h1 className="text-2xl text-[#0b4c49] md:text-3xl lg:text-4xl font-bold mb-2">{dietPlan.title}</h1>
                            {dietPlan.price > 0 && (
                                <p className="text-xl md:text-2xl font-semibold text-primary">
                                    ₹{dietPlan.price}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="prose prose-sm md:prose-lg max-w-none mb-6 md:mb-8">
                            <p className=" text-[#0b4c49] text-sm md:text-base whitespace-pre-wrap">
                                {dietPlan.description}
                            </p>
                        </div>

                        {/* Add to Cart Button */}
                        <Button
                            size="lg"
                            className="w-full md:w-auto text-base md:text-lg px-6 md:px-8"
                            onClick={handleAddToCart}
                        >
                            <ShoppingCart className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                            Add to Cart
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}