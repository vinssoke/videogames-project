import './Gallery.css';
import Header from '../../components/header/Header'; 
import Footer from '../../components/footer/Footer';

function Gallery() {
  const games = [
    {
      id: 1,
      title: "Elden Ring",
      description: "Un mundo abierto épico lleno de desafíos y jefes legendarios.",
      image: "/img/elden-ring.jpg"
    },
    {
      id: 2,
      title: "Cyberpunk 2077",
      description: "Explora Night City en un futuro distópico lleno de neones.",
      image: "/img/cyberpunk.jpg"
    },
    {
      id: 3,
      title: "God of War",
      description: "Kratos y Atreus en una aventura a través de la mitología nórdica.",
      image: "/img/god-of-war.jpg"
    },
    {
      id: 4,
      title: "The Witcher 3",
      description: "Caza monstruos en un mundo rico en historias y decisiones.",
      image: "/img/the-witcher-3.jpg" 
    },
    {
      id: 5,
      title: "Red Dead Redemption 2",
      description: "Una historia forajida en el corazón de los Estados Unidos.",
      image: "/img/red-dead-redemption-2.jpg"
    },
    {
      id: 6,
      title: "Horizon Forbidden West",
      description: "Acompaña a Aloy a través de una frontera majestuosa y peligrosa.",
      image: "/img/horizon.jpg"
    }
  ];

  return (
    <div className="gallery-wrapper">
     <Header color="purple" />

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
              {games.map((games) => (
                <div key={games.id} className="gallery-card">
                  <div 
                    className="gallery-image" 
                    style={{ backgroundImage: `url(${games.image})` }}
                  ></div>
                  <div className="gallery-text">
                    <h3>{games.title}</h3>
                    <p>{games.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer color="purple"/>
    </div>
  );
}

export default Gallery;