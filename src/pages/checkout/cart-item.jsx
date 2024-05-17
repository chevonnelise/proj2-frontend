import { useContext } from 'react';
import { ShopContext } from '../../context/shop-context';
import './styles.css';

export const CartItem = ({ product }) => {
    const { addToCart, removeFromCart, updateCartItemCount, getCartItemCount } = useContext(ShopContext);
    const cartItemCount = getCartItemCount(product.id) 

    return (
        <div className="cart-item">
            <div className="card-container">
                <div className="card" key={product.id}>
                    <img src={product.image_url} alt={product.name} />
                    <div className="description">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">Cost: ${product.cost}</p>
                        
                        <div className="count-handler">
                            <button onClick={()=>removeFromCart(product.id)}> - </button>
                            <input type="number" value={cartItemCount} onChange={(e) => updateCartItemCount(e.target.value,product.id)} />
                            <button onClick={()=>addToCart(product.id)}> + </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}