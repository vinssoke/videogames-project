 function Header() {
  return (
<header id="site-header" class="site-header">
    <div class="header-inner">
      <a href="#home" class="brand">
        <img src="img/logoimage.png" alt="Logo" class="header-logo"></img>
      </a>


      <button id="nav-toggle" class="nav-toggle" aria-controls="primary-nav" aria-expanded="false"
        aria-label="Abrir menú">
      </button>gitZ
      <nav id="primary-nav" class="primary-nav">
        <ul class="nav-list">
          <li class="nav-item"><a href="#home">Inicio</a></li>
          <li class="nav-item"><a href="#about">Sobre</a></li>
          <li class="nav-item"><a href="#review">Reseña</a></li>
          <li class="nav-item"><a href="#gallery">Galería</a></li>
          <li class="nav-item"><a href="#contact">Contacto</a></li>
        </ul>
      </nav>
    </div>
  </header>

     );
}

export default Header;