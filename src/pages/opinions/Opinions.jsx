import  { useState, useEffect } from 'react';
import './Opinions.css';
import Header from '../../components/header/Header'; 
import Footer from '../../components/footer/Footer';
import { db } from '../../firebase';
import { ref, onValue } from "firebase/database"; 

function Opinions() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const reviewsRef = ref(db, 'opiniones');

    const unsubscribe = onValue(reviewsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setReviews(list);
      }
      setLoading(false);
    });

    return () => unsubscribe(); 
  }, []);

  return (
    <div className="forum-wrapper">
     <Header color="purple" />
      <main>
        <section className="parallax-hero">
          <div className="home-content">
            <h1>Comunidad Realtime</h1>
            <p>Opiniones conectadas a Firebase</p>
          </div>
        </section>

        <section className="forum-section">
          <div className="container">
            {loading ? (
              <h2 style={{textAlign: 'center'}}>Cargando opiniones...</h2>
            ) : (
              <div className="forum-grid">
                {reviews.map((item) => (
                  <div key={item.id} className="forum-card">
                    <div className="forum-card-header">
                      <span className="user-name">👤 {item.user}</span>
                      <span className="post-date">{item.date}</span>
                    </div>
                    <div className="forum-card-body">
                      <h3>{item.game}</h3>
                      <div className="rating">{item.rating}</div>
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