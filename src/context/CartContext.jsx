"use client";
const { createContext, useContext, useState, useEffect } = require("react");

const cartContext = createContext();

export const useCartContext = () => {
  return useContext(cartContext);
};

export const CartContextProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItem(JSON.parse(storedCart));
    }
  }, []);

  const getProductQty = (id) => {
    return cartItem.find((item) => item.id == id)?.qty || 0;
  };

  const cartTotalQty = cartItem.reduce((totalqty, item) => {
    return totalqty + item.qty;
  }, 0);

  const handleIncreaseqty = (id) => {
    setCartItem((prevItems) => {
      let isNotExistProduct =
        prevItems.find((item) => item.id === id) === undefined;
      if (isNotExistProduct) {
        return [...prevItems, { id: id, qty: 1 }];
      } else {
        return prevItems.map((item) => {
          if (item.id === id) {
            return { ...item, qty: item.qty + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const handleDecreaseqty = (id) => {
    setCartItem((prevItems) => {
      let isLastOne = prevItems.find((item) => item.id == id)?.qty == 1;
      if (isLastOne) {
        return prevItems.filter((item) => item.id !== id);
      } else {
        return prevItems.map((item) => {
          if (item.id == id) {
            return { ...item, qty: item.qty - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItem));
  }, [cartItem]);
  return (
    <cartContext.Provider
      value={{
        handleIncreaseqty,
        getProductQty,
        handleDecreaseqty,
        cartTotalQty,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};
