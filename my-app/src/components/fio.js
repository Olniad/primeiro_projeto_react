import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Catalogo from './catalogo';
import Form from './form';
import Header from './header';
import ImgComponent from './imgComponent';

function ListarFios() {
  const [fios, setFios] = useState([]);

  const fetchFios = () => {
    axios.get(`http://localhost:8000/api/fios`).then(res => {
      console.log(res);
      setFios(res.data.fios);
    });
  };

  useEffect(() => {
    fetchFios(); // Fetch initial data

    const interval = setInterval(() => {
      fetchFios(); // atualizar pagina
    }, 5000); // ajustar intervalo do f5

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);


  const ListarFios = fios.map((item, index) => (
    <li key={index}>
      <h3>{item.titulo}</h3>
      <p>{item.comentario}</p>
      <a href={`/detalhes/${item.imagem}`}>
        <img src={`http://localhost:8000/${item.imagem}`} alt={item.titulo} />
      </a>
      <button className='btn_apagar'>Apagar</button>
    </li>
  ));

  return (
    <div>
      <meta name="csrf-token" content="{{ csrf_token() }}"></meta>
      <Header />
      <h1>/B/ - Conteúdo aleatório.</h1>
      <ImgComponent />
      <Form setFios={setFios} />
      <hr />
      <Catalogo fios={fios} />
      <div className='ListarFios'>
        <ul>
          {ListarFios}
        </ul>
      </div>
      <hr />
    </div>
  );
}

export default ListarFios;