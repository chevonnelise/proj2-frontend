import React, { useContext } from 'react';
import { useGetProducts } from '../../hooks/useGetProducts';
import './styles.css';
import { ShopContext } from '../../context/shop-context';
import { Navigate } from 'react-router-dom';


export const ShopPage = () => {
  const { products } = useGetProducts();
  const {addToCart, getCartItemCount, isAuthenticated} = useContext(ShopContext);

  if (!isAuthenticated) {
    return <Navigate to="/auth" />
  }

  return (
    <div className="shop">
      <div className="products">
        <div className="card-container">
          {products.map((product) => (
            <div className="card" key={product.id}>
              <img className="card-img" src={product.image_url} alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">${product.cost}</p>
                <p className="card-text">{product.description}</p>
                <div className="card-tags">
                  {product.tags.map((tag, index) => (
                    <span className="badge" key={index}>
                      {tag.name}
                    </span>
                  ))}
                </div>
                <button className="btn btn-outline-dark" onClick={()=>addToCart(product.id)}>
                  Add to Cart {getCartItemCount(product.id) > 0 && <>({getCartItemCount(product.id)})</>}
                  </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
