import { createContext, useState } from "react";
import { useGetProducts } from "../hooks/useGetProducts";

export const ShopContext = createContext();

export const ShopContextProvider = (props) => {
    const { products } = useGetProducts();
    const [cartItems, setCartItems] = useState(0);

    const [productId, setProductId] = useState("");

    const handleProductClick = (productId) => {
        setProductId(productId);
    }

    const getCartItemCount = (productId) => {
        return cartItems[productId] || 0;
    }

    const addToCart = (productId) => {
        console.log(productId);
        if (!cartItems[productId]) {
            setCartItems((prev) => ({ ...prev, [productId]: 1 }))
        } else {
            setCartItems((prev) => ({ ...prev, [productId]: prev[productId] + 1 }))
        }
    }

    const removeFromCart = (productId) => {

    }

    const updateCartItemCount = (newQuantity, productId) => {

    }

    const contextValue = {
        addToCart,
        removeFromCart,
        updateCartItemCount,
        getCartItemCount,
        handleProductClick,
        products,
        productId
    }

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}