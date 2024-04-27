import React, { useContext, useState } from 'react';

import { ShopContext } from '../../Context/ShopContext';
import './Checkout.css'; // Import the CSS file for styling

const Checkout = () => {
    const { cartItems, all_parties, getTotalCartAmount, removeFromCart } = useContext(ShopContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCvv] = useState('');

    const handleRemoveFromCart = (partyId) => {
        // Implement the logic to remove an item from the cart
        removeFromCart(partyId);
    };

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            <div className="checkout-form">
                <label htmlFor="firstName">First Name:</label>
                <input 
                    type="text" 
                    id="firstName" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                />
            </div>
            <div className="checkout-form">
                <label htmlFor="lastName">Last Name:</label>
                <input 
                    type="text" 
                    id="lastName" 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} 
                />
            </div>
            <div className="checkout-form">
                <label htmlFor="cardNumber">Credit Card Number:</label>
                <input 
                    type="text" 
                    id="cardNumber" 
                    value={cardNumber} 
                    onChange={(e) => setCardNumber(e.target.value)} 
                />
            </div>
            <div className="checkout-form">
                <label htmlFor="expirationDate">Expiration Date:</label>
                <input 
                    type="text" 
                    id="expirationDate" 
                    value={expirationDate} 
                    onChange={(e) => setExpirationDate(e.target.value)} 
                />
            </div>
            <div className="checkout-form">
                <label htmlFor="cvv">CVV:</label>
                <input 
                    type="text" 
                    id="cvv" 
                    value={cvv} 
                    onChange={(e) => setCvv(e.target.value)} 
                />
            </div>
            <div className="checkout-parties">
                <h3>Parties Bought:</h3>
                {Object.keys(cartItems).map((partyId) => {
                    const party = all_parties.find((party) => party.id === parseInt(partyId));
                    if (party && cartItems[partyId] > 0) {
                        return (
                            <div className="checkout-parties-item" key={party.id}>
                                <p>{party.name}</p>
                                <p>Quantity: {cartItems[partyId]}</p>
                                <p>Total: ${party.new_price * cartItems[partyId]}</p>
                                <button onClick={() => handleRemoveFromCart(party.id)}>Remove</button>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
            <div className="checkout-total">
                <p>Subtotal: ${getTotalCartAmount()}</p>
                <p>Shipping: Free</p>
                <p>Total: ${getTotalCartAmount()}</p>
                <button>Comprar</button>
            </div>
        </div>
    );
};

export default Checkout;