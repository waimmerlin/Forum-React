import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./styles/login.css"
import "./styles/main.css"
import "./styles/register.css"

import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
);