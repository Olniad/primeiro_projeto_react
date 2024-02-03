
export default function Form(){
return(
<div className="form-enviar">
  <form >
    <label>Título</label>
    <input type="text"></input>
    <label>Comentário</label>
    <input type="text"></input>
    <label>Selecionar</label>
    <input type="file" accept="image/png, image/jpeg"></input>
    <label>Senha</label>
    <input type="password"></input>
    <input type="button" value="Enviar"></input>
  </form>
</div>
);
}