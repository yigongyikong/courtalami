import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Total = styled.div`
  /* background-color: blue; */
  flex: 8;

  background-color: blue;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  overflow-y: scroll;
`;

function MainTmp() {
  // const [testArr, setTestArr] = useState([]);
  let testArr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];


  console.log(testArr);

  return (
    <Total>
      {testArr.map( (el, idx) => {
        return (
          <div key={idx}>{el}</div>
        );
      })}
    </Total>
  )
}

export default MainTmp;