import React, { useState } from "react";
import "./Checkout.css";
import paypal from "../Assets/card_img.png";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTotalCartAmount,
  selectDiscount,
  removeFromCart,
  removeAllFromCart,
  selectCartItems,
  createOrderAsync,
} from "../../ReduxToolkit/cartSlice";
import {
  selectAllParties,
  descountStockParty,
} from "../../ReduxToolkit/partySlice";
import { Navigate, useNavigate } from "react-router-dom";

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const discountApplied = useSelector(selectDiscount);
  const totalAmount = useSelector(selectTotalCartAmount);
  const dispatch = useDispatch();
  const allParties = useSelector(selectAllParties);
  const navigate = useNavigate();

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
    const isValidEmail = /\S+@\S+\.\S+/.test(value);
    if (!isValidEmail) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
    setEmail(value);
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.slice(0, 16);
    setCardNumber(value);
  };

  const handleExpirationDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.slice(0, 6);
    const formattedValue = value.replace(/(\d{2})(\d{0,4})/, "$1/$2");
    setExpirationDate(formattedValue);
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    const maxLength = cardNumber.startsWith("3") ? 4 : 3;
    setCvv(value.slice(0, maxLength));
  };

  const handleRemoveFromCart = (partyId) => {
    dispatch(removeFromCart(partyId));
  };

  const handleDescountStock = () => {
    const orderData = {
      email: email,
      fiestas: cartItems.map((item) => ({
        name: allParties.find((party) => party.id === item.id).name,
        cantidadEntradas: item.cantidad,
      })),

      descuento: totalAmount * discountApplied,
    };

    for (const partyId in cartItems) {
      const party = allParties.find((party) => party.id === parseInt(partyId));
      if (party && cartItems[partyId] > 0) {
        descountStockParty(party.id, cartItems[partyId]);
      }
    }

    if (!isValidCVV(cvv) || !isValidCardNumber(cardNumber) || emailError) {
      alert("Invalid data, please enter them correctly");
      return;
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

    dispatch(createOrderAsync(orderData));
  };

  const handleRemoveAllCart = () => {
    dispatch(removeAllFromCart());
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
        <h3 className="title">Datos de Pago</h3>
        <div className="input-box">
          <span>Nombre Completo:</span>
          <input
            type="text"
            name="full-name"
            placeholder="Carlitos Tevez"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="input-box">
          <span>Email:</span>
          <input
            type="email"
            name="email"
            placeholder="ejemplo@ejemplo.com"
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && <p className="error-message">{emailError}</p>}
        </div>
        <div className="input-box">
          <span>Dirección:</span>
          <input
            type="text"
            name="address"
            placeholder="Av. Libertador 1330"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="input-box">
          <span>Ciudad:</span>
          <input
            type="text"
            name="city"
            placeholder="Buenos Aires"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="flex">
          <div className="input-box">
            <span>Barrio:</span>
            <input
              type="text"
              name="state"
              placeholder="Caballito"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div className="input-box">
            <span>Código Postal:</span>
            <input
              type="text"
              name="zip-code"
              placeholder="1424"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="payment-details">
        <h3 className="title">Pago</h3>

        <div className="inputBox">
          <span>Tarjetas que aceptamos:</span>
          <img src={paypal} alt="paypal" />
        </div>
        <div className="input-box">
          <span>Número de Tarjeta:</span>
          <input
            type="text"
            name="card-number"
            placeholder="1111-2222-3333-4444"
            value={cardNumber}
            onChange={handleCardNumberChange}
          />
        </div>
        <div className="input-box">
          <span>Fecha de Vencimiento:</span>
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
        {cartItems.length > 0 ? (
          cartItems.map((item) => {
            const party = allParties.find((party) => party.id === item.id);
            if (party) {
              return (
                <div className="checkout-parties-item" key={party.id}>
                  <p>{party.name}</p>
                  <p>Cantidad: {item.cantidad}</p>
                  <p>Total: ${party.price * item.cantidad}</p>
                  <button onClick={() => handleRemoveFromCart(party.id)}>
                    Quitar
                  </button>
                </div>
              );
            }
            return null;
          })
        ) : (
          <p>Ya no hay items en tu carrito</p>
        )}
      </div>
      <div className="checkout-total">
        <p>Subtotal: ${totalAmount}</p>
        <p>Evío: Gratis</p>
        <p>Total: ${totalAmount}</p>
        <button onClick={() => handleDescountStock()}>CONFIRMAR COMPRA</button>
      </div>

      {showSuccessMessage && (
        <div className="success-message">
          <h2>COMPRA EXITOSA!</h2>
          <p>Vas a estar recibiendo tu orden por mail.</p>
        </div>
      )}
    </div>
  );
};

export default Checkout;
