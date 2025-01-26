import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ItemDetailPage from "./pages/ItemDetailPage";
import CheckoutPage from "./pages/CheckoutPage";
import ListItemPage from "./pages/ListItemPage";
import RentPage from "./pages/RentPage";
import LendPage from "./pages/LendPage";
import CheckoutConfirmationPage from "./pages/CheckoutConfirmationPage";
import WaitingPage from "./pages/WaitingPage";
import PickupConfirmationPage from "./pages/PickupConfirmationPage";

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

          {/* Route for the list item page */}
          <Route path="/list" element={<ListItemPage />} />

          {/* Route for the rent page */}
          <Route path="/rent" element={<RentPage />} />

          {/* Route for the lend page */}
          <Route path="/lend" element={<LendPage />} />

          {/* Route for the checkout confirmation page */}
          <Route
            path="/checkout_confirmation/:id"
            element={<CheckoutConfirmationPage />}
          />

          {/* Update the waiting page route to include id parameter */}
          <Route path="/waiting/:id" element={<WaitingPage />} />

          {/* Add the new pickup confirmation page route */}
          <Route
            path="/pickup-confirmation/:id"
            element={<PickupConfirmationPage />}
          />
        </Routes>

        {/* Footer remains persistent across all routes */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
