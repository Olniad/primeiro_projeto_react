import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Catalogo from './catalogo';
import Form from './form';
import Header from './header';
import ImgComponent from './imgComponent';
import Popup from './Popup';
import Navbar from './navbar';
import { Link } from 'react-router-dom';
function FioDetalhes() {
  const { id } = useParams(); // obtendo o ID da URL
  const [fio, setFio] = useState(null);
  const [show, setShow] = useState(false);

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

    const onShowClick = () => {
        setShow(prevShow => !prevShow);
    };

  useEffect(() => {
    axios.get(`http://localhost:8000/api/fios/${id}`).then(res => {
      setFio(res.data.fio);
    });
  }, [id]);

  if (!fio) return <div>Carregando...</div>;

  return (
    <div className='fio-detalhes'>
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <Header />
    <button className='btn-criar-thread' onClick={onShowClick}>
        {show ? 'Ocultar' : 'Responder Thread.'}
        </button>
        {show && <Form />}
      <h2>{colorizeText(fio.titulo)}</h2>
      <img src={`http://localhost:8000/${fio.imagem}`} alt={fio.titulo} />
      <p>{colorizeText(fio.comentario)}</p>
      <Navbar />
    </div>
  );
}

/*    <div>
      <meta name="csrf-token" content="{{ csrf_token() }}" />
      <Header />
      <h1>/B/ - Conteúdo aleatório.</h1>
      <ImgComponent />
      <Form setFios={setFios} />
      <hr />
      <Catalogo fios={fios} />
      <hr /> */
export default FioDetalhes;
