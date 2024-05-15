import React from 'react';
import {useGetProducts} from '../../hooks/useGetProducts';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';

export const ShopPage = () => {
  const {products} = useGetProducts();

  return (
    <div className="shop">
      <div className="products">
      <div className="card-container" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', minHeight: '100vh', padding: '50px' }}>
            <Row xs={1} md={3} className="g-4">
                {products.map((product) => (
                    <Card key={product.id} style={{ width: '18rem', margin: '10px', padding: '20px' }}>
                        <Card.Img variant="top" src={product.image_url} />
                        <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>${product.cost}</Card.Text>
                            <Card.Text>{product.description}</Card.Text>
                            <Card.Text>{product.tags.map((tag, index) => (
                                <span key={index} style={{ marginRight: '5px', color: 'white' }}><Badge bg="success">{tag.name}{index !== product.tags.length - 1}</Badge></span>
                            ))}</Card.Text>
                            <Button className="btn btn-outline-dark">Add to Cart</Button>
                            {/* <Button className="btn btn-outline-dark" onClick={() => addToCart(product.id)}> */}
                                {/* Add to cart {getCartItemCount(product.id) > 0 && `(${getCartItemCount(product.id)})`}
                            </Button> */}
                        </Card.Body>
                    </Card>
                ))}
            </Row>
        </div>
      </div>
    </div>
  )
}
