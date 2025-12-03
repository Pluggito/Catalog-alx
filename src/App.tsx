import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";
// import SearchBar from "./components/SearchBar";
import { useState } from "react";
import MobileNavbar from "./components/MobileNavbar";
import Footer from "./components/Footer";

const App = () => {
   const [visible, setVisible] = useState(false);

  return (
    
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Navbar setVisible={setVisible} visible={visible} />
      
      <MobileNavbar visible={visible} setVisible={setVisible} />
      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Products />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
