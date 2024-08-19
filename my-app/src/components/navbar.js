// Navbar.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Navbar({ onUpdate }) {
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (isUpdating) {
      const interval = setInterval(() => {
        onUpdate(); // Chama a função de atualização passada como prop
      }, 5000); // Intervalo de 5 segundos

      return () => clearInterval(interval); // Limpar intervalo ao desmontar
    }
  }, [isUpdating, onUpdate]);

  return (
    <div className='navbar_catalogo'>
      <input 
        type="checkbox" 
        id="atualizarpag" 
        checked={isUpdating} 
        onChange={() => setIsUpdating(prev => !prev)}
      />
      <label htmlFor="atualizarpag">Atualizar fios.</label>
      <Link to="/ListarCatalogo">
        <a href="/ListarCatalogo" title="Catálogo" className="fas fa-th"></a>
        [Catálogo]
      </Link>
    </div>
  );
}
