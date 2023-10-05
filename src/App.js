import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import PayingGuest from "./Components/PayingGuest";
import ListProperty from "./Components/ListProperty";
import LoadingBar from "react-top-loading-bar";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ParticularProperty from "./Components/ParticularProperty";
import Premium from "./Components/Premium";
import SavedProperty from "./Components/SavedProperty";
import ContactedProperty from "./Components/ContactedProperty";
import ListedProperty from "./Components/ListedProperty";
import SharingFlat from "./Components/SharingFlat";
import PrivateFlat from "./Components/PrivateFlats";
import Checkout from "./Components/Checkout";
import Allproperties from "./Components/Allproperties";
import TermsAndCondition from "./Components/TermsAndCondition";
import RefundPolicy from "./Components/RefundPolicy";
import AboutUs from "./Components/AboutUs";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import PaymentStatus from "./Components/Checkout/payment/PaymentStatus";
import PremiumDeatils from "./Components/PremiumDeatils";
import { ToastContainer } from "react-toastify";
import { PaymentProvider } from "./contexts/paymentContext";
import { PAYMENT_STATUS } from "./constants/payment";
import { UserProvider } from "./contexts/userContext";
import { PlanProvder } from "./contexts/planContext";
import { PLANS } from "./constants/plan";
function App() {
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState(null);
  const [plan, setPlan] = useState({ ...PLANS.KING });
  const [orderId, setOrderId] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(PAYMENT_STATUS.PENDING);

  function getOrderId() {
    return orderId;
  }

  useEffect(() => {
    const userId = localStorage.getItem("user");
    if (userId) {
      fetch(`${process.env.REACT_APP_API_IP}/user/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
        })
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line
  }, []);
  return (
    <UserProvider value={{ user, setUser }}>
      <PlanProvder value={{ plan, setPlan }}>
        <PaymentProvider
          value={{
            orderId,
            paymentStatus,
            getOrderId,
            setOrderId,
            setPaymentStatus,
          }}
        >
          <div className="App">
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <LoadingBar color="#f11946" progress={progress} />
            <Router>
              <Navbar user={user} />
              <Routes>
                <Route
                  path="/"
                  element={<Home setProgress={setProgress} user={user} />}
                />
                <Route
                  path="/paying-guest-in-ahmedabad"
                  element={
                    <PayingGuest setProgress={setProgress} user={user} />
                  }
                />
                <Route
                  path="/particular-property/:id"
                  element={
                    <ParticularProperty setProgress={setProgress} user={user} />
                  }
                />
                <Route
                  path="/sharingflats"
                  element={
                    <SharingFlat setProgress={setProgress} user={user} />
                  }
                />
                <Route
                  path="/privateflats"
                  element={
                    <PrivateFlat setProgress={setProgress} user={user} />
                  }
                />
                <Route
                  path="/myaccount/savedproperty"
                  element={
                    <SavedProperty setProgress={setProgress} user={user} />
                  }
                />
                <Route
                  path="/myaccount/contactedproperty"
                  element={
                    <ContactedProperty setProgress={setProgress} user={user} />
                  }
                />
                <Route
                  path="/myaccount/listedproperty"
                  element={
                    <ListedProperty setProgress={setProgress} user={user} />
                  }
                />
                <Route
                  path="/myaccount/premiumdetails"
                  element={
                    <PremiumDeatils setProgress={setProgress} user={user} />
                  }
                />
                <Route
                  path="/listProperty"
                  element={
                    <ListProperty setProgress={setProgress} user={user} />
                  }
                />
                <Route
                  path="/checkout"
                  element={<Checkout setProgress={setProgress} user={user} />}
                />
                <Route
                  path="/premium"
                  element={<Premium setProgress={setProgress} user={user} />}
                />
                <Route
                  path="/allproperties"
                  element={
                    <Allproperties setProgress={setProgress} user={user} />
                  }
                />
                <Route
                  path="/payment-status"
                  element={
                    <PaymentStatus setProgress={setProgress} user={user} />
                  }
                />
                <Route
                  path="/terms-and-conditions"
                  element={
                    <TermsAndCondition setProgress={setProgress} user={user} />
                  }
                />
                <Route
                  path="/refund-policy"
                  element={
                    <RefundPolicy setProgress={setProgress} user={user} />
                  }
                />
                <Route
                  path="/about-us"
                  element={
                    <AboutUs setProgress={setProgress} user={user} />
                  }
                />
                <Route
                  path="/privacy-policy"
                  element={
                    <PrivacyPolicy setProgress={setProgress} user={user} />
                  }
                />
              </Routes>
              <Footer />
            </Router>
          </div>
        </PaymentProvider>
      </PlanProvder>
    </UserProvider>
  );
}

export default App;
