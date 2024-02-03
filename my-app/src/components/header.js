import {Link} from 'react-router-dom';
export default function Header() {
  return(
<div className="boardlist">
    <span>
      [ 
        <Link to="/procurar">
    <a href="#">
      <i title="Procurar" style={{fontSize: '80%'}}></i>
      procurar
    </a>
    </Link>
    /
    <Link to="/ban">
    <a href="bans.html">
      banlist
      </a>
      </Link>
      ]
      </span>
      <span>
      [ 
        <Link to="/b">
    <a href="#">
      <i title="B" style={{fontSize: '80%'}}></i>
      b
    </a>
    </Link>
      ]
      </span>
      <span>
      [ 
        <Link to="/psico">
    <a href="#psico">
      <i title="psico" style={{fontSize: '80%'}}></i>
      psico
    </a>
    </Link>
    /
    <Link to="/fitness">
    <a href="fitness.html">
      fitness
      </a>
      </Link>
      ]
      </span>
      <span>
      [ 
        <Link to="/pirataria">
    <a href="pirataria.html">
      <i title="Pirataria" style={{fontSize: '80%'}}></i>
      pirataria
    </a>
    </Link>
    /
    <Link to="programacao">
    <a href="programacao.html">
      programação
      </a>
      </Link>
      ]
      </span>
      <span>
      [ 
        <Link to="pron">
    <a href="pron">
      <i title="pron" style={{fontSize: '80%'}}></i>
      pron
    </a>
    </Link>
      ]
      </span>
  </div>
  )
}

