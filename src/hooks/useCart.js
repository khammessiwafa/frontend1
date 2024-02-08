import React, { createContext, useState, useContext } from "react";
import { sample_articles } from "../data";

const CartContext = createContext(null);

export default function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(
        sample_articles
            .slice(1, 4)
            .map(article => ({ article, quantity: 1, price: article.price }))
    );
    const [totalPrice, setTotalPrice] = useState(40);
    const [totalCount, setTotalCount] = useState(3);


    return (<CartContext.Provider
        value={{ cart: { items: cartItems, totalPrice, totalCount } }}
    >
        {children}

    </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
