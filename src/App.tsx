import React from 'react';
import './App.css';
import Navbar from './ui/Navbar';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import MainPage from './ui/MainPage';
import Docs from './ui/Docs';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path="home" element={<MainPage />} />
            <Route path="docs" element={<Docs />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
