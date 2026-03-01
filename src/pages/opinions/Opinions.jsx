import { useState, useEffect } from 'react';
import './Opinions.css';
import Header from '../../components/header/Header'; 
import Footer from '../../components/footer/Footer';
import { db } from '../../firebase';
import { ref, onValue } from "firebase/database"; 

function Opinions() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gameFilter, setGameFilter] = useState("");

  useEffect(() => {
    const reviewsRef = ref(db, 'opiniones');
    const unsubscribe = onValue(reviewsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setReviews(list);
      }
      setLoading(false);
    });
    return () => unsubscribe(); 
  }, []);

  
  const filteredReviews = reviews.filter((item) => {
    if (gameFilter === "") return true; 
    return item.game === gameFilter;   
  });

  return (
    <div className="forum-wrapper">
      <Header color="purple" />
      <main>
        <section className="parallax-hero">
          <div className="home-content">
            <h1>Comunidad Realtime</h1>
            <p>Opiniones de los usuarios</p>
          
            <div className="button-container">
              <button className="filter-btn" onClick={() => setGameFilter("")}>All</button>
              <button className="filter-btn" onClick={() => setGameFilter("Cyberpunk 2077")}>Cyberpunk 2077</button>
              <button className="filter-btn" onClick={() => setGameFilter("Sky Children of the Light")}>Sky Children of the Light</button>
              <button className="filter-btn" onClick={() => setGameFilter("Silent Hill 2")}>Silent Hill 2</button>
              <button className="filter-btn" onClick={() => setGameFilter("Elden Ring")}>Elden Ring</button>
              <button className="filter-btn" onClick={() => setGameFilter("Warframe")}>Warframe</button>

            </div>
          </div>
        </section>

        <section className="forum-section">
          <div className="container">
            {loading ? (
              <h2 style={{textAlign: 'center'}}>Loading reviews...</h2>
            ) : (
              <div className="forum-grid">
                {filteredReviews.map((item) => (
                  <div key={item.id} className="forum-card">
                    <div className="forum-card-header">
                      <span className="user-name">👤 {item.user}</span>
                      <span className="post-date">{item.date}</span>
                    </div>
                    <div className="forum-card-body">
                      <h3>{item.game}</h3>
                      <div className="rating">⭐ {item.rating}</div>
                      <p>"{item.comment}"</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer color="purple"/>
    </div>
  );
}

export default Opinions;