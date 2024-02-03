import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './header';
import ImgComponent from './imgComponent';
import Form from './form';
import Catalogo from './catalogo';

export default function B() {
  return (
    <div>
     <Header />
      <h1>/B/ - Conteúdo aleatório.</h1>
      <ImgComponent />
      <Form />
      <hr />
        <Routes>
          <Route path="/catalogo" element={<Catalogo />}/>
        </Routes>
      <Catalogo />
      <hr />
    </div>
  );
}
