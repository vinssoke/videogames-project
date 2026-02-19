import './Footer.css';
import { Link } from 'react-router-dom'; 

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner container">
        
        <div className="footer-column border-right">
          <h4>Sobre</h4>
          <p>Redes</p>
          <div className="footer-legal-box">
            <p>&copy; 2026 VideoGames - Todos los derechos reservados</p>
            <div className="legal-links">
              <Link to="/privacy">Política de Privacidad</Link> | 
             <Link to="/terms">Condiciones de venta</Link> 
              <a href="https://github.com/vinssoke" target="_blank" rel="noopener noreferrer"> Pagina de Github</a>
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
            <a href="https://www.facebook.com/profile.php?id=61588499122639" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="https://x.com/WEBLND" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="https://www.instagram.com/videojuegoslnd?igsh=bXNvcWpxMm1hcDdv" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;