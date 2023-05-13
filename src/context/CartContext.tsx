import { createContext, useContext, useEffect, useState } from "react";

interface Donut {
  name: string;
  img: string;
  description: string;
  price: number;
  ingredients: string[];
  qty: number;
  date: string;
  thumbsUp: number;
  thumbsDown: number;
  stripeProductId: string;
  id: string;
  cartQty?: number;
}

interface CartContextProps {
  cart: Donut[];
  addToCart: (donut: Donut) => void;
  removeFromCart: (donutId: string) => void;
  decreaseCartQuantity: (donutId: string) => void; // Add this line
}

const CartContext = createContext<CartContextProps>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  decreaseCartQuantity: () => {}, // Add this line
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC = ({ children }) => {
  const [cart, setCart] = useState<Donut[]>([]);

  const addToCart = (donut: Donut) => {
    const updatedCart = [...cart, { ...donut, cartQty: 1 }];
    setCart(updatedCart);
  };

  const removeFromCart = (donutId: string) => {
    const updatedCart = cart.filter((donut) => donut.id !== donutId);
    setCart(updatedCart);
  };

  const decreaseCartQuantity = (donutId: string) => {
    const donutIndex = cart.findIndex((donut) => donut.id === donutId);

    if (donutIndex >= 0) {
      const updatedCart = [...cart];
      const updatedDonut = {
        ...updatedCart[donutIndex],
        cartQty: updatedCart[donutIndex].cartQty! - 1, // Use cartQty instead of qty
      };

      if (updatedDonut.cartQty! <= 0) {
        updatedCart.splice(donutIndex, 1);
      } else {
        updatedCart[donutIndex] = updatedDonut;
      }
      setCart(updatedCart);
    }
  };

  useEffect(() => {
    console.log("Cart updated:", cart);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, decreaseCartQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
