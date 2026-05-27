import { useState, useEffect } from 'react';
import './Opinions.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { ref, onValue, push, update, remove } from "firebase/database";
import { db } from '../../service/firebase';

const GAMES = [
  "The Elder Scrolls V: Skyrim",
  "Hollow Knight",
  "Call of Duty: Modern Warfare III",
  "Civilization VII",
  "Resident Evil 4 Remake",
  "Forza Motorsport",
  "Tekken 8",
  "The Legend of Zelda: Tears of the Kingdom",
  "Cyberpunk 2077",
  "Sky Children of the Light",
  "Silent Hill 2",
  "Elden Ring",
  "Warframe",
];

const formEmpty = {
  usuario: "",
  videojuego: GAMES[0],
  puntuacion: "",
  comentario: "",
  fecha: { dia: "", mes: "", anio: "" },
};

function Opinions() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gameFilter, setGameFilter] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(formEmpty);

  useEffect(() => {
    const reviewsRef = ref(db, 'resenas');
    const unsubscribe = onValue(reviewsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setReviews(list);
      } else {
        setReviews([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredReviews = reviews.filter((item) => {
    const matchGame = gameFilter === "" || item.videojuego === gameFilter;
    const matchUser = searchUser === "" || item.usuario.toLowerCase().includes(searchUser.toLowerCase());
    return matchGame && matchUser;
  });

  const handleAdd = () => {
    const { usuario, videojuego, puntuacion, comentario, fecha } = form;
    if (!usuario || !comentario || !puntuacion || !fecha.dia || !fecha.mes || !fecha.anio) {
      alert("Completa todos los campos.");
      return;
    }
    push(ref(db, 'resenas'), {
      usuario,
      videojuego,
      puntuacion: Number(puntuacion),
      comentario,
      fecha: {
        dia: Number(fecha.dia),
        mes: Number(fecha.mes),
        anio: Number(fecha.anio),
      },
    });
    setForm(formEmpty);
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setForm({
      usuario: item.usuario,
      videojuego: item.videojuego,
      puntuacion: item.puntuacion,
      comentario: item.comentario,
      fecha: item.fecha || { dia: "", mes: "", anio: "" },
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleUpdate = () => {
    const { usuario, videojuego, puntuacion, comentario, fecha } = form;
    update(ref(db, `resenas/${editingId}`), {
      usuario,
      videojuego,
      puntuacion: Number(puntuacion),
      comentario,
      fecha: {
        dia: Number(fecha.dia),
        mes: Number(fecha.mes),
        anio: Number(fecha.anio),
      },
    });
    setEditingId(null);
    setForm(formEmpty);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Borrar esta reseña?")) {
      remove(ref(db, `resenas/${id}`));
    }
  };

  const formatFecha = (fecha) => {
    if (!fecha) return "";
    return `${String(fecha.dia).padStart(2, "0")}/${String(fecha.mes).padStart(2, "0")}/${fecha.anio}`;
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
              {GAMES.map((j) => (
                <button key={j} className="filter-btn" onClick={() => setGameFilter(j)}>{j}</button>
              ))}
            </div>

            <div className="button-container">
              <input
                className="filter-btn"
                type="text"
                placeholder="🔍 Buscar usuario..."
                value={searchUser}
                onChange={e => setSearchUser(e.target.value)}
              />
              <button className="filter-btn" onClick={() => { setShowForm(!showForm); setEditingId(null); setForm(formEmpty); }}>
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
                  <input
                    className="form-input"
                    placeholder="Usuario"
                    value={form.usuario}
                    onChange={e => setForm({ ...form, usuario: e.target.value })}
                  />
                  <select
                    className="form-input"
                    value={form.videojuego}
                    onChange={e => setForm({ ...form, videojuego: e.target.value })}
                  >
                    {GAMES.map((j) => <option key={j}>{j}</option>)}
                  </select>
                  <input
                    className="form-input"
                    type="number" min="1" max="10"
                    placeholder="Puntuación (1-10)"
                    value={form.puntuacion}
                    onChange={e => setForm({ ...form, puntuacion: e.target.value })}
                  />
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input
                      className="form-input"
                      type="number" min="1" max="31"
                      placeholder="Día"
                      value={form.fecha.dia}
                      onChange={e => setForm({ ...form, fecha: { ...form.fecha, dia: e.target.value } })}
                    />
                    <input
                      className="form-input"
                      type="number" min="1" max="12"
                      placeholder="Mes"
                      value={form.fecha.mes}
                      onChange={e => setForm({ ...form, fecha: { ...form.fecha, mes: e.target.value } })}
                    />
                    <input
                      className="form-input"
                      type="number" min="2000" max="2100"
                      placeholder="Año"
                      value={form.fecha.anio}
                      onChange={e => setForm({ ...form, fecha: { ...form.fecha, anio: e.target.value } })}
                    />
                  </div>
                  <textarea
                    className="form-input"
                    rows="3"
                    placeholder="Comentario..."
                    value={form.comentario}
                    onChange={e => setForm({ ...form, comentario: e.target.value })}
                  />
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
                      <span className="user-name">👤 {item.usuario}</span>
                      <span className="post-date">{formatFecha(item.fecha)}</span>
                    </div>
                    <div className="forum-card-body">
                      <h3>{item.videojuego}</h3>
                      <div className="rating">⭐ {item.puntuacion}</div>
                      <p>"{item.comentario}"</p>
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
      <Footer color="purple" />
    </div>
  );
}

export default Opinions;