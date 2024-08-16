import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  useEffect(() => {
    fetchFios(); // Fetch initial data
  }, []);

  return (
    <div className='fios-container'>
      {fios.map((item, index) => (
        <div key={index} className='fio-item'>
          <div className='fio-image'>
            <a href={`/detalhes/${item.imagem}`}>
              <img src={`http://localhost:8000/${item.imagem}`} alt={item.titulo} />
            </a>
          </div>
          <div className='fio-info'>
            <h2>{item.titulo}</h2>
            <p>{item.comentario}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListarFios;
