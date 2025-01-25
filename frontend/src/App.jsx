import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ItemDetailPage from "./pages/ItemDetailPage";
import CheckoutPage from "./pages/CheckoutPage";

const App = () => {
  return (
    <Router>
      <div>
        {/* Navbar remains persistent across all routes */}
        <Navbar />

        <Routes>
          {/* Route for the home page */}
          <Route path="/" element={<HomePage />} />

          {/* Route for the item detail page */}
          <Route path="/items/:id" element={<ItemDetailPage />} />

          {/* Route for the checkout page */}
          <Route path="/checkout/:id" element={<CheckoutPage />} />
        </Routes>

        {/* Footer remains persistent across all routes */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
