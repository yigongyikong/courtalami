import React from 'react';
import styled from 'styled-components';

const Total = styled.div`
  /* background-color: #000044; */
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const GoogleAdsense = styled.div`
  border: 1px #000123 solid;

  flex: 1;
`

const CoupangPartners = styled.div`
  border: 1px #000123 solid;

  flex: 1;
`

function SideRightBar() {
  return (
    <Total>
      <CoupangPartners></CoupangPartners>
      <GoogleAdsense></GoogleAdsense>
    </Total>
  )
}

export default SideRightBar;