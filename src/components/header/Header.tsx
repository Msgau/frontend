// Header.tsx
import './Header.scss';
import { NavLink } from 'react-router-dom';


function Menu() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/">
            Accueil
          </NavLink>
        </li>
        <li>
          Mes CACAOS
        </li>
        <li>
          Connexion
        </li>
      </ul>
    </nav>
  );
}

export default function Header() {
  return (
    <header>
      <h1>CACAO STREET</h1>
      <Menu />
    </header>
  );
}
