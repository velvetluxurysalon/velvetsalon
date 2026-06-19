import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./component/Navbar";
import BottomNav from "./component/BottomNav";
import Footer from "./component/Footer";

// Lazy-loaded pages — each becomes its own JS chunk, only downloaded when
// the user actually navigates to that route.
const Home = lazy(() => import("./page/Home"));
const Services = lazy(() => import("./page/Services"));
const Membership = lazy(() => import("./page/Membership"));
const Gallery = lazy(() => import("./page/Gallery"));
const Contact = lazy(() => import("./page/Contact"));

// Shown briefly while a page chunk is downloading.
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-10 h-10 border-2 border-[#E8D9C0] border-t-[#C8A96E] rounded-full animate-spin" />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="relative max-w-md mx-auto min-h-screen bg-[#FAF7F2] md:max-w-none">
        <Navbar />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
        <Footer />
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;