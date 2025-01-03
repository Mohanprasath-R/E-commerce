import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="container my-5">
      <h1 className='ms-3 text-primary mb-3'>Products</h1>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-3 my-2 h-50" key={product._id}>
            <div className="card">
              {product.images && product.images.length > 0 ? (
                <img  
                  src={`http://localhost:5000${product.images[0]?.image}`}
                  className="card-img-top" style={{height:"250px"}}
                  alt={product.name}
                />
              ) : (
                <div>No image available</div>
              )}
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">₹ {product.price}</p>
                <Link className="btn btn-warning" to={`/product/${product._id}`}>Product Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
