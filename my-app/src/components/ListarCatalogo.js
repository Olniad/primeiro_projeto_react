import React, { useState } from 'react';
import ListarFios from './ListarFios';
import Header from './header'; 
import ImgComponent from './imgComponent'; 
import Form from './form'; 
import Catalogo from './catalogo'; 
import Popup from './Popup'; 
import Navbar from './navbar'; 

export default function ListarCatalogo() {
    return (
        <div>
            <meta name="csrf-token" content="{{ csrf_token() }}"></meta>
            <Header />
            <h1>Catálogo.</h1>
            <ImgComponent />
            <Form />
            <Catalogo />
            <hr />
            <div className='ListarFios'>
                <ListarFios />
            </div>
            <Navbar />
        </div>
    );
}

