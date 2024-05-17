import { createContext, useState } from "react";
import { useGetProducts } from "../hooks/useGetProducts";
import axios from "axios";
import { useGetToken } from "../hooks/useGetToken";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

export const ShopContextProvider = (props) => {
    const { products } = useGetProducts();
    const {headers} = useGetToken();
    const navigate = useNavigate();
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
        if (!cartItems[productId]) return;
        if (cartItems[productId] === 0) return;
        setCartItems((prev) => ({ ...prev, [productId]: prev[productId] - 1 }))
    }

    const updateCartItemCount = (newQuantity, productId) => {
        if (newQuantity < 0) return;
        setCartItems((prev) => ({...prev, [productId]: newQuantity}));
    }


    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = products.find((product) => product.id === item);
                // unable to retrieve itemInfo
                if (itemInfo) {
                    totalAmount += cartItems[item] * itemInfo.cost;
                }
            }
        }
        return totalAmount;
    }
    
    const checkout = async () => {
        try {
            await axios.post("https://3000-chevonnelis-proj2backen-lqv6rdz4jy0.ws-us110.gitpod.io/checkout", {headers});
            navigate("/");
        } catch (err) {
            console.log(err)
        }
    }

    const contextValue = {
        addToCart,
        removeFromCart,
        updateCartItemCount,
        getCartItemCount,
        handleProductClick,
        products,
        productId,
        getTotalCartAmount,
        checkout
    }

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}