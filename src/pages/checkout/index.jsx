import React, { useContext } from 'react';
import { useGetProducts } from '../../hooks/useGetProducts'
import { ShopContext } from '../../context/shop-context';
import { CartItem } from './cart-item';
import { useNavigate } from 'react-router-dom';

export const CheckoutPage = () => {
  const { getCartItemCount, getTotalCartAmount, checkout } = useContext(ShopContext);
  const { products } = useGetProducts();
  const navigate = useNavigate();

  const totalAmount = getTotalCartAmount();
  
  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>

      <div>
        {products.map((product) => {
          if (getCartItemCount(product.id) !== 0) {
            return <CartItem key={product.id} product={product} />;
          }
          return null;
        })}
      </div>
      
      {/* {totalAmount > 0 ? ( */}
      <div className="checkout">
        <p> Subtotal: $ {totalAmount.toFixed(2)}</p>
        <button className="shop-btn" onClick={() => navigate("/")}> Continue Shopping </button>
        <button className="checkout-btn" onClick={checkout}> Checkout </button>
      </div>

      {/* ) : (
      <div>
        <h1>Your Shopping Cart is Empty </h1>
        <button className="shop-btn" onClick={() => navigate("/")}> Continue Shopping </button>
      </div>
      )} */}
    </div>
  )
}
