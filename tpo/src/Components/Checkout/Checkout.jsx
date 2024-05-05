import React, { useContext, useState } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import './Checkout.css'; 
import trash from '../Assets/trash.png';
import paypal from '../Assets/card_img.png';


const Checkout = () => {
    const { cartItems, all_parties, getTotalCartAmount, removeFromCart, descountStockParty, removeAllFromCart } = useContext(ShopContext);
    const [fullName, setFullName] = useState('');
    const [email, setemail] = useState('');
    const [adress, setadress] = useState('');
    const [city, setcity] = useState('');
    const [state, setstate] = useState('');
    const [code, setcode] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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
    const handleDescountStock = () => {
        for (const partyId in cartItems) {
            const party = all_parties.find((party) => party.id === parseInt(partyId));
            if (party && cartItems[partyId] > 0) {
                descountStockParty(party.id, cartItems[partyId]);
            }
        }
        if (!isValidCVV(cvv) ||  !isValidCardNumber(cardNumber)) {
            alert('datos invalidos, ingreselos correctamente');
            return; // No continuar con la compra si el CVV no es válido
        }
        else{
            setFullName('');
            setemail('');
            setadress('');
            setcity('');
            setstate('');
            setcode('');
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
            <div className="billing-address">
                <h3 className="title">Billing Address</h3>
                <div className="input-box">
                    <span>Full Name:</span>
                    <input type="text" name="full-name" placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div className="input-box">
                    <span>Email:</span>
                    <input type="email" name="email" placeholder="example@example.com" value={email} onChange={(e) => setemail(e.target.value)}/>
                </div>
                <div className="input-box">
                    <span>Address:</span>
                    <input type="text" name="address" placeholder="Room - Street - Locality" value={adress} onChange={(e) => setadress(e.target.value)}/>
                </div>
                <div className="input-box">
                    <span>City:</span>
                    <input type="text" name="city" placeholder="Mumbai" value={city} onChange={(e) => setcity(e.target.value)}/>
                </div>
                <div className="flex">
                    <div className="input-box">
                        <span>State:</span>
                        <input type="text" name="state" placeholder="India" value={state} onChange={(e) => setstate(e.target.value)}/>
                    </div>
                    <div className="input-box">
                        <span>Zip Code:</span>
                        <input type="text" name="zip-code" placeholder="123456" value={code} onChange={(e) => setcode(e.target.value)}/>
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
                                    Remove
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