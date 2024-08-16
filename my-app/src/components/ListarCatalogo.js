import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Catalogo from './catalogo';
import Form from './form';
import Header from './header';
import ImgComponent from './imgComponent';
import Popup from './Popup';
import Navbar from './navbar'
import ListarFios from './ListarFios';

export default function ListarCatalogo() {
    const [show, setShow] = useState(false);

    const onShowClick = () => {
        setShow(prevShow => !prevShow);
    };

    return (
        <div>
            <meta name="csrf-token" content="{{ csrf_token() }}"></meta>
            <Header />
            <h1>Catálogo.</h1>
            <button className='btn-criar-thread' onClick={onShowClick}>
                {show ? 'Ocultar' : 'Criar nova Thread.'}
            </button>
            {show && <Form />}
            <div className='ListarFios'>
                <ListarFios />
            </div>
            <Navbar />
        </div>
    );
}
