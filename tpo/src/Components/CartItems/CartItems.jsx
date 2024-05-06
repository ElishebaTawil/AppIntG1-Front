import React, { useContext } from "react";
import "./CartItems.css";
import remove_icon from "../Assets/remove_icon.png";
import { Link } from "react-router-dom";

import { ShopContext } from "../../Context/ShopContext";
const CartItems = () => {
  const { getTotalCartAmount, cartItems, removeFromCart } =
    useContext(ShopContext);

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Productos</p>
        <p>Titulo</p>
        <p>Precio</p>
        <p>Cantidad</p>
        <p>Total</p>
        <p>Remover</p>
      </div>
      <hr />
      <div>
        {cartItems.map((item) => {
          return (
            <div>
              <div className="cartitems-format cartitems-format-main">
                <img
                  src={item.image}
                  alt=""
                  className="carticon-product-icon"
                />
                <p>{item.name}</p>
                <p>${item.new_price}</p>
                <button className="cartitems-quantity">{item.cantidad}</button>
                <p>${item.new_price * item.cantidad}</p>
                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  onClick={() => {
                    removeFromCart(item.id);
                  }}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        })}
        <div className="cartitems-promocode">
          <p>Si tienes un codigo de descuento, Agregalo aqui</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="promo code" />
            <button>Aceptar</button>
          </div>
        </div>
        <div className="cartitems-down">
          <div className="cartitems-total">
            <h1>Total Carrito</h1>
            <div>
              <div className="cartitems-total-item">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <p>Impuestos</p>
                <p>Gratis</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <h3>Total</h3>
                <h3>${getTotalCartAmount()}</h3>
              </div>
            </div>
            <Link to="/payments">
              <button>PROCEDER CON LA COMPRA</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
