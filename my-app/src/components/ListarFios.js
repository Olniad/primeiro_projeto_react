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
    if (text.startsWith('>')) {
      return <span className='text-green'>{text}</span>;
    } else if (text.startsWith('<')) {
      return <span className='text-red'>{text}</span>;
    } else {
      return <span>{text}</span>;
    }
  };

  const isVideo = (filename) => {
    // verifica se a extensão do arquivo é de vídeo
    return filename.endsWith('.mp4');
  };

  const isGif = (filename) => {
    // verifica se a extensão do arquivo é GIF
    return filename.endsWith('.gif');
  };

  const isImage = (filename) => {
    // verifica se a extensão do arquivo é uma imagem
    return /\.(jpg|jpeg|png|gif)$/i.test(filename);
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
              {isVideo(item.imagem) ? (
                <video width="320" height="240" controls>
                  <source src={`http://localhost:8000/${item.imagem}`} type="video/mp4" />
                  Seu navegador não suporta o elemento de vídeo.
                </video>
              ) : isGif(item.imagem) ? (
                <img src={`http://localhost:8000/${item.imagem}`} alt={item.titulo} />
              ) : isImage(item.imagem) ? (
                <img src={`http://localhost:8000/${item.imagem}`} alt={item.titulo} />
              ) : (
                <div>Formato de mídia não suportado</div>
              )}
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
