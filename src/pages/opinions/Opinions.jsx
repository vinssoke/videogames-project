import { useState, useEffect } from 'react';
import './Opinions.css';
import Header from '../../components/header/Header'; 
import Footer from '../../components/footer/Footer';
import { ref, onValue, push, update, remove } from "firebase/database"; 
import { db } from '../../service/firebase'; 

function Opinions() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gameFilter, setGameFilter] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ user: "", game: "Cyberpunk 2077", rating: "", comment: "", date: "" });

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
    const matchGame = gameFilter === "" || item.game === gameFilter;
    const matchUser = searchUser === "" || item.user.toLowerCase().includes(searchUser.toLowerCase());
    return matchGame && matchUser;
  });

  const handleAdd = () => {
    if (!form.user || !form.comment || !form.rating || !form.date) {
      alert("Completa todos los campos.");
      return;
    }
    push(ref(db, 'opiniones'), form);
    setForm({ user: "", game: "Cyberpunk 2077", rating: "", comment: "", date: "" });
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setForm({ user: item.user, game: item.game, rating: item.rating, comment: item.comment, date: item.date });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleUpdate = () => {
    update(ref(db, `opiniones/${editingId}`), form);
    setEditingId(null);
    setForm({ user: "", game: "Cyberpunk 2077", rating: "", comment: "", date: "" });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Borrar esta reseña?")) {
      remove(ref(db, `opiniones/${id}`));
    }
  };

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

            <div className="button-container">
              <input
                className="filter-btn"
                type="text"
                placeholder="🔍 Buscar usuario..."
                value={searchUser}
                onChange={e => setSearchUser(e.target.value)}
              />
              <button className="filter-btn" onClick={() => { setShowForm(!showForm); setEditingId(null); }}>
                ➕ Nueva reseña
              </button>
            </div>
          </div>
        </section>

        {showForm && (
          <section className="forum-section">
            <div className="container">
              <div className="forum-card form-card">
                <div className="forum-card-header">
                  <span className="user-name">{editingId ? "✏️ Editar reseña" : "➕ Nueva reseña"}</span>
                </div>
                <div className="forum-card-body">
                  <input className="form-input" placeholder="Usuario" value={form.user} onChange={e => setForm({ ...form, user: e.target.value })} />
                  <select className="form-input" value={form.game} onChange={e => setForm({ ...form, game: e.target.value })}>
                    <option>Cyberpunk 2077</option>
                    <option>Sky Children of the Light</option>
                    <option>Silent Hill 2</option>
                    <option>Elden Ring</option>
                    <option>Warframe</option>
                  </select>
                  <input className="form-input" type="number" min="1" max="10" placeholder="Puntuación (1-10)" value={form.rating} onChange={e => setForm({ ...form, rating: e.target.value })} />
                  <input className="form-input" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                  <textarea className="form-input" rows="3" placeholder="Comentario..." value={form.comment} onChange={e => setForm({ ...form, comment: e.target.value })} />
                  <div className="button-container">
                    <button className="filter-btn" onClick={editingId ? handleUpdate : handleAdd}>
                      {editingId ? "💾 Guardar" : "➕ Añadir"}
                    </button>
                    <button className="filter-btn" onClick={() => { setShowForm(false); setEditingId(null); }}>
                      ✕ Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="forum-section">
          <div className="container">
            {loading ? (
              <h2>Loading reviews...</h2>
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
                    <div className="button-container">
                      <button className="filter-btn" onClick={() => handleEdit(item)}>✏️ Editar</button>
                      <button className="filter-btn delete-btn" onClick={() => handleDelete(item.id)}>🗑️ Borrar</button>
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