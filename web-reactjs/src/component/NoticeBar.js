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

  position: fixed;
  top: 1px;

  transform: translateX(100%);
  animation: scroll-left 10s linear infinite; /* 키프레임 이름, 시간, 반응 속도, 반복여부 */

  @keyframes scroll-left {
	  0% {transform: translateX(-80%);}
	  100% {transform: translateX(80%);}
	}
`

function NoticeBar() {
  const [notice, setNotice] = useState();

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        setNotice();
        const response = await axios.get(`http://localhost:38080/Notice`, {
        });

        // console.log(response?.data[0]?.message);
        setNotice(response?.data[0]?.message);
      } catch (e) {
        console.log(e);
      }
    }

    fetchNotice();
  }, [])

  // console.log(notice.data);

  return (
    <Total>
      {notice}
    </Total>
  )
}

export default NoticeBar;