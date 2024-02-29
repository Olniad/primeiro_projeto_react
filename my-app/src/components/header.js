import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className="boardlist">
      <span>
        [ 
          <Link to="/procurar">
            <i title="Procurar" style={{fontSize: '80%'}}></i>
            procurar
          </Link>
          /
          <Link to="/ban">
            banlist
          </Link>
        ]
      </span>
      <span>
        [ 
          <Link to="/b">
            <i title="B" style={{fontSize: '80%'}}></i>
            b
          </Link>
        ]
      </span>
      <span>
        [ 
          <Link to="/psico">
            <i title="psico" style={{fontSize: '80%'}}></i>
            psico
          </Link>
          /
          <Link to="/fitness">
            fitness
          </Link>
        ]
      </span>
      <span>
        [ 
          <Link to="/pirataria">
            <i title="Pirataria" style={{fontSize: '80%'}}></i>
            pirataria
          </Link>
          /
          <Link to="/programacao">
            programação
          </Link>
        ]
      </span>
      <span>
        [ 
          <Link to="/pron">
            <i title="pron" style={{fontSize: '80%'}}></i>
            pron
          </Link>
        ]
      </span>
    </div>
  );
}
