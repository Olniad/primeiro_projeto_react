import React, { useState } from 'react';
import axios from 'axios';

function Form({ setFios, resetForm }) {
  const [titulo, setTitulo] = useState('');
  const [comentario, setComentario] = useState('');
  const [imagem, setImagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8000/api/fios', { titulo, comentario, imagem });
    setFios(prev => [...prev, { titulo, comentario, imagem }]); // atualizar o estado com o novo fio
    resetForm(); // limpar os campos do formulário
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Título" required />
      <input value={comentario} onChange={(e) => setComentario(e.target.value)} placeholder="Comentário" required />
      <input value={imagem} onChange={(e) => setImagem(e.target.value)} placeholder="URL da Imagem" required />
      <button type="submit">Adicionar</button>
    </form>
  );
}

export default Form;
