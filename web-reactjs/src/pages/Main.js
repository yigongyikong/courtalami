import React from 'react'
import styled from 'styled-components'
import FilterBar from '../component/FilterBar'
import Calendar from '../component/Calendar'
import MidAd from '../component/MidAd'

const Total = styled.div`
    flex: 8;
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
        <FilterBar />
        <Calendar year={nowYear} month={nowMonth} />
        <MidAd></MidAd>
        {/* <Calendar year={nowMonth === '12' ? nowYear+1 : nowYear} month={nowMonth === '12' ? 1 : nowMonth+1} /> */}
    </Total>
  )
}

export default Main