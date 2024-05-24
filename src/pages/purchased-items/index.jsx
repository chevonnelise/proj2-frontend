import React, { useContext } from 'react';
import { ShopContext } from '../../context/shop-context';

export const PurchasedItemsPage = () => {
  const { purchasedItems, addToCart, getCartItemCount } = useContext(ShopContext);

  return (
    <>
      <div className="purchased-items-page">
        <h1>Previously Purchased Items</h1>
        <div className="purchased-items">
          {purchasedItems.map((order) => {
            const orderItem = order.orderItem; // Assuming orderItem is an array
            return (
              <div key={order.id}>
                <h3>{order.order_id}</h3>
                {orderItem.map((item) => {
                  console.log(item);
                  return (
                    <div className="item" key={item.product.id}>
                      <h3>{item.product.name}</h3>
                      <img src={item.product.image_url} alt={item.product.name} />
                      <p>${item.product.cost}</p>
                      <button className="btn btn-outline-dark" onClick={() => addToCart(item.product.id)}>
                        Buy Again {getCartItemCount(item.product.id) > 0 && <>({getCartItemCount(item.product.id)})</>}
                      </button>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
