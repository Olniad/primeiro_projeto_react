import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ListarFios() {
  const [fios, setFios] = useState([]);
  const [selectedFio, setSelectedFio] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const fetchFios = () => {
    axios.get(`http://localhost:8000/api/fios`).then(res => {
      console.log(res);
      setFios(res.data.fios);
    });
  };

  const colorizeText = (text) => {
    // Verifica se o texto começa com '>' ou '<'
    if (text.startsWith('>')) {
      return <span className='text-green'>{text}</span>;
    } else if (text.startsWith('<')) {
      return <span className='text-red'>{text}</span>;
    } else {
      return <span>{text}</span>;
    }
  };

  useEffect(() => {
    fetchFios(); // Fetch initial data
  }, []);

  return (
    <div className='fios-container'>
    {fios.map((item, index) => (
      <div key={index} className='fio-item'>
        <div className='fio-image'>
          <Link to={`/fios/${item.id}`}>
            <img src={`http://localhost:8000/${item.imagem}`} alt={item.titulo} />
          </Link>
        </div>
        <div className='fio-info'>
          <h2>{colorizeText(item.titulo)}</h2>
          <p>{colorizeText(item.comentario)}</p>
        </div>
      </div>
    ))}
  </div>
  );
}

export default ListarFios;
