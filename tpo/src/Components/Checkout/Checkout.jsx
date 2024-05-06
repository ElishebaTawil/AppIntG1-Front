import React, { useContext, useState } from "react";
import { ShopContext } from "../../Context/ShopContext";
import "./Checkout.css";
import trash from "../Assets/trash.png";
import paypal from "../Assets/card_img.png";

const Checkout = () => {
  const {
    cartItems,
    allParties,
    getTotalCartAmount,
    removeFromCart,
    descountStockParty,
    removeAllFromCart,
  } = useContext(ShopContext);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(""); // New state for email error message
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [code, setCode] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    // Validate email format
    const isValidEmail = /\S+@\S+\.\S+/.test(value);
    if (!isValidEmail) {
      // Display error message if email is not valid
      setEmailError("Invalid email address");
    } else {
      setEmailError(""); // Clear error message if email is valid
    }
    setEmail(value);
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    value = value.slice(0, 16); // Limit to 16 characters
    setCardNumber(value);
  };

  const handleExpirationDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    value = value.slice(0, 6); // Limit to 6 characters (MMYYYY)
    const formattedValue = value.replace(/(\d{2})(\d{0,4})/, "$1/$2"); // Format as MM/YYYY
    setExpirationDate(formattedValue);
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    const maxLength = cardNumber.startsWith("3") ? 4 : 3; // Set max length based on card type
    setCvv(value.slice(0, maxLength)); // Limit to maxLength characters
  };

  const handleRemoveFromCart = (partyId) => {
    // Implement the logic to remove an item from the cart
    removeFromCart(partyId);
  };
  const handleDescountStock = () => {
    for (const partyId in cartItems) {
      const party = allParties.find((party) => party.id === parseInt(partyId));
      if (party && cartItems[partyId] > 0) {
        descountStockParty(party.id, cartItems[partyId]);
      }
    }
    if (!isValidCVV(cvv) || !isValidCardNumber(cardNumber) || emailError) {
      alert("Invalid data, please enter them correctly");
      return; // Stop the purchase process if the data is invalid
    } else {
      setFullName("");
      setEmail("");
      setAddress("");
      setCity("");
      setState("");
      setCode("");
      setCardNumber("");
      setExpirationDate("");
      setCvv("");
      handleRemoveAllCart();
      setShowSuccessMessage(true);
    }
  };
  const handleRemoveAllCart = () => {
    removeAllFromCart();
  };

  const isValidCVV = (cvv) => {
    return /^\d{3}$/.test(cvv);
  };
  const isValidString = (value) => {
    return typeof value === "string" && value.trim() !== "";
  };
  const isValidCardNumber = (cardNumber) => {
    return /^\d{16}$/.test(cardNumber);
  };

  return (
    <div className="checkout-container">
      <div className="billing-address">
        <h3 className="title">Billing Address</h3>
        <div className="input-box">
          <span>Full Name:</span>
          <input
            type="text"
            name="full-name"
            placeholder="John Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="input-box">
          <span>Email:</span>
          <input
            type="email"
            name="email"
            placeholder="example@example.com"
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && <p className="error-message">{emailError}</p>} {/* Display error message */}
        </div>
        <div className="input-box">
          <span>Address:</span>
          <input
            type="text"
            name="address"
            placeholder="Room - Street - Locality"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="input-box">
          <span>City:</span>
          <input
            type="text"
            name="city"
            placeholder="Mumbai"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="flex">
          <div className="input-box">
            <span>State:</span>
            <input
              type="text"
              name="state"
              placeholder="India"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div className="input-box">
            <span>Zip Code:</span>
            <input
              type="text"
              name="zip-code"
              placeholder="123456"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="payment-details">
        <h3 className="title">Payment</h3>

        <div class="inputBox">
          <span>cards accepted :</span>
          <img src={paypal} alt="" />
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
        <h3>Summary:</h3>
        {Object.keys(cartItems).map((partyId) => {
          const party = allParties.find(
            (party) => party.id === parseInt(partyId)
          );
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
      <div className="checkout-total">
        <p>Subtotal: ${getTotalCartAmount()}</p>
        <p>Shipping: Free</p>
        <p>Total: ${getTotalCartAmount()}</p>
        <button onClick={() => handleDescountStock()}>Purchase</button>
      </div>

      {showSuccessMessage && (
        <div className="success-message">
          <h2>Successful purchase!</h2>
          <p>You will receive the QR codes for the tickets by email</p>
        </div>
      )}
    </div>
  );
};

export default Checkout;