import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import times from '../utils/times';
import footBack from '../assets/angtuka2.jpg';

const Total = styled.div`
  /* background-color: #880000; */
  /* background-color: aliceblue; */
  background-size: 114px;
  background-image: url(${footBack});
  background-repeat: repeat-x;
  opacity: 90%;
  width: 100%;
  height: 57px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  color: greenyellow;
  font-weight: bold;
`

function Footer() {
    const [updateTime, setUpdateTime] = useState();

    useEffect(() => {
        const fetchUpdateTime = () => {
            setUpdateTime();
            const getTimes = times();
            setUpdateTime(getTimes);
        }

        fetchUpdateTime();
    }, [])

    return (
        <Total>
            <div>Copyright © 2020-{updateTime?.nowYear} yigongyikong. All rights reserved.</div>
            <div>Email : yigongyikong@gmail.com</div>
        </Total>
    )
}

export default Footer;