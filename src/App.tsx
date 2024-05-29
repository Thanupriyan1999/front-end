import React, { useState, useRef, ChangeEvent, FormEvent, KeyboardEvent, useEffect } from "react";
import "./App.css";
import * as XLSX from "xlsx";
// import { BarcodeScanner } from "react-barcode-scanner";
// import { useSymbologyScanner } from "@use-symbology-scanner/react";
// import { saveAs } from "file-saver";
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IndexPage from './page/IndexPage';
import LoginPage from './page/LoginPage';
import RegisterPage from './page/RegisterPage';

function App() {
  // const {setProductDetails, productDetails} = useState(null);

  return (
    
    <UserContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
      </Router>
    </UserContextProvider>
  );
}
export default App;
