import React from 'react';
import styled from 'styled-components';

const Total = styled.div`
  /* background-color: #000044; */
  flex: 1;

  background-color: burlywood;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function SideLeftBar() {
  return (
    <Total>SideLeftBar</Total>
  )
}

export default SideLeftBar;