import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import ThankYouPage from "./pages/thankyouPage";
import CheckoutPage from "./pages/checkoutPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/thank-you/:orderId" element={<ThankYouPage />} />
      </Routes>
    </Router>
  );
};

export default App;
