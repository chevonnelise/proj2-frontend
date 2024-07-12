import { createContext, useEffect, useState } from "react";
import { useGetProducts } from "../hooks/useGetProducts";
import axios from "axios";
import { useGetToken } from "../hooks/useGetToken";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const ShopContext = createContext();

export const ShopContextProvider = (props) => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const {headers} = useGetToken();
    // const navigate = useNavigate();
    const [cartItems, setCartItems] = useState({});
    const [orderItems, setOrderItems] = useState({});
    const [productId, setProductId] = useState("");
    const [purchasedItems, setPurchasedItems] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(cookies.access_token !== null);
    const { products } = useGetProducts(isAuthenticated);

    const handleProductClick = (productId) => {
        setProductId(productId);
    }

    const getCartItemCount = (productId) => {
        // console.log(cartItems[productId] || 0)
        return cartItems[productId] || 0;
    }

    const fetchPurchasedItems = async () => {
        try {
            const response = await axios.get(`https://proj2-backend.onrender.com/api/cart/${localStorage.getItem("userId")}`, {headers});
            setPurchasedItems(response.data.orderItems);
            console.log (response.data.orderItems);
        } catch (err) {
            alert("Error: Something went wrong.")
        }
    }

    const fetchOrderItems = async () => {
        try {
            const response = await axios.get(`https://proj2-backend.onrender.com/api/order/${localStorage.getItem("userId")}`, {headers});
            setOrderItems(response.data.orderItems);
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
                const itemInfo = products.find((product) => {
                    return product.id === parseInt(item)
                });
                if (itemInfo) {
                    totalAmount += cartItems[item] * itemInfo.cost;
                }
            }
        }
        return totalAmount;
    }
    
    const checkout = async () => {
        try {
            const result = await axios.post("https://proj2-backend.onrender.com/api/checkout", {headers, cartItems, user_id:`${localStorage.getItem("userId")}`});
            console.log(result)
            if(result.status === 200) {
                window.location.href = result.data.url;
                
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        console.log(isAuthenticated);
        if (isAuthenticated) {
        fetchPurchasedItems();
        } else {
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
        productId,
        getTotalCartAmount,
        checkout,
        purchasedItems,
        isAuthenticated,
        setIsAuthenticated,
        fetchOrderItems
    }

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
