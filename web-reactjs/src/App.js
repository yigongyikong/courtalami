import './App.css'
import Footer from './component/Footer';
import Nav from './component/Nav'
import SideLeftBar from './component/SideLeftBar';
import SideRightBar from './component/SideRightBar';
import Main from './pages/Main';
import styled from 'styled-components';

const Total = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Middle = styled.div`
  background-color: pink;
  flex: 1;
  display: flex;
  flex-direction: row;
`;

function App() {
  return (
    <Total>
      <Nav />
      <Middle>
        <SideLeftBar />
        <Main />
        <SideRightBar />
      </Middle>
      <Footer />
    </Total>
  );
}

export default App;