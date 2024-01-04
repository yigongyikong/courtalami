import React from 'react'
import styled from 'styled-components'

const Total = styled.div`
  width: 100%;
  height: 66px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

function FilterBar() {
  return (
    <Total>
      <select>
        <option>안양도시공사-새물공원</option>
        <option>안양도시공사-서조체육시설</option>
      </select>
    </Total>
  )
}

export default FilterBar