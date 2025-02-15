import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React, { useEffect, useState } from "react";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <Footer /> */}
  </StrictMode>,
)
