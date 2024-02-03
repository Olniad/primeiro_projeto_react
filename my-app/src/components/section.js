import {Link} from 'react-router-dom';
export default function Section() {
  return(
    <header>
    <div className="boards">
      <fieldset>
        <legend>
          Kchan
        </legend>
        <ul>
          <li>
            <Link to="#">
            <a href="#">
              regras
            </a>
            </Link>
          </li>
        </ul>
      </fieldset>
      <fieldset>
        <legend>
          Anões
        </legend>
        <ul>
          <li>
          <Link to="b">
            <a href="B.html">
              b
            </a>
            </Link>
          </li>
        </ul>
      </fieldset>
      <fieldset>
        <legend>
          Desenvolvimento Pessoal e Saúde.
        </legend>
        <ul>
          <li>
          <Link to="/psico">
            <a href="psico.html">
              psico
            </a>
            </Link>
          </li>
          <li>
          <Link to="fitness">
            <a href="fitness.html">
              fitness
            </a>    
            </Link>  
          </li>
        </ul>
      </fieldset>
      <fieldset>
        <legend>
          Informática
        </legend>
        <ul>
          <li>
          <Link to="/pirataria">
            <a href="pirataria.html">
              pirataria
            </a>
            </Link>
          </li>
          <li>
            <Link to="programacao">
            <a href="programacao.html">
            programação
            </a>
            </Link>
          </li>
        </ul>
      </fieldset>
      <fieldset>
        <legend>
          outros
        </legend>
        <ul>
          <li>
            <Link to="pron">
            <a href="pron">
              pron
            </a>
            </Link>
          </li>
        </ul>
      </fieldset>
    </div>
  </header>
  );
}