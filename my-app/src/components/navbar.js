import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

//função para atualizar a pagina e retornar novos fios.
export default function Navbar() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [fios, setFios] = useState([]);

  // Função para buscar dados
  const fetchFios = () => {
    axios.get(`http://localhost:8000/api/fios`)
      .then(res => {
        console.log(res);
        setFios(res.data.fios);
      })
      .catch(error => {
        console.error('Error fetching fios:', error);
      });
  };

  useEffect(() => {
    if (isUpdating) {
      fetchFios(); // Buscar dados inicialmente

      const interval = setInterval(() => {
        fetchFios(); // Atualizar dados periodicamente
      }, 5000); // Intervalo de 5 segundos

      return () => clearInterval(interval); // Limpar intervalo ao desmontar
    }
  }, [isUpdating]);

  return (
    <div className='navbar_catalogo'>
  <input 
    type="checkbox" 
    id="atualizarpag" 
    checked={isUpdating} 
    onChange={() => setIsUpdating(prev => !prev)}
  />
  <label htmlFor="atualizarpag">Atualizar fios.</label>
  <Link to ="/ListarCatalogo">
    <a href="/ListarCatalogo" title="Catálogo" className="fas fa-th"></a>
    [Catálogo]
    </Link>
</div>

  );
}
