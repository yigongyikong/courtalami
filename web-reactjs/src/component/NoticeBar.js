import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Total = styled.div`
  width: 100%;
  /* height: 57px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: beige;
  font-weight: bold;

  position: fixed;
  top: 1px;

  transform: translateX(100%);
  animation: scroll-right 15s linear infinite; /* 키프레임 이름, 시간, 반응 속도, 반복여부 */

  @keyframes scroll-right {
	  0% {transform: translateX(80%);}
	  100% {transform: translateX(-80%);}
	}
`

function NoticeBar() {
  const [notices, setNotices] = useState();
  const [notyIdx, setNotyIdx] = useState(0);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        setNotices();
        const response = await axios.get(`http://localhost:38080/Notice`, {});

        setNotices(response?.data);
        // setNotices("점검중");
      } catch (e) {
        console.log(e);
      }
    }

    fetchNotice();
  }, []);

  useEffect(() => {
    setInterval(() => {
      setNotyIdx( Number(notyIdx)+1 );
    }, 15000)
  });

// {/* {notices[notyIdx]?.message} */}
  return (
    <Total>
      {notices?.[notyIdx%3]?.message}
      {/* 점검중 */}
    </Total>
  )
}

export default NoticeBar;