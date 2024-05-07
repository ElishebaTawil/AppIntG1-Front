import React, { useState } from 'react';
import './Contactos.css'; // Asegúrate de que este archivo CSS existe y está en el directorio correcto

function Contactos() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [enviado, setEnviado] = useState(false);  // Nuevo estado para manejar la confirmación de envío

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Enviando formulario', { nombre, email, mensaje });
    setNombre('');  
    setEmail('');   
    setMensaje(''); 
    setEnviado(true); // Establece el estado de enviado a true
    setTimeout(() => setEnviado(false), 5000); // Establece el estado de enviado a false después de 5 segundos
  };

  return (
    <div>
      {enviado && <p className="mensaje-enviado">Formulario enviado correctamente!</p>}
      <form onSubmit={handleSubmit} className="formulario">
        <div className="input-container">
          <label>Nombre:</label>
          <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
        </div>
        <div className="input-container">
          <label>Email:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="input-container">
          <label>Mensaje:</label>
          <textarea value={mensaje} onChange={e => setMensaje(e.target.value)} />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Contactos;

