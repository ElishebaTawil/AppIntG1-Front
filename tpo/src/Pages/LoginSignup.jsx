import React from 'react';
import './CSS/LoginSignup.css';

const LoginSignup = () => {
    return ( 
        <div className='loginsignup'>
            <div className='loginsignup-container'>
                <h1>Registrate</h1>
                <div className='loginsignup-fields'>
                    <input type="text" placeholder='Tu Nombre' />
                    <input type="email" placeholder='Tu Email' />
                    <input type="password" placeholder='Tu Contraseña' />
                </div>
                <button>Continuar</button>
                <p className='loginsignup-login'>Ya tienes una cuenta? <span>Inicia Sesion</span></p>
                <div className='loginsignup-agree'>
                    <input type="checkbox" name='' id='' />
                    <p>Al registrarte aceptas nuestros <span>Terminos y Condiciones</span> y <span>Politica de Privacidad</span></p>
                </div>
            </div>
        </div>
     );
}

export default LoginSignup;