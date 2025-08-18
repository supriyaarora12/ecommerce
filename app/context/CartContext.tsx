'use client';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth, CartItem as UserCartItem } from '../../src/context/AuthContext';

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
            id: parseInt(item.productId),
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
        productId: item.id.toString(),
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
      
      if (existing) {
        newCart = prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + item.quantity } : p
        );
      } else {
        newCart = [...prev, item];
      }

      // Save to user document
      saveCartToUser(newCart);
      return newCart;
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCartState((prev) => {
      const newCart = prev.map((p) => (p.id === id ? { ...p, quantity } : p));
      
      // Save to user document
      saveCartToUser(newCart);
      return newCart;
    });
  };

  const removeFromCart = (id: number) => {
    setCartState((prev) => {
      const newCart = prev.filter((p) => p.id !== id);
      
      // Save to user document
      saveCartToUser(newCart);
      return newCart;
    });
  };

  const clearCart = () => {
    setCartState([]);
    if (user) {
      saveCartToUser([]);
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
