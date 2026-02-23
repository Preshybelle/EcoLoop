import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Terms from "./pages/Terms";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ListingsManagement from "./pages/ListingsManagement";
import CreateListing from "./pages/CreateListing";
import CreateListingMaterialDetails from "./pages/CreateListingMaterialDetails";
import CreateListingSetPrice from "./pages/CreateListingSetPrice";
import CreateListingReview from "./pages/CreateListingReview";
import ListingPublished from "./pages/ListingPublished";
import ProducerDashboard from "./pages/ProducerDashboard";
import Inventory from "./pages/Inventory";
import Marketplace from "./pages/Marketplace";
import AIRecognition from "./pages/AIRecognition";
import BuyerDashboard from "./pages/BuyerDashboard";
import Messages from "./pages/Messages";
import AccountSettings from "./pages/AccountSettings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
        <Route path="/buyer/account" element={<AccountSettings />} />
        <Route path="/buyer/messages" element={<Messages />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/listings" element={<ListingsManagement />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/seller/dashboard" element={<ProducerDashboard />} />
        <Route path="/seller/messages" element={<Messages />} />
        <Route path="/seller/inventory" element={<Inventory />} />
        <Route path="/seller/account" element={<AccountSettings />} />
        <Route path="/seller/scan" element={<AIRecognition />} />
        <Route path="/seller/listing-published" element={<ListingPublished />} />
        <Route path="/seller/create-listing/review" element={<CreateListingReview />} />
        <Route path="/seller/create-listing/price" element={<CreateListingSetPrice />} />
        <Route path="/seller/create-listing/material-details" element={<CreateListingMaterialDetails />} />
        <Route path="/seller/create-listing/scan" element={<AIRecognition />} />
        <Route path="/seller/create-listing" element={<CreateListing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;




