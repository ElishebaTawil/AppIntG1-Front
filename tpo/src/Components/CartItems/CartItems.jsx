import React from 'react';
import './CartItems.css';
import remove_icon from '../Assets/remove_icon.png';
import { connect } from 'react-redux';
import { eliminarDelCarrito } from '../../Redux/actions/cartActions';
import { Link } from 'react-router-dom';

const CartItems = ({ cartItems, allParties, removeFromCart, getTotalCartAmount }) => {
  return (
    <div className='cartitems'>
      <div className='cartitems-format-main'>
        <p>Productos</p>
        <p>Titulo</p>
        <p>Precio</p>
        <p>Cantidad</p>
        <p>Total</p>
        <p>Remover</p>
      </div>
      <hr />
      <div>
        {allParties.map((e) => {
          if (cartItems[e.id] > 0) {
            return (
              <div key={e.id}>
                <div className='cartitems-format cartitems-format-main'>
                  <img src={e.image} alt="" className='carticon-product-icon' />
                  <p>{e.name}</p>
                  <p>${e.new_price}</p>
                  <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                  <p>${e.new_price * cartItems[e.id]}</p>
                  <img className='cartitems-remove-icon' src={remove_icon} onClick={() => { eliminarDelCarrito(e.id) }} alt="" />
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
        <div className='cartitems-promocode'>
          <p>Si tienes un codigo de descuento, Agregalo aqui</p>
          <div className='cartitems-promobox'>
            <input type="text" placeholder='promo code' />
            <button>Aceptar</button>
          </div>
        </div>
        <div className='cartitems-down'>
          <div className='cartitems-total'>
            <h1>Total Carrito</h1>
            <div>
              <div className='cartitems-total-item'>
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className='cartitems-total-item'>
                <p>Impuestos</p>
                <p>Gratis</p>
              </div>
              <hr />
              <div className='cartitems-total-item'>
                <h3>Total</h3>
                <h3>${getTotalCartAmount()}</h3>
              </div>
            </div>
            <Link to='/payments'><button>PROCEDER CON LA COMPRA</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state.cart.items, // Suponiendo que tienes un reducer para el carrito en tu store de Redux
  allParties: state.allParties // Suponiendo que tienes un reducer para todas las fiestas en tu store de Redux
});

const mapDispatchToProps = {
    eliminarDelCarrito // Hace que la acción removeFromCart esté disponible como una propiedad en el componente
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItems);
