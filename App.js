import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import AddProduct from './pages/AddProduct';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <div className="header-content">
            <Link to="/" className="logo">
              📊 Review Trust System
            </Link>
            <nav>
              <Link to="/">Home</Link>
              <Link to="/add-product">Add Product</Link>
            </nav>
          </div>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/add-product" element={<AddProduct />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>&copy; 2024 Fake Review Detection System. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
