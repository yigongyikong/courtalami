import React from 'react'
import styled from 'styled-components'
import useSelectedCourtStore from '../stores/selectedCourt';

const Total = styled.div`
  width: 100%;
  height: 66px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

function FilterBar() {
  const { selectedCourt, setSelectedCourt } = useSelectedCourtStore();

  const handleChangeSelect = (e) => {
    setSelectedCourt(e.target.value);
  }

  // console.log(selected);
  // console.log(selectedCourt);

  return (
    <Total>
      <select onChange={handleChangeSelect}>
        <option value="Saemul">안양도시공사-새물공원</option>
        <option value="Seozo">안양도시공사-서조체육시설</option>
      </select>
    </Total>
  )
}

export default FilterBar