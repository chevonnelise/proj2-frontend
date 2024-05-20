import React, { useContext } from 'react'
import { ShopContext } from '../../context/shop-context'

export const PurchasedItemsPage = () => {
  const { purchasedItems, addToCart, getCartItemCount } = useContext(ShopContext);
  
  return (
    <div className="purchased-items-page">
      <h1>Previously Purchased Items</h1>
      <div className="purchased-items">
        {purchasedItems.map((item) => {
          const count = getCartItemCount(item.product.id);

          return (
            <div className="item">
              <h3>{item.product.name}</h3>
              <img src={item.product.image_url} />
              <p>${item.product.cost}</p>
              
              <button className="btn btn-outline-dark" onClick={() => addToCart(item.product_id)}>
                Buy Again {count > 0 && <>({count})</>}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  )
}
