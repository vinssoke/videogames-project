import './Gallery.css';
import Header from '../../components/header/Header'; 
import Footer from '../../components/footer/Footer';

function Gallery() {
  const juegos = [
    {
      id: 1,
      titulo: "Elden Ring",
      descripcion: "Un mundo abierto épico lleno de desafíos y jefes legendarios.",
      imagen: "/img/elden-ring.jpg"
    },
    {
      id: 2,
      titulo: "Cyberpunk 2077",
      descripcion: "Explora Night City en un futuro distópico lleno de neones.",
      imagen: "/img/cyberpunk.jpg"
    },
    {
      id: 3,
      titulo: "God of War",
      descripcion: "Kratos y Atreus en una aventura a través de la mitología nórdica.",
      imagen: "/img/god-of-war.jpg"
    },
    {
      id: 4,
      titulo: "The Witcher 3",
      descripcion: "Caza monstruos en un mundo rico en historias y decisiones.",
      imagen: "/img/the-witcher-3.jpg" 
    },
    {
      id: 5,
      titulo: "Red Dead Redemption 2",
      descripcion: "Una historia forajida en el corazón de los Estados Unidos.",
      imagen: "/img/red-dead-redemption-2.jpg"
    },
    {
      id: 6,
      titulo: "Horizon Forbidden West",
      descripcion: "Acompaña a Aloy a través de una frontera majestuosa y peligrosa.",
      imagen: "/img/horizon.jpg"
    }
  ];

  return (
    <div className="gallery-wrapper">
      <Header />

      <main>
        <section className="parallax-hero">
          <div className="home-content">
            <h1>Galería de Juegos</h1>
          </div>
        </section>

        <section className="gallery-section">
          <div className="container">
            <h2>Nuestra Colección</h2>
            
            <div className="gallery-grid">
              {juegos.map((juego) => (
                <div key={juego.id} className="gallery-card">
                  <div 
                    className="gallery-image" 
                    style={{ backgroundImage: `url(${juego.imagen})` }}
                  ></div>
                  <div className="gallery-text">
                    <h3>{juego.titulo}</h3>
                    <p>{juego.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Gallery;