import React from 'react'
import styled from 'styled-components'
import FilterBar from '../component/FilterBar'
import Calendar from '../component/Calendar'

const Total = styled.div`
    flex: 8;
`

function Main() {
  return (
    <Total>
        <FilterBar />
        <Calendar />
    </Total>
  )
}

export default Main