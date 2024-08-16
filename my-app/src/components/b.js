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

  const handleDelete = (id) => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  
    axios.delete(`http://localhost:8000/api/fios/${id}/apagar`, {
      headers: {
        'X-CSRF-TOKEN': csrfToken
      }
    })
    .then(res => {
      if (res.status === 200) {
        setFios(fios.filter(fio => fio.id !== id)); // Remove o fio da lista
      }
    })
    .catch(error => {
      console.error('Erro ao deletar o fio:', error);
    });
  };

  const ListarFios = fios.map((item, index) => (
    <tr key={index}>
      <td>{item.titulo}</td>
      <td>{item.comentario}</td>
      <td>
      <a href={`/detalhes/${item.imagem}`}>
        <img src={`http://localhost:8000/${item.imagem}`} alt={item.titulo} style={{ width: '500px' }} />
        </a>
      </td>
      <td>
      <button className='btn_apagar' onClick={() => handleDelete(item.id)}>Apagar</button>
      </td>
      <hr className='separador'></hr>
    </tr>
    
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
      <hr />
      <div className='ListarFios'>
        <ul>
          {ListarFios}
        </ul>
      </div>
      
    </div>
  );
}

export default ListarFios;
