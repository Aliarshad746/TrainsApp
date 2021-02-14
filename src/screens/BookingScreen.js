import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartTrains from '../components/CartTrains';

const BookingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <div>
      <Container className="shadow-lg p-3 mb-5 bg-white rounded">
        <h1 className="text-center mb-3">Booked Trains</h1>
        <Link to="/" className="btn btn-light mb-2">
          Go Back
        </Link>
        {cartItems.length === 0 ? (
          <div className="bg-info p-3 text-white">
            You Have No Bookings Yet Go Back To <Link to="/">HomeScreen</Link>
          </div>
        ) : (
          <div>
            {cartItems.map((train, index) => (
              <CartTrains key={index} train={train} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default BookingScreen;
