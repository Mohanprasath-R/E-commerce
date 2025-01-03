import React from 'react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

function CartPage() {
  const { cart, dispatch } = useCart();
  const totalAmount = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrder = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast.success('Order placed successfully!');
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
    toast.info('Item removed from cart');
  };

  return (
    <div className="container mt-5">
      <h1>Your Cart</h1>
      {cart.items.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div className='row'>
          {cart.items.map((item) => (
            <div key={item._id} className="d-flex justify-content-between col-md-8 align-items-center mb-3">
              <div>
                <img
                  src={`http://localhost:5000${item.images[0]?.image}`}
                  alt={item.name}
                  style={{ width: '50px' }}
                />
                <span className="ms-3">{item.name}</span>
              </div>
              <div>
                <button
                  className="btn btn-danger me-2"
                  onClick={() => dispatch({ type: 'DECREMENT_ITEM', payload: item._id })}
                  disabled={item.quantity === 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="btn btn-success ms-2"
                  onClick={() => dispatch({ type: 'INCREMENT_ITEM', payload: item._id })}
                >
                  +
                </button>
              </div>
              <span>₹ {(item.price * item.quantity).toFixed(2)}</span>
              <button
                className="btn btn-danger ms-3"
                onClick={() => removeItem(item._id)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="col-md-4 ps-4">
            <h2 className='text-primary'>Summary : </h2>
            <h3>Total : ₹ {totalAmount.toFixed(2)}</h3>
            <button className="btn btn-success" onClick={placeOrder}>
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
