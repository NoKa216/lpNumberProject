import React from 'react';
import { Container } from "react-bootstrap";

import './App.css';
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Middle from "./components/Middle/Middle";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Middle />
      <Footer />
    </React.Fragment>
  );
}

export default App;
