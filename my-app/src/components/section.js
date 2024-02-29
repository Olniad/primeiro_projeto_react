import { Link } from 'react-router-dom';

export default function Section() {
  return (
    <header>
      <div className="boards">
        <fieldset>
          <legend>Kchan</legend>
          <ul>
            <li>
              <Link to="#">regras</Link>
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Anões</legend>
          <ul>
            <li>
              <Link to="b">b</Link>
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Desenvolvimento Pessoal e Saúde.</legend>
          <ul>
            <li>
              <Link to="/psico">psico</Link>
            </li>
            <li>
              <Link to="fitness">fitness</Link>
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Informática</legend>
          <ul>
            <li>
              <Link to="/pirataria">pirataria</Link>
            </li>
            <li>
              <Link to="programacao">programação</Link>
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Outros</legend>
          <ul>
            <li>
              <Link to="pron">pron</Link>
            </li>
          </ul>
        </fieldset>
      </div>
    </header>
  );
}
