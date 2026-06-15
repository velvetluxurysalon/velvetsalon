import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import BottomNav from "./component/BottomNav";
import Footer from "./component/Footer";
import Home from "./page/Home";
import Services from "./page/Services";
import Membership from "./page/Membership";
import Contact from "./page/Contact";

function App() {
  return (
    <BrowserRouter>
      <div className="relative max-w-md mx-auto min-h-screen bg-[#FAF7F2] md:max-w-none">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;