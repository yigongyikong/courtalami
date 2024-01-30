import React, { useEffect } from 'react';
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

function SideLeftBar() {

  useEffect(() => {
    if (window) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  });

  return (
    <Total>
      <GoogleAdsense>
        <>
          <ins class="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-6911236723814140"
            data-ad-slot="3643639023"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
        </>
      </GoogleAdsense>
      <CoupangPartners>
        <iframe src="https://ads-partners.coupang.com/widgets.html?id=752894&template=carousel&trackingCode=AF9292957&subId=&width=67&height=50%&tsource=" width="67" height="50%" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
      </CoupangPartners>
    </Total>
  )
}

export default SideLeftBar;