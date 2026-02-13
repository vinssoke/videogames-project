import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header id="site-header" className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand">
          <img src="/img/videogames.png" alt="Logo" className="header-logo" />
        </Link>

        <nav id="primary-nav" className="primary-nav">
          <ul className="nav-list">
            <li className="nav-item"><Link to="/">Inicio</Link></li>
            <li className="nav-item"><a href="#services">Servicios</a></li>
            <li className="nav-item"><Link to="/gallery">Galería</Link></li>
            <li className="nav-item"><Link to="/contact">Contacto</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;