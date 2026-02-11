function Home() {
  return (
    <body>
    <main>
      <section id="home" class="parallax-hero">
        <div class="home-content">
          <h1>Bienvenido a mi pagina</h1>
          <p>Videojuegos y demas</p>
        </div>
      </section>

      <section id="services" class="section-services-section">
        <div class="container">
            <h2>Servicios</h2>
            <div class="service-grid">
                <article class="service-card">
                    <i class="fa-solid fa-gamepad service-icon"></i>
                    <h3>Videojuegos</h3>
                    <p>Todo tipo de videojuegos</p>
                    </article>
                    
            <article class="service-card">
            <i class="fa-solid fa-user service-icon"></i>
            <h3>Opiniones</h3>
            <p>Las opiniones mas fieles y sinceras acerca de los videojuegos</p>
          </article>
        
            <article clasas="service-card">
                <i class="fa-solid fa-star service-icon"></i>
                <h3>Fiabilidad</h3>
                <p>Sinceridad,fiabilidad y honestidad</p>
                </article>
                </div>
                </div>
                </section>
    </main>
    </body>
  );
}

export default Home;
