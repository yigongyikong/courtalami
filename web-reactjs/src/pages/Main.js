import React from 'react';
import styled from 'styled-components';
import NoticeBar from '../component/NoticeBar';
import FilterBar from '../component/FilterBar';
import Calendar from '../component/Calendar';

const Total = styled.div`
  /* background-color: blue; */
  flex: 8;

  background-color: blue;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: start; // 수직정렬
  align-items: center; // 수평정렬
  flex-direction: column;

  overflow-x: scroll;
`

function Main() {

  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const sysNow = new Date();
  const nowUtc = sysNow.getTime() + (sysNow.getTimezoneOffset() * 60 * 1000);
  const nowKst = new Date(nowUtc + (KR_TIME_DIFF));
  let nowYear = nowKst.getFullYear();
  let nowMonth = nowKst.getMonth() + 1; // Get the month, from 0 to 11.

  return (
    <Total>
      <NoticeBar />
      <FilterBar />
      <Calendar year={nowYear} month={nowMonth} />
      {/* <MidAd></MidAd> */}
      {/* <Calendar year={nowYear} month={nowMonth} /> */}
      {/* <Calendar year={nowMonth === '12' ? nowYear+1 : nowYear} month={nowMonth === '12' ? 1 : nowMonth+1} /> */}
    </Total>
  )
}

export default Main