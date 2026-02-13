import './Contact.css';
import Header from '../../components/header/Header'; 
import Footer from '../../components/footer/Footer';

function Contact() {
  return (
    <div className="contact-wrapper">
      <Header />

      <main>
        <section className="parallax-hero">
          <div className="home-content">
            <h1>Contacto de la empresa</h1>
            <p>Estamos aquí para ayudarte</p>
          </div>
        </section>

        <section className="contact-section">
          <div className="container">
            <div className="contact-container">
              <h2>Envíanos un mensaje</h2>
              <form className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Nombre</label>
                  <input type="text" id="name" name="name" placeholder="Tu nombre..." required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Correo Electrónico</label>
                  <input type="email" id="email" name="email" placeholder="tu@email.com" required />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Mensaje</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="5" 
                    placeholder="Escribe tu mensaje aquí..." 
                    required 
                    spellCheck="false"
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">Enviar Mensaje</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Contact;