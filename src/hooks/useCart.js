import React, { createContext, useState, useContext, useEffect } from "react";
import { sample_articles } from "../data";

const CartContext = createContext(null);
const CART_KEY = 'cart';
const EMPTY_CART = {
    items: [],
    totalPrice: 0,
    totalCount: 0,


};

export default function CartProvider({ children }) {
    const initCart = getCartFromLocalStorage();
    const [cartItems, setCartItems] = useState(initCart.items);
    const [totalPrice, setTotalPrice] = useState(initCart.totalPrice);
    const [totalCount, setTotalCount] = useState(initCart.totalCount);

    useEffect(() => {
        const totalPrice = sum(cartItems.map(item => item.price));
        const totalCount = sum(cartItems.map(item => item.quantity));
        setTotalPrice(totalPrice);
        setTotalCount(totalCount);
        localStorage.setItem(
            CART_KEY,
            JSON.stringify({
                items: cartItems,
                totalPrice,
                totalCount,
            })
        );


    }, [cartItems]);

    function getCartFromLocalStorage() {
        const storedCart = localStorage.getItem(CART_KEY);
        return storedCart ? JSON.parse(storedCart) : EMPTY_CART;
    };

    const sum = items => {
        return items.reduce((prevValue, curValue) => prevValue + curValue, 0);

    };

    const removeFromCart = articleId => {
        const filteredCartItems = cartItems.filter(item => item.article.id !== articleId);
        setCartItems(filteredCartItems);
    };
    const changeQuantity = (cartItem, newQuantity) => {
        const { article } = cartItem;
        const changedCartItem = {
            ...cartItem,
            quantity: newQuantity,
            price: article.price * newQuantity,
        };

        setCartItems(
            cartItems.map(item => (item.article.id === article.id ? changedCartItem : item))

        );


    };

    const addToCart = article => {
        const cartItem = cartItems.find(item => item.article.id === article.id);
        if (cartItem) {
            changeQuantity(cartItem, cartItem.quantity + 1);

        } else {
            setCartItems([...cartItems, { article, quantity: 1, price: article.price }]);
        }

    };


    return (<CartContext.Provider
        value={{
            cart: { items: cartItems, totalPrice, totalCount },
            removeFromCart,
            changeQuantity,
            addToCart
        }}
    >
        {children}

    </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
