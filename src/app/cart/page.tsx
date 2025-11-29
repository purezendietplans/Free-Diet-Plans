'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { getCart, removeFromCart, CartItem } from '@/lib/cart';
import { toast } from 'sonner';

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleRemove = (id: string) => {
    removeFromCart(id);
    setCart(getCart());
    toast.success('Item removed from cart');
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    router.push('/checkout');
  };

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Continue Shopping
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl flex items-center gap-2">
              <ShoppingBag className="h-6 w-6 md:h-8 md:w-8" />
              Your Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">Your cart is empty</p>
                <Link href="/">
                  <Button className='hover:cursor-pointer' >Browse Diet Plans</Button>
                </Link>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
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
                          <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                            {item.description}
                          </p>
                          <p className="text-green-600 font-semibold">FREE</p>
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleRemove(item._id)}
                          className="self-start hover:cursor-pointer" 
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="border-t pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-semibold">Total:</span>
                    <span className="text-2xl font-bold text-green-600">FREE</span>
                  </div>
                  <Button size="lg" className="w-full hover:cursor-pointer" onClick={handleCheckout}>
                    Proceed to Checkout
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}