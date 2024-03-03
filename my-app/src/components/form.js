import React, { useState } from 'react';

function CriarFio() {
  const [fios, setFios] = useState({
    titulo: '',
    comentario: '',
    imagem: null,
    senha: '',
  });
  
  
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFios((prevState) => ({
      ...prevState,
      [name]: value, 
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFios((prevState) => ({
      ...prevState,
      imagem: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log('Formulário enviado:', fios);
  };

  return (
    <div className="form-enviar">
      <form onSubmit={handleSubmit}>
        <label htmlFor="titulo">Título</label>
        <input type="text" id="titulo" name="titulo" value={fios.titulo} onChange={handleInput} />

        <label htmlFor="comentario">Comentário</label>
        <input type="text" id="comentario" name="comentario" value={fios.comentario} onChange={handleInput} />

        <label htmlFor="imagem">Selecionar Imagem</label>
        <input type="file" id="imagem" name="imagem" onChange={handleFileChange} />

        <label htmlFor="senha">Senha</label>
        <input type="password" id="senha" name="senha" value={fios.senha} onChange={handleInput} />
        
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default CriarFio;
