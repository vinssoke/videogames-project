import './Terms.css';
import Header from '../../components/header/Header'; 
import Footer from '../../components/footer/Footer';

function Terms() {
  return (
    <div className="privacy-wrapper">
      <Header color="purple" />

      <main className="privacy-main">
        <section className="parallax-hero">
          <div className="home-content">
            <h1>Condiciones de Venta</h1>
            <p>Última actualización: 19 de febrero de 2026</p>
          </div>
        </section>

        <section className="privacy-content container">
          <div className="legal-box">
            <p className="intro-text">
              Bienvenido a <strong>Videojuegos LND</strong>. Al realizar una compra en nuestro sitio, aceptas los siguientes términos y condiciones que rigen la relación comercial.
            </p>

            <div className="legal-section">
              <h2>1. Productos y Precios</h2>
              <p>Todos los precios mostrados incluyen el IVA correspondiente. Nos reservamos el derecho de modificar los precios en cualquier momento, garantizando siempre el precio vigente en el momento de la confirmación del pedido.</p>
            </div>

            <div className="legal-section">
              <h2>2. Proceso de Compra</h2>
              <p>Para adquirir nuestros productos, el usuario deberá seguir el proceso de compra online. Una vez finalizado, recibirá un correo electrónico de confirmación con los detalles de su pedido.</p>
            </div>

            <div className="legal-section">
              <h2>3. Envíos y Entrega</h2>
              <ul>
                <li><strong>Productos Físicos:</strong> Plazo de entrega de 3 a 5 días hábiles dentro de la península.</li>
                <li><strong>Productos Digitales:</strong> Entrega inmediata mediante enlace de descarga tras la confirmación del pago.</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>4. Devoluciones y Desistimiento</h2>
              <p>Dispones de un plazo de 14 días naturales para devolver un producto físico si no estás satisfecho, siempre que se encuentre en su embalaje original. Los productos digitales no admiten devolución una vez se ha iniciado la descarga o acceso.</p>
            </div>

            <div className="legal-section">
              <h2>5. Garantía</h2>
              <p>Todos nuestros productos cuentan con la garantía legal de 3 años contra defectos de fabricación, conforme a la legislación vigente.</p>
            </div>

            <div className="legal-section">
              <h2>6. Métodos de Pago</h2>
              <p>Aceptamos pagos mediante tarjeta de crédito/débito, PayPal y transferencia bancaria asegurando siempre una transacción cifrada y segura.</p>
            </div>
          </div>
        </section>
      </main>

       <Footer color="purple"/>
    </div>
  );
}

export default Terms;