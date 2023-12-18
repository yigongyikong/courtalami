import './App.css'
import Footer from './component/Footer'
import Nav from './component/Nav'
import SideLeftBar from './component/SideLeftBar'
import SideRightBar from './component/SideRightBar'
import Main from './pages/Main'
import styled from 'styled-components'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signin from './pages/Signin'
import Mypage from './pages/Mypage'

const Total = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Middle = styled.div`
  background-color: pink;
  flex: 21;
  display: flex;
  flex-direction: row;
`;

function App() {
  return (
    <BrowserRouter>
      <Total>
        <Nav />
        <Middle>
          <SideLeftBar />
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