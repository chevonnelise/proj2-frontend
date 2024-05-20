import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { useGetToken } from "./useGetToken";
import { ShopContext } from "../context/shop-context";

export const useGetProducts = (isAuthenticated) => {
    const [products, setProducts] = useState([]);
    const {headers} = useGetToken();
    // /const {isAuthenticated} = useContext(ShopContext);

    // console.log(context);
    const fetchProducts = async () => {
        try{
        const fetchedProducts = await axios.get("https://3000-chevonnelis-proj2backen-lqv6rdz4jy0.ws-us114.gitpod.io/api/products", {headers});
        setProducts(fetchedProducts.data.product);
        } catch (err) {
            alert("Error: Something went wrong.")
        }
    }

    useEffect(() => {
        // if (isAuthenticated)
        fetchProducts();
    },[]);

    return {products};
}