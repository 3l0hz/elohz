
"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from './catalog';

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Persistence
  useEffect(() => {
    const saved = localStorage.getItem('elohz-cart');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading cart", e);
      }
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('elohz-cart', JSON.stringify(items));
    }
  }, [items, isInitialized]);

  const addItem = (product: Product) => {
    setItems(current => {
      const existing = current.find(item => item.id === product.id);
      if (existing) {
        return current.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
  };

  const removeItem = (productId: string) => {
    setItems(current => current.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setItems(current => current.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const totalPrice = items.reduce((sum, item) => {
    const priceNum = parseInt(item.price.replace(/[^0-9]/g, ''), 10);
    return sum + (priceNum * item.quantity);
  }, 0);

  return (
    <CartContext.Provider value={{ 
      items, addItem, removeItem, updateQuantity, clearCart, 
      totalItems, totalPrice, isOpen, setIsOpen 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
