import { useState, useContext, createContext } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setcart] = useState([]);

  return (
    <CartContext.Provider value={[cart, setcart]}>
      {children}
    </CartContext.Provider>
  );
};

// Custome Hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
