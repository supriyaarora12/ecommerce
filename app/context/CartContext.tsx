'use client';
import { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
import { useAuth, CartItem as UserCartItem } from '../../src/context/AuthContext';
import { useToast } from './ToastContext';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  rating: number;
  reviews: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  loading: boolean;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCartState] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user, updateUserCart, getUserCart } = useAuth();
  const { showSuccess } = useToast();
  const lastToastRef = useRef<string>('');

  // Load cart from user document when user logs in
  useEffect(() => {
    const loadCartFromUser = async () => {
      if (!user) {
        setCartState([]);
        return;
      }

      setLoading(true);
      try {
        const userCartItems = await getUserCart();
        if (userCartItems && userCartItems.length > 0) {
          // Convert user cart items to local cart items
          const localCartItems: CartItem[] = userCartItems.map((item: UserCartItem) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            originalPrice: item.originalPrice,
            discountedPrice: item.discountedPrice,
            discount: item.discount,
            rating: item.rating,
            reviews: item.reviews,
          }));
          setCartState(localCartItems);
        } else {
          setCartState([]);
        }
      } catch (error) {
        console.error('Error loading cart from user document:', error);
        setCartState([]);
      } finally {
        setLoading(false);
      }
    };

    loadCartFromUser();
  }, [user, getUserCart]);

  // Save cart to user document whenever cart changes
  const saveCartToUser = async (newCart: CartItem[]) => {
    if (!user) return;

    try {
      const userCartItems: UserCartItem[] = newCart.map(item => ({
        id: item.id,
        quantity: item.quantity,
        name: item.name,
        price: item.price,
        image: item.image,
        originalPrice: item.originalPrice,
        discountedPrice: item.discountedPrice,
        discount: item.discount,
        rating: item.rating,
        reviews: item.reviews,
      }));

      await updateUserCart(userCartItems);
    } catch (error) {
      console.error('Error saving cart to user document:', error);
    }
  };

  const addToCart = (item: CartItem) => {
    setCartState((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      let newCart;
      let toastMessage = '';
      
      if (existing) {
        newCart = prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + item.quantity } : p
        );
        toastMessage = `${item.name} quantity updated in cart!`;
      } else {
        newCart = [...prev, item];
        toastMessage = `${item.name} added to cart successfully!`;
      }

      // Save to user document
      saveCartToUser(newCart);
      
      // Show toast only if it's different from the last one
      if (lastToastRef.current !== toastMessage) {
        showSuccess(toastMessage);
        lastToastRef.current = toastMessage;
        // Clear the reference after a short delay to allow legitimate duplicates
        setTimeout(() => {
          lastToastRef.current = '';
        }, 1000);
      }
      
      return newCart;
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCartState((prev) => {
      const item = prev.find((p) => p.id === id);
      const newCart = prev.map((p) => (p.id === id ? { ...p, quantity } : p));
      
      // Save to user document
      saveCartToUser(newCart);
      
      if (item) {
        const toastMessage = `${item.name} quantity updated to ${quantity}`;
        if (lastToastRef.current !== toastMessage) {
          showSuccess(toastMessage);
          lastToastRef.current = toastMessage;
          // Clear the reference after a short delay to allow legitimate duplicates
          setTimeout(() => {
            lastToastRef.current = '';
          }, 1000);
        }
      }
      
      return newCart;
    });
  };

  const removeFromCart = (id: number) => {
    setCartState((prev) => {
      const item = prev.find((p) => p.id === id);
      const newCart = prev.filter((p) => p.id !== id);
      
      // Save to user document
      saveCartToUser(newCart);
      
      if (item) {
        const toastMessage = `${item.name} removed from cart`;
        if (lastToastRef.current !== toastMessage) {
          showSuccess(toastMessage);
          lastToastRef.current = toastMessage;
          // Clear the reference after a short delay to allow legitimate duplicates
          setTimeout(() => {
            lastToastRef.current = '';
          }, 1000);
        }
      }
      
      return newCart;
    });
  };

  const clearCart = () => {
    setCartState([]);
    if (user) {
      saveCartToUser([]);
    }
    const toastMessage = 'Cart cleared successfully';
    if (lastToastRef.current !== toastMessage) {
      showSuccess(toastMessage);
      lastToastRef.current = toastMessage;
      // Clear the reference after a short delay to allow legitimate duplicates
      setTimeout(() => {
        lastToastRef.current = '';
      }, 1000);
    }
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      updateQuantity, 
      removeFromCart, 
      loading,
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
