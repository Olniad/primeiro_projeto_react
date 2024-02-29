import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Catalogo from './catalogo';
import Form from './form';
import Header from './header';
import ImgComponent from './imgComponent';
import axios from 'axios';


function ListarFios(){
  const [fios, setFios] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/fios`).then(res => {
      console.log(res);
      setFios(res.data.fios);
    });
  }, []);

  const ListarFios = fios.map((item, index) => (
    <tr key={index}>
      <td>{item.titulo}</td>
      <td>{item.comentario}</td>
      <td>{item.imagem}</td>
      <td>
        <button className='btn_apagar'>Apagar</button>
      </td>
    </tr>
  ));

  return (
    <div>
      <Header />
      <h1>/B/ - Conteúdo aleatório.</h1>
      <ImgComponent />
      <Form setFios={setFios} />
      <hr />
      <Catalogo fios={fios} />
      <div className='ListarFios'> 
        <table>
          <tbody>
            {ListarFios}
          </tbody>
        </table>
        {fios.map((fio) => (
          <li key={fio.id}>
          </li>
        ))}  
      </div>
      <hr />
    </div>
  );
}

export default ListarFios;
