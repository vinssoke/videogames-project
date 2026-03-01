import './Contact.css';
import Header from '../../components/header/Header'; 
import Footer from '../../components/footer/Footer';

function Contact() {
  return (
    <div className="contact-wrapper">
      <Header color="purple" />

      <main>
        <section className="parallax-hero">
          <div className="home-content">
            <h1>Contactanos</h1>
            <p>Estamos para ayudarte</p>
          </div>
        </section>

        <section className="contact-section">
          <div className="container">
            <div className="contact-grid">
              <div className="map-container">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.639255855013!2d-3.703790!3d40.416775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDI1JzAwLjQiTiAzwrA0MicxMy42Ilc!5e0!3m2!1ses!2ses!4v1647874563210!5m2!1ses!2ses" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, borderRadius: '15px' }} 
                  allowFullScreen="" 
                  loading="lazy"
                  title="Company Location"
                ></iframe>
              </div>
              <div className="contact-container">
                <h2>Mandanos un mensaje</h2>
                <form className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input type="text" id="name" name="name" placeholder="Tu nombre..." required />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="tu@email.com" required />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Mensaje</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows="5" 
                      placeholder="Escribe tu mensaje aqui..." 
                      required 
                    ></textarea>
                  </div>

                  <button type="submit" className="submit-btn">Enviar</button>
                </form>
              </div>

            </div> 
          </div>
        </section>
      </main>

      <Footer color="purple"/>
    </div>
  );
}

export default Contact;