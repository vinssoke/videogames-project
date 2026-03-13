import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./Rss.css";

function Rss() {
  return (
    <div className="page-wrapper">
      <Header color="purple" />

      <main className="rss-main-content">
        <div className="rss-container">
          <h1 className="rss-title">Últimas noticias en formato RSS</h1>
          <p className="rss-subtitle">
            Suscríbete a nuestro feed para recibir las novedades de videojuegos
            en tiempo real.
          </p>

          <div className="rss-button-group">
            <a
              href="/News.xml"
              rel="noopener noreferrer"
              className="rss-link-button"
            >
              <i className="fa-solid fa-rss"></i> Acceder al Feed XML
            </a>
          </div>
        </div>
      </main>

      <Footer color="purple" />
    </div>
  );
}

export default Rss;
