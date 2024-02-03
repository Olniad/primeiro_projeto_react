import React from 'react';
import { Link } from 'react-router-dom';
export default function Catalogo() {
  return (
    <div className='boardlist'>
    <Link to="/catalogo">
      <a href="#">
        <i title="B" style={{ fontSize: '80%' }}></i>
        [Catálogo]
      </a>
    </Link>
    </div>
  );
}
