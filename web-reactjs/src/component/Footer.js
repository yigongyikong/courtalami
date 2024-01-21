import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import times from '../utils/times';

const Total = styled.div`
  /* background-color: #880000; */
  background-color: aliceblue;
  width: 100%;
  height: 57px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
            <div>Copyright © 2006-{updateTime?.nowYear} yigongyikong. All rights reserved.</div>
            <div>Email : yigongyikong@gmail.com</div>
        </Total>
    )
}

export default Footer;