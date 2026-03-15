import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./Rss.css";

function Rss() {
  const noticias = [
    {
      id: "noticia-1",
      titulo: "Grand Theft Auto VI: La revolución tecnológica de Vice City",
      resumen: "Rockstar Games ha confirmado que GTA VI no solo será el título más ambicioso en cuanto a extensión de mapeado, sino que introducirá un motor de físicas de nueva generación específicamente diseñado para la interacción con fluidos y colisiones realistas. El sistema de IA, denominado internamente 'Advanced NPC Behavior', permitirá que cada habitante de Vice City tenga una rutina única que responda dinámicamente a eventos globales, el ciclo día/noche y condiciones climáticas extremas como huracanes. El lanzamiento sigue fijado para el otoño de 2025, prometiendo redefinir el estándar de los mundos abiertos para la próxima década."
    },
    {
      id: "noticia-2",
      titulo: "Nintendo y su próximo salto: Retrocompatibilidad y Potencia",
      resumen: "Nuevos informes provenientes de la cadena de suministro en Asia confirman que la sucesora de Nintendo Switch utilizará un chip personalizado de NVIDIA con arquitectura Ampere, permitiendo el uso de DLSS 3.5 para alcanzar resoluciones 4K mediante IA cuando esté conectada a la televisión. La noticia más celebrada por la comunidad es la confirmación de la retrocompatibilidad total, tanto física como digital, lo que permitirá a los usuarios actuales mantener su biblioteca de juegos. Shuntaro Furukawa destacó en la última reunión de inversores que el objetivo principal es una transición fluida que mantenga el ecosistema de cuentas de Nintendo intacto."
    },
    {
      id: "noticia-3",
      titulo: "El legado de Shadow of the Erdtree: Un nuevo hito en los RPG",
      resumen: "La expansión Shadow of the Erdtree ha logrado algo inusual en la industria: ser considerada por la crítica como un juego independiente debido a su densidad y tamaño. FromSoftware ha implementado un sistema de 'Bendiciones del Reino de las Sombras' que equilibra la dificultad independientemente del nivel previo del jugador, obligando a los veteranos a explorar cada rincón del mapa vertical para ganar poder. Con más de 10 nuevos jefes principales y un diseño de niveles que conecta el mundo de forma intrincada, este contenido adicional establece un nuevo techo de calidad para las expansiones de pago, consolidando a Elden Ring como uno de los pilares fundamentales de la historia del videojuego moderno."
    }
  ];

  return (
    <div className="page-wrapper">
      <Header color="purple" />

      <main className="rss-main-content">
        <div className="rss-container">
          <h1 className="rss-title">Últimas noticias en formato RSS</h1>
          <p className="rss-subtitle">
            Análisis exhaustivo y cobertura detallada de los eventos más relevantes en la industria del gaming.
          </p>

          <div className="news-stack">
            {noticias.map((noticia) => (
              <article key={noticia.id} id={noticia.id} className="news-item-box">
                <div className="news-content">
                  <h3>{noticia.titulo}</h3>
                  <p>{noticia.resumen}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="rss-footer-link">
            <a 
              href="https://fir-tibu.web.app/News.xml" 
              target="_blank" 
              rel="noopener noreferrer"
              className="rss-xml-btn"
            >
              <i className="fa-solid fa-rss"></i> Abrir RSS
            </a>
          </div>
        </div>
      </main>

      <Footer color="purple" />
    </div>
  );
}

export default Rss;