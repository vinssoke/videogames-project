 import './Header.css';

 function Header() {
  return (
<header id="site-header" class="site-header">
    <div class="header-inner">
      <a href="#home" class="brand">
      <img src="/img/videogames.png" alt="Logo" className="header-logo" /> </a>


      <button id="nav-toggle" class="nav-toggle" aria-controls="primary-nav" aria-expanded="false"
        aria-label="Abrir menú">
      </button>
      <nav id="primary-nav" class="primary-nav">
        <ul class="nav-list">
          <li class="nav-item"><a href="#home">Inicio</a></li>
          <li class="nav-item"><a href="#services">Servicios</a></li>
          <li class="nav-item"><a href="#gallery">Galería</a></li>
          <li class="nav-item"><a href="#contact">Contacto</a></li>
        </ul>
      </nav>
    </div>
  </header>

     );
}

export default Header;