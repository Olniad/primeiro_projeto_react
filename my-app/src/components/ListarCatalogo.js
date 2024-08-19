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
    const [fios, setFios] = useState([]);

    const onShowClick = () => {
        setShow(prevShow => !prevShow);
    };

    const fetchFios = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/fios'); // Ajuste a URL conforme necessário
            setFios(response.data.fios || []);
            console.log("Fetched fios:", response.data);
        } catch (error) {
            console.error("Error fetching fios:", error);
        }
    };
    useEffect(() => {
        fetchFios(); // Fetch initial data
    }, []);
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
            <Navbar onUpdate={fetchFios} />
        </div>
    );
}
/*import React, { useState } from 'react';
import Form from './form';
import Header from './header';
import ListarFios from './ListarFios';
import Navbar from './navbar';

export default function ListarCatalogo() {
    const [show, setShow] = useState(false);

    const onShowClick = () => {
        setShow(prevShow => !prevShow);
    };

    return (
        <div>
            <meta name="csrf-token" content={document.querySelector('meta[name="csrf-token"]').getAttribute('content')} />
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
*/ 
