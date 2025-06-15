
'use client';

import type { Medicine } from '@/lib/mock-data';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface CartItem extends Medicine {
  quantity: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Medicine, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getTotalItems: () => number; // Added to get total number of items (sum of quantities)
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('mediMateCart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mediMateCart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = (item: Medicine, quantity: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(ci => ci.id === item.id);
      if (existingItem) {
        return prevItems.map(ci =>
          ci.id === item.id ? { ...ci, quantity: ci.quantity + quantity } : ci
        );
      }
      // Ensure price is part of the item being added
      const price = item.price || 50; // Fallback if price isn't on item for some reason
      return [...prevItems, { ...item, price, quantity }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: Math.max(0, quantity) } : item
      ).filter(item => item.quantity > 0) 
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + ((item.price || 50) * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getTotalItems }}>
      {children}
    </CartContext.Provider>
  );
}
