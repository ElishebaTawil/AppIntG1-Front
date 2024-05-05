import React, { useContext, useState } from 'react';

import { ShopContext } from '../../Context/ShopContext';
import './Checkout.css'; 
import trash from '../Assets/trash.png';


const Checkout = () => {
    const { cartItems, all_parties, getTotalCartAmount, removeFromCart, descountStockParty, removeAllFromCart } = useContext(ShopContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleRemoveFromCart = (partyId) => {
        // Implement the logic to remove an item from the cart
        removeFromCart(partyId);
    };
    const handleDescountStock = () => {
        for (const partyId in cartItems) {
            const party = all_parties.find((party) => party.id === parseInt(partyId));
            if (party && cartItems[partyId] > 0) {
                descountStockParty(party.id, cartItems[partyId]);
            }
        }
        if (!isValidCVV(cvv) || !isValidString(firstName) || !isValidString(lastName) || !isValidCardNumber(cardNumber)) {
            alert('datos invalidos, ingreselos correctamente');
            return; // No continuar con la compra si el CVV no es válido
        }
        else{
            setFirstName('');
        setLastName('');
        setCardNumber('');
        setExpirationDate('');
        setCvv('');
        handleRemoveAllCart();
        setShowSuccessMessage(true);

        }

        
    }
    const handleRemoveAllCart = () =>{ removeAllFromCart();}
   
    const isValidCVV = (cvv) => {
        return /^\d{3}$/.test(cvv);
    };
    const isValidString = (value) => {
        return typeof value === 'string' && value.trim() !== '';
    }
    const isValidCardNumber = (cardNumber) => {
        return /^\d{16}$/.test(cardNumber);
    };

    return (
        <div className="checkout-container">
           
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
                <h3>Resumen:</h3>
                {Object.keys(cartItems).map((partyId) => {
                    const party = all_parties.find((party) => party.id === parseInt(partyId));
                    if (party && cartItems[partyId] > 0) {
                        return (
                            <div className="checkout-parties-item" key={party.id}>
                                <p>{party.name}</p>
                                <p>Quantity: {cartItems[partyId]}</p>
                                <p>Total: ${party.new_price * cartItems[partyId]}</p>
                                <button onClick={() => handleRemoveFromCart(party.id)}>
                                    <img className= 'removeFoto' src={trash} alt="remove" />
                                </button>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
            <div className='checkout-total'>
                <p>Subtotal: ${getTotalCartAmount()}</p>
                <p>Shipping: Free</p>
                <p>Total: ${getTotalCartAmount()}</p>
                <button onClick={() => handleDescountStock()}>Comprar</button>

            </div>

            
                {showSuccessMessage && (
                <div className="success-message">
                    <h2>¡Compra exitosa!</h2>
                    <p>Le estara llegando al mail los QR para las entradas</p>

                </div>
            )}
        </div>
    );
};

export default Checkout;