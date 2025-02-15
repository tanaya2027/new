import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/navbar";
import Footer from "./Components/Footer/footer";
import Home from "./Pages/Home/home";
import Services from "./Pages/Serv/services";
import AddDonation from "./Pages/AddDonation/adddonation";
import LiveDonations from "./Pages/LiveDonation/livedonation";
import Volunteer from "./Pages/Volunteer/volunteer";
import Charity from "./Pages/Charity/charity";
import Enquire from "./Pages/Enquire/enquire";
import Donorprofile from "./Pages/DonorProfile/donorprofile";
import Login from "./Pages/Login/login";
import Signup from "./Pages/Signup/signup";


const App = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/test")
      .then((response) => setMessage(response.data.message))
      .catch((error) => console.error("Error fetching data"));
  }, []);

  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/adddonation" element={<AddDonation />} />
          <Route path="/livedonations" element={<LiveDonations />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/charity" element={<Charity />} />
          <Route path="/enquire" element={<Enquire />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/donorprofile" element={<Donorprofile />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;