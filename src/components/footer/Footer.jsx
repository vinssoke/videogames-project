 function Footer() {
  return (
  <footer id="site-footer" class="site-footer">
    <div class="footer-inner container">

      <div class="footer-column">
        <h4>Sobre</h4>
        <p class="footer-about">Soy un alumno creando un proyecto web para Lenguaje de Marcas.</p>
        <p>&copy; 2025 Pagina web</p>
      </div>

      <div class="footer-column">
        <h4>Enlaces Rápidos</h4>
        <ul class="footer-links">
          <li><a href="#home">Inicio</a></li>
          <li><a href="#about">Sobre</a></li>
          <li><a href="#review">Reseña</a></li>
          <li><a href="#gallery">Galería</a></li>
          <li><a href="#contact">Contacto</a></li>
        </ul>
      </div>

      <div class="footer-column">
        <h4>Síguenos</h4>
        <div class="footer-right">
          <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
          <a href="#" aria-label="Twitter"><i class="fa-brands fa-twitter"></i></a>
          <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
        </div>
      </div>

    </div>
  </footer>

   );
}

export default Footer;
