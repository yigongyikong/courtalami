import './App.css';
import React from 'react';
import styled from 'styled-components';

import Nav from './component/Nav';
import Footer from './component/Footer';
import SideLeftBar from './component/SideLeftBar';
import SideRightBar from './component/SideRightBar';

import Main from './pages/Main';
import Login from './pages/Login';
import Signin from './pages/Signin';
import Mypage from './pages/Mypage';

import MainTmp from './pages/MainTmp';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Total = styled.div`
  /* background-color: #008800; */
  background-color: yellow;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Middle = styled.div`
  /* background-color: #00ff00; */
  background-color: aqua;
  width: 100%;
  /* height: 100%; */
  flex: 1; // for height
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  overflow-y: scroll;
  /* overflow-x: visible; */
`;


function App() {
  return (
    <BrowserRouter>
      <Total>
        <Nav />
        <Middle>
          <SideLeftBar />
          {/* <MainTmp /> */}
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signin" element={<Signin />} />
            <Route path="/Mypage" element={<Mypage />} />
          </Routes>
          <SideRightBar />
        </Middle>
        <Footer />
      </Total>
    </BrowserRouter>
  );
}

export default App;