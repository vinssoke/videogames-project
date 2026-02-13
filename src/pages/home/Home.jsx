import './Styles.css';
import Header from '../../components/header/Header'; 
import Footer from '../../components/footer/Footer';

function Home() {
  return (
    <div className="home-wrapper">
      <Header />

      <main>
        <section id="home" className="parallax-hero">
          <div className="home-content">
            <h1>Bienvenido a mi página</h1>
            <p>Videojuegos y demás</p>
          </div>
        </section>

        <section id="services" className="section-services">
          <div className="container">
            <h2>Nuestros Servicios</h2>
            <div className="service-grid">
              
              <article className="service-card">
                <div className="card-image img-videojuegos"></div>
                <div className="card-text">
                  <h3>Videojuegos</h3>
                  <p>Todo tipo de videojuegos, desde indies hasta AAA.</p>
                </div>
              </article>

              <article className="service-card">
                <div className="card-image img-opiniones"></div>
                <div className="card-text">
                  <h3>Opiniones</h3>
                  <p>Las opiniones más fieles y sinceras.</p>
                </div>
              </article>

              <article className="service-card">
                <div className="card-image img-fiabilidad"></div>
                <div className="card-text">
                  <h3>Fiabilidad</h3>
                  <p>Sinceridad, fiabilidad y honestidad.</p>
                </div>
              </article>
              
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;