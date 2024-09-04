import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import axios from 'axios';
import styled, { createGlobalStyle } from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home';
import Products from './components/Products';
import Cart from './components/Cart';

axios.defaults.withCredentials = true;

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #f4f4f4;
  }
`;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
  text-align: center;
`;

const NavBar = styled.nav`
  background-color: #34495e;
  padding: 1rem;
`;

const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
`;

const NavItem = styled.li`
  margin: 0 1rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

const Main = styled.main`
  flex-grow: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const Footer = styled.footer`
  background-color: #2c3e50;
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
`;

function App() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/cart');
      const totalItems = response.data.reduce((total, item) => total + item.quantity, 0);
      setCartCount(totalItems);
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast.error('Failed to fetch cart. Please try again.');
    }
  };

  return (
    <Router>
      <GlobalStyle />
      <AppWrapper>
        <Header>
          <h1>My Shop</h1>
        </Header>
        <NavBar>
          <NavList>
            <NavItem><NavLink to="/">Home</NavLink></NavItem>
            <NavItem><NavLink to="/products">Products</NavLink></NavItem>
            <NavItem><NavLink to="/cart">Cart ({cartCount})</NavLink></NavItem>
          </NavList>
        </NavBar>
        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products updateCart={fetchCart} />} />
            <Route path="/cart" element={<Cart updateCart={fetchCart} />} />
          </Routes>
        </Main>
        <Footer>
          <p>&copy; 2024 My Shop. All rights reserved.</p>
        </Footer>
      </AppWrapper>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </Router>
  );
}

export default App;