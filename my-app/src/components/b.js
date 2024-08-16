import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Catalogo from './catalogo';
import Form from './form';
import Header from './header';
import ImgComponent from './imgComponent';
import Popup from './Popup';

function ListarFios() {
  const [fios, setFios] = useState([]);
  const [selectedFio, setSelectedFio] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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

  const openPopup = (fio) => {
    console.log('Popup opened with fio:', fio); // Debug log
    setSelectedFio(fio);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    console.log('Popup closed'); // Debug log
    setIsPopupOpen(false);
    setSelectedFio(null);
  };

  const handleDelete = (id, senha) => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  
    axios.delete(`http://localhost:8000/api/fios/${id}/apagar`, {
      headers: {
        'X-CSRF-TOKEN': csrfToken
      },
      data: { senha }  // Passando a senha junto com o ID
    })
    .then(res => {
      if (res.status === 200) {
        setFios(fios.filter(fio => fio.id !== id)); // Remove o fio da lista
        setIsPopupOpen(false); // Fecha a popup após a exclusão
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
      <button className='btn_apagar' onClick={() => openPopup(item)}>Apagar</button>
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
            {fios.length > 0 ? (
                <ul>
                    {ListarFios}
                </ul>
            ) : (
                <p>Nenhum fio disponível para exibir.</p>
            )}
        </div>
        {isPopupOpen && selectedFio && (
            <Popup item={selectedFio} onClose={closePopup} />
        )}
    </div>
);
}

export default ListarFios;
