import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Contact from "./pages/Contact/Contact";
import Gallery from "./pages/gallery/gallery";
import Privacy from "./pages/privacy/Privacy";
import Terms from "./pages/terms/terms";
import Opinions from "./pages/opinions/opinions";
import Rss from "./pages/rss/Rss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/Opinions" element={<Opinions />} />
        <Route path="/Rss" element={<Rss />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
