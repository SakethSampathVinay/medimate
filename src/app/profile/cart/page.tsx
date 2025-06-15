
'use client';

import AppLayout from '@/components/layout/app-layout';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Trash2, Plus, Minus, CreditCard, Loader2, Info } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import React from 'react';

export default function CartPage() {
  const { user, isLoading: authLoading } = useAuth();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();

  React.useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=/profile/cart');
    }
  }, [user, authLoading, router]);

  if (authLoading || (!user && typeof window !== 'undefined')) { 
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center h-full">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-lg text-muted-foreground">Loading cart...</p>
        </div>
      </AppLayout>
    );
  }
  
  const handleCheckout = () => {
    toast({
        title: "Checkout Initiated (Mock)",
        description: `Your order for ₹${getCartTotal().toFixed(2)} is being processed. This is a mock action.`,
        className: "bg-primary text-primary-foreground",
    });
  };

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
        removeFromCart(itemId);
    } else {
        updateQuantity(itemId, newQuantity);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <Card className="dark:bg-card">
          <CardHeader>
            <CardTitle className="font-headline text-3xl flex items-center text-card-foreground">
              <ShoppingCart className="mr-3 h-8 w-8 text-primary" /> My Shopping Cart
            </CardTitle>
            <CardDescription>Review items in your cart and proceed to checkout.</CardDescription>
          </CardHeader>
          <CardContent>
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground mb-6" />
                <p className="text-2xl font-medium mb-2 text-card-foreground">Your cart is empty</p>
                <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href="/medicines">
                    <Pill className="mr-2 h-5 w-5" /> Browse Medicines
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="flex flex-col sm:flex-row items-center gap-4 p-4 shadow-sm hover:shadow-md transition-shadow dark:bg-card/60">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-muted dark:bg-muted/50 rounded-md overflow-hidden">
                      <Image 
                        src={item.imageUrl} 
                        alt={item.name} 
                        fill 
                        className="object-contain" 
                        data-ai-hint={item.dataAiHint || "medicine image"}
                        onError={(e) => { e.currentTarget.src = 'https://placehold.co/100x100.png?text=No+Image'; }}
                      />
                    </div>
                    <div className="flex-grow text-center sm:text-left">
                      <h3 className="font-headline text-lg text-card-foreground">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">₹{item.price.toFixed(2)} per unit</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 my-2 sm:my-0">
                      <Button variant="outline" size="icon" onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} className="hover:bg-accent/10" >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-medium text-card-foreground">{item.quantity}</span>
                      <Button variant="outline" size="icon" onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} className="hover:bg-accent/10">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="font-semibold text-md flex-shrink-0 w-24 text-right text-primary">₹{(item.price * item.quantity).toFixed(2)}</p>
                    <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} className="text-destructive hover:text-destructive/90 hover:bg-destructive/10 flex-shrink-0">
                      <Trash2 className="h-5 w-5" />
                      <span className="sr-only">Remove item</span>
                    </Button>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
          {cartItems.length > 0 && (
            <CardFooter className="flex flex-col sm:flex-row justify-between items-center mt-6 border-t pt-6 gap-4">
              <div className="text-2xl font-bold text-primary">
                Grand Total: ₹{getCartTotal().toFixed(2)}
              </div>
              <Button size="lg" onClick={handleCheckout} className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
                <CreditCard className="mr-2 h-5 w-5" /> Proceed to Checkout
              </Button>
            </CardFooter>
          )}
        </Card>
        {cartItems.length > 0 && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 dark:bg-blue-900/30 dark:border-blue-700 rounded-md text-sm text-blue-700 dark:text-blue-300 flex items-start">
                <Info className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                    <span className="font-semibold">Note:</span> This is a demo application. No real purchases will be made. Cart items are stored in your browser's local storage and will persist on this device until cleared.
                </div>
            </div>
        )}
      </div>
    </AppLayout>
  );
}

const Pill = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"></path>
    <path d="m8.5 8.5 7 7"></path>
  </svg>
);
