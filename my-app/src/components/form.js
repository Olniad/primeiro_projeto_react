import axios from 'axios';
import React, { useState, useRef } from 'react';



function CriarFio() {

  const[InputerrorList, setInputerrorList] = useState();
  const [fios, setFios] = useState({
    titulo: '',
    comentario: '',
    imagem: null,
    senha: '',
  })
  
  const imagemInputRef = useRef(null); //criando ref para input da imagem

  const handleInput = (e) =>{
    e.persist();
    setFios({...fios, [e.target.name]: e.target.value});
  }
  
  /*const handleInput = (e) => {
    const { name, value } = e.target;
    setFios((prevState) => ({
      ...prevState,
      [name]: value, 
    }));
  };
  */
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

  const salvarFios = (e) =>{
    e.preventDefault();

    const data = new FormData();
  data.append('titulo', fios.titulo);
  data.append('comentario', fios.comentario);
  data.append('imagem', fios.imagem);
  data.append('senha', fios.senha);


   /* const data ={
      titulo: fios.titulo,
      comentario: fios.comentario,
      imagem: fios.imagem,
      senha: fios.senha,
    }*/

    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

    axios.post(`http://localhost:8000/api/fios/`, data)
    .then(res => {
      alert(res.data.message);

      //definir o que vai ser resetado apos o envio do form
      setFios({
        titulo:'',
        comentario:'',
        imagem: null,
        senha: '',
      });
      setInputerrorList([]);

      if(imagemInputRef.current){
        imagemInputRef.current.value='';
      }
    })
    .catch(error => {
      if (error.response) {
        if (error.response.status === 422) {
          setInputerrorList(error.response, data, error);
        }
        if (error.response.status === 500) {
          alert(error.response.data.message);
        }
      } else {
        console.error('Erro ao processar a requisição:', error);
      }
    });
};

  return (
    <div className="form-enviar">
      <form onSubmit={salvarFios} enctype="multipart/form-data">
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
