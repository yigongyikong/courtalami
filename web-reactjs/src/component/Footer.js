import React from 'react';
import styled from 'styled-components';

const Total = styled.div`
  /* background-color: #880000; */
  background-color: aliceblue;
  width: 100%;
  height: 57px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`

function Footer() {
    return (
        <Total>
            <div>info1</div>
            <div>copyright</div>
            <div>contact</div>
        </Total>
    )
}

export default Footer;