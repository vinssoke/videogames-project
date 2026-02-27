import './Privacy.css';
import Header from '../../components/header/Header'; 
import Footer from '../../components/footer/Footer';

function Privacy() {
  return (
    <div className="privacy-wrapper">
      <Header color="purple" />

      <main className="privacy-main">
        <section className="parallax-hero">
          <div className="home-content">
            <h1>Política de Privacidad</h1>
            <p>Última actualización: 19 de febrero de 2026</p>
          </div>
        </section>

        <section className="privacy-content container">
          <div className="legal-box">
            <p className="intro-text">
              En <strong>Videojuegos LND</strong>, valoramos tu privacidad. Esta política explica qué información recopilamos, cómo la usamos y qué derechos tienes sobre ella.
            </p>

            <div className="legal-section">
              <h2>1. Información que Recopilamos</h2>
              <p>Podemos recopilar los siguientes datos personales cuando interactúas con nosotros:</p>
              <ul>
                <li><strong>Datos de identificación:</strong> Nombre, apellidos y dirección de correo electrónico.</li>
                <li><strong>Datos de navegación:</strong> Dirección IP, tipo de navegador y cookies.</li>
                <li><strong>Datos de contacto:</strong> Teléfono o dirección física si realizas una compra o consulta directa.</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>2. Uso de la Información</h2>
              <p>Utilizamos la información recopilada para:</p>
              <ul>
                <li>Proveer y mantener nuestros servicios.</li>
                <li>Enviar boletines informativos o promociones (con tu consentimiento).</li>
                <li>Mejorar la experiencia de usuario y el funcionamiento técnico del sitio.</li>
                <li>Cumplir con obligaciones legales.</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>3. Base Legal para el Tratamiento</h2>
              <p>Procesamos tus datos bajo consentimiento, ejecución de contrato e interés legítimo para mejorar nuestra seguridad.</p>
            </div>

            <div className="legal-section">
              <h2>4. Terceros y Seguridad</h2>
              <p>No vendemos ni alquilamos tus datos. Solo compartimos información con proveedores de confianza (hosting o pagos) bajo estrictas medidas de seguridad.</p>
            </div>

            <div className="legal-section">
              <h2>5. Tus Derechos</h2>
              <p>Tienes derecho a acceder, rectificar, eliminar ("derecho al olvido") y oponerte al tratamiento de tus datos personales.</p>
            </div>

            <div className="legal-section">
              <h2>6. Contacto</h2>
              <p>Para dudas o ejercer tus derechos:</p>
              <div className="contact-info">
                <p>📧 Email: <a href="mailto:marcojosesuarezdiaz@alumno.ieselrincon.es">marcojosesuarezdiaz@alumno.ieselrincon.es</a></p>
                <p>📍 Dirección: Calle la imaginación Nº 3</p>
              </div>
            </div>
          </div>
        </section>
      </main>

       <Footer color="purple"/>
    </div>
  );
}

export default Privacy;