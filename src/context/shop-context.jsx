import { createContext, useEffect, useState } from "react";
import { useGetProducts } from "../hooks/useGetProducts";
import axios from "axios";
import { useGetToken } from "../hooks/useGetToken";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const ShopContext = createContext();

export const ShopContextProvider = (props) => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const { products } = useGetProducts();
    const {headers} = useGetToken();
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState({});
    const [productId, setProductId] = useState("");
    const [purchasedItems, setPurchasedItems] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(cookies.access_token !== null);

    const handleProductClick = (productId) => {
        setProductId(productId);
    }

    const getCartItemCount = (productId) => {
        return cartItems[productId] || 0;
    }

    const fetchPurchasedItems = async () => {
        try {
            const response = await axios.get(`https://3000-chevonnelis-proj2backen-lqv6rdz4jy0.ws-us110.gitpod.io/api/cart/${localStorage.getItem("userId")}`, {headers});
            setPurchasedItems(response.data.cartItems);
            console.log (response.data.cartItems);
        } catch (err) {
            alert("Error: Something went wrong.")
        }
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

    useEffect(() => {
        if (isAuthenticated) {
        fetchPurchasedItems();
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (!isAuthenticated) {
            localStorage.clear()
            setCookies("access_token", null)
        }
    }, [isAuthenticated]);

    const contextValue = {
        addToCart,
        removeFromCart,
        updateCartItemCount,
        getCartItemCount,
        handleProductClick,
        products,
        productId,
        getTotalCartAmount,
        checkout,
        purchasedItems,
        isAuthenticated,
        setIsAuthenticated
    }

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}