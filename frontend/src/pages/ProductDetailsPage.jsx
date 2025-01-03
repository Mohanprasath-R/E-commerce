import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

function ProductDetailsPage() {
  const { id } = useParams();
  const { cart, dispatch } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Fetch product details from API
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
        setLoading(false);
      });
  }, [id]);

  const addToCart = () => {
    if (product.stock >= quantity) {
      const existingItem = cart.items.find((item) => item._id === product._id);

      if (existingItem) {
        if (existingItem.quantity + quantity <= product.stock) {
          dispatch({ type: 'INCREMENT_ITEM', payload: product._id, quantity });
          toast.success('Item quantity updated in cart!');
        } else {
          toast.error('No more stock available!');
        }
      } else {
        dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity } });
        toast.success('Item added to cart!');
      }
    } else {
      toast.error('Not enough stock available!');
    }
  };

  if (loading) {
    return <div>Loading product details...</div>; // Optional: Add spinner here for better UX
  }

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={`http://localhost:5000${product.images[0]?.image}`}
            alt={product.name}
            className="img-fluid h-100"
          />
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <h4>₹ {product.price.toFixed(2)}</h4>
          <p>Category: {product.category}</p>
          <p>Seller: {product.seller}</p>
          <p>Stock: {product.stock > 0 ? product.stock : 'Out of stock'}</p>

          {product.stock > 0 && (
            <div className="d-flex align-items-center mb-3">
              <p className="mt-3 me-3">Quantity:</p>
              <div className="d-flex input-group-md ">
                <button
                  className="btn btn-danger input-group-text"
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.min(Math.max(1, +e.target.value), product.stock))
                  }
                  className="form-control w-25 text-center"
                />
                <button
                  className="btn btn-success input-group-text"
                  onClick={() => setQuantity((prev) => Math.min(prev + 1, product.stock))}
                >
                  +
                </button>
              </div>
            </div>
          )}

          <button
            className="btn btn-primary"
            onClick={addToCart}
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>

          <Link to="/" className="btn btn-secondary ms-3">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
