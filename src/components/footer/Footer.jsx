import './Footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner container">
        
        <div className="footer-column border-right">
          <h4>Sobre</h4>
          <p>Redes</p>
          <div className="footer-legal-box">
            <p>&copy; 2025 VideoGames - Todos los derechos reservados</p>
            <div className="legal-links">
              <a href="#">Política de Privacidad</a> | <a href="#">Condiciones de Venta</a>|
                <a href="https://github.com/vinssoke">Pagina de Github</a>
            </div>
          </div>
        </div>

        <div className="footer-column border-right">
          <h4>Navegación</h4>
          <ul className="footer-links">
            <li>Inicio</li>
            <li>Sobre</li>
            <li>Reseña</li>
            <li>Galería</li>
            <li>Contacto</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Síguenos</h4>
          <div className="footer-socials">
            <a href="#"><i className="fa-brands fa-facebook"></i></a>
            <a href="#"><i className="fa-brands fa-twitter"></i></a>
            <a href="#"><i className="fa-brands fa-instagram"></i></a>
            <a href="#"><i className="fa-solid fa-circle-dot"></i></a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;