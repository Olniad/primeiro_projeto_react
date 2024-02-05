
import React, { useState } from 'react';
export default function Form({ setFios }) {
  const [titulo, setTitulo] = useState('');
  const [comentario, setComentario] = useState('');
  const [imagem, setImagem] = useState(null);
  const [senha, setSenha] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImagem(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('comentario', comentario);
    formData.append('imagem', imagem);
    formData.append('senha', senha);

    try {
      const response = await fetch('http://localhost:8000/api/cadastrar-fio', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Limpar os campos do formulário após o sucesso
        setTitulo('');
        setComentario('');
        setImagem(null);
        setSenha('');

        console.log('Fio cadastrado com sucesso!');

        // Atualizar a lista de fios
        const responseList = await fetch('http://localhost:8000/api/list');
        const data = await responseList.json();
        setFios(data);
      } else {
        console.error('Falha ao cadastrar fio:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao enviar solicitação:', error);
    }
  };

return(
<div className="form-enviar">
      <form onSubmit={handleSubmit}>
        <label>Título</label>
        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />

        <label>Comentário</label>
        <input type="text" value={comentario} onChange={(e) => setComentario(e.target.value)} />

        <label>Selecionar</label>
        <input type="file" accept="image/png, image/jpeg" onChange={handleFileChange} />

        <label>Senha</label>
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />

        <input type="submit" value="Enviar" />
      </form>
    </div>
);
}