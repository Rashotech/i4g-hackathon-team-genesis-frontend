import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import "./scss/styles.scss";
import "@fortawesome/fontawesome-free/css/all.css";
import 'react-toastify/dist/ReactToastify.css';

import HomePage from "./pages/HomePage";
import ScrollToTop from "./components/ScrollToTop";

ReactDOM.render(
  <BrowserRouter>
    <ScrollToTop />
    <HomePage />
    <ToastContainer />
  </BrowserRouter>,
  document.getElementById("root")
);
