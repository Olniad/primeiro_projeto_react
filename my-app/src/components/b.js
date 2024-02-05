import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Header from './header';
import ImgComponent from './imgComponent';
import Form from './form';
import Catalogo from './catalogo';

export default function B() {
  const [fios, setFios] = useState([]);

  useEffect(() => {
    const fetchFios = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/list');
        const data = await response.json();
        setFios(data);
      } catch (error) {
        console.error('Erro ao buscar fios:', error);
      }
    };

    fetchFios();
  }, []); 

  return (
    <div>
      <Header />
      <h1>/B/ - Conteúdo aleatório.</h1>
      <ImgComponent />
      <Form setFios={setFios} /> 
      <hr />
      <Routes>
        <Route path="/catalogo" element={<Catalogo />} />
      </Routes>
      <Catalogo fios={fios} /> 
      <ul>
        {fios.map((fio) => (
          <li key={fio.id}>
            <Link to={`/catalogo/${fio.id}`}>{fio.titulo}</Link>
          </li>
        ))}
      </ul>
      <hr />
    </div>
  );
}
