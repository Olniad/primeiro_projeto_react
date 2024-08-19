import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Catalogo from './catalogo';
import Form from './form';
import Header from './header';
import ImgComponent from './imgComponent';
import Popup from './Popup';
import Navbar from './navbar';
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
    // verificando se a extensão do arquivo é de vídeo
    return filename.endsWith('.mp4');
  };

  const isGif = (filename) => {
    // verificando se a extensão do arquivo é GIF
    return filename.endsWith('.gif');
  };

  useEffect(() => {
    fetchFios(); // Fetch initial data
  }, []);

  const openPopup = (fio) => {
    console.log('Popup opened with fio:', fio); // Debug log
    setSelectedFio(fio);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    console.log('Popup closed'); // Debug log
    setIsPopupOpen(false);
    setSelectedFio(null);
  };

  const handleDelete = (id, senha) => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  
    axios.delete(`http://localhost:8000/api/fios/${id}/apagar`, {
      headers: {
        'X-CSRF-TOKEN': csrfToken
      },
      data: { senha }  // passando a senha junto com o ID
    })
    .then(res => {
      if (res.status === 200) {
        setFios(fios.filter(fio => fio.id !== id)); // remove o fio da lista
        setIsPopupOpen(false); // fecha a popup após a exclusão
      }
    })
    .catch(error => {
      console.error('Erro ao deletar o fio:', error);
    });
  };

  return (
    <div>
      <meta name="csrf-token" content="{{ csrf_token() }}" />
      <Header />
      <h1>/B/ - Conteúdo aleatório.</h1>
      <ImgComponent />
      <Form setFios={setFios} />
      <hr />
      <Catalogo fios={fios} />
      <hr />

      <div className='b-ListarFios'>
        {fios.length > 0 ? (
          fios.map((item, index) => (
            <ul key={index}>
              <li>
                <Link to={`/fios/${item.id}`}>
                  {isVideo(item.imagem) ? (
                    <video width="320" height="240" controls>
                      <source src={`http://localhost:8000/${item.imagem}`} type="video/mp4" />
                      Seu navegador não suporta o elemento de vídeo.
                    </video>
                  ) : isGif(item.imagem) ? (
                    <img src={`http://localhost:8000/${item.imagem}`} alt={item.titulo} />
                  ) : (
                    <img src={`http://localhost:8000/${item.imagem}`} alt={item.titulo} />
                  )}
                </Link>
                <div className='fio-info'>
                  <h2>{colorizeText(item.titulo)}</h2>
                  <p>{colorizeText(item.comentario)}</p>
                  <br></br>
                  <button className='btn_apagar' onClick={() => openPopup(item)}>Apagar</button>
                </div>
              </li>
            </ul>
          ))
        ) : (
          <p>Nenhum fio disponível para exibir.</p>
        )}
      </div>

      {isPopupOpen && selectedFio && (
        <Popup item={selectedFio} onClose={closePopup} />
      )}

 <Navbar onUpdate={fetchFios} />
    </div>
  );
}

export default ListarFios;
