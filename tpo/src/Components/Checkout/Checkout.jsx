import React, { useContext, useState } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import './Checkout.css'; // Import the CSS file for styling
import paypal from '../Assets/card_img.png';

const Checkout = () => {
    const { cartItems, all_parties, getTotalCartAmount, removeFromCart } = useContext(ShopContext);
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCvv] = useState('');

    const handleCardNumberChange = (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        value = value.slice(0, 16); // Limit to 16 characters
        setCardNumber(value);
    };

    const handleExpirationDateChange = (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        value = value.slice(0, 6); // Limit to 6 characters (MMYYYY)
        const formattedValue = value.replace(/(\d{2})(\d{0,4})/, '$1/$2'); // Format as MM/YYYY
        setExpirationDate(formattedValue);
    };

    const handleCvvChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        const maxLength = cardNumber.startsWith('3') ? 4 : 3; // Set max length based on card type
        setCvv(value.slice(0, maxLength)); // Limit to maxLength characters
    };

    const handleRemoveFromCart = (partyId) => {
        // Implement the logic to remove an item from the cart
        removeFromCart(partyId);
    };

    return (
        <div className="checkout-container">
            <div className="billing-address">
                <h3 className="title">Billing Address</h3>
                <div className="input-box">
                    <span>Full Name:</span>
                    <input type="text" name="full-name" placeholder="John Doe" />
                </div>
                <div className="input-box">
                    <span>Email:</span>
                    <input type="email" name="email" placeholder="example@example.com" />
                </div>
                <div className="input-box">
                    <span>Address:</span>
                    <input type="text" name="address" placeholder="Room - Street - Locality" />
                </div>
                <div className="input-box">
                    <span>City:</span>
                    <input type="text" name="city" placeholder="Mumbai" />
                </div>
                <div className="flex">
                    <div className="input-box">
                        <span>State:</span>
                        <input type="text" name="state" placeholder="India" />
                    </div>
                    <div className="input-box">
                        <span>Zip Code:</span>
                        <input type="text" name="zip-code" placeholder="123456" />
                    </div>
                </div>
            </div>
            <div className="payment-details">
                <h3 className="title">Payment</h3>

                <div class="inputBox">
                    <span>cards accepted :</span>
                    <img src={paypal} alt=""/>
                </div>
                <div className="input-box">
                    <span>Credit Card Number:</span>
                    <input 
                        type="text" 
                        name="card-number" 
                        placeholder="1111-2222-3333-4444" 
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                    />
                </div>
                <div className="input-box">
                    <span>Expiration Date:</span>
                    <input 
                        type="text" 
                        name="expiration-date" 
                        placeholder="MM/YYYY" 
                        value={expirationDate}
                        onChange={handleExpirationDateChange}
                    />
                </div>
                <div className="input-box">
                    <span>CVV:</span>
                    <input 
                        type="text" 
                        name="cvv" 
                        placeholder="123" 
                        value={cvv}
                        onChange={handleCvvChange}
                    />
                </div>
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