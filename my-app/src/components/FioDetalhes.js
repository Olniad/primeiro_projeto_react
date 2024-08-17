import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function FioDetalhes() {
  const { id } = useParams(); // obtendo o ID da URL
  const [fio, setFio] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/fios/${id}`).then(res => {
      setFio(res.data.fio);
    });
  }, [id]);

  if (!fio) return <div>Carregando...</div>;

  return (
    <div className='fio-detalhes'>
      <h2>{fio.titulo}</h2>
      <img src={`http://localhost:8000/${fio.imagem}`} alt={fio.titulo} />
      <p>{fio.comentario}</p>
    </div>
  );
}

export default FioDetalhes;
