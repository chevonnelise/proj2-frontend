import './styles.css';

export const Order = ({ product }) => {
    
    return (
        <div className="cart-item">
            <div className="card-container">
                <h1>Order successful: </h1>
                <div className="card" key={product.id}>
                    <img src={product.image_url} alt={product.name} />
                    <div className="description">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">Cost: ${product.cost}</p>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}