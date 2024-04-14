import React from 'react';
import './Hero.css';
import heroImage from '../Assets/hero.avif';

const Hero = () => {
    return (
        <div className="hero">
            <div className="hero-content">
                <h2>Descubre los mejores eventos</h2>
                <p>Compra tus entradas ahora y no te pierdas ninguna experiencia inolvidable</p>
            </div>
            <div className="card-container">
                <div className="card">
                    <img src={heroImage} className="card-img-top" alt="card" />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
                <div className="card">
                    <img src={heroImage} className="card-img-top" alt="card" />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;