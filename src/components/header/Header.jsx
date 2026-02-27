import "./Header.css";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className={`site-header site-header-${props.color}`}>
      <div className="header-inner">
        <Link to="/" className="brand">
          <img
            src="/img/gamers-LND-logotipo.svg"
            alt="Logo"
            className="header-logo"
          />
        </Link>

        <input type="checkbox" id="nav-check" className="nav-check" />

        <label htmlFor="nav-check" className="nav-toggle">
          <span></span>
        </label>

        <nav className="primary-nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link to="/opinions">Opiniones</Link>
            </li>
            <li className="nav-item">
              <Link to="/gallery">Galería</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact">Contacto</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
