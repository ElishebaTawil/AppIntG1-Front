import React from 'react';
import './Footer.css';
import footer_logo from '../Assets/partylogo.avif';
import instagram_icon from '../Assets/instagram_icon.jpg';
import pinterest_icon from '../Assets/pinterest_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';

const Footer = () => {
    return (
        <div className='footer'>
            <div className='footer-logo'>
                <img src={footer_logo} alt="Footer Logo" />
                <p>SHOPPER</p>
            </div>
            
            <div className='footer-social-icon'>
                <div className='footer-icons-container'>
                    <img src={instagram_icon} alt="Instagram Icon" />
                </div>
                <div className='footer-icons-container'>
                    <img src={pinterest_icon} alt="Pinterest Icon" />
                </div>
                <div className='footer-icons-container'>
                    <img src={whatsapp_icon} alt="WhatsApp Icon" />
                </div>
            </div>
            <div className='footer-copyright'>
                <hr />
                <p>Copyright @2024 - Todos Los Derechos Reservados</p>
                <p>TP APIS Integrantes</p>
                <p>Maximo Rosso - Elisheba Tawil - Tadeo Pinque - Sebastian Sosa - Maurico Huentelaf  </p>
                
            </div>
        </div>
    );
}

export default Footer;