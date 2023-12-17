import React from 'react'
import styled from 'styled-components'

const Total = styled.div`
  height: 100px;
  display: flex;
  flex-direction: row;
`

function Footer() {
    return (
        <Total>
            <div>info1</div>
            <div>copyright</div>
            <div>contact</div>
        </Total>
    )
}

export default Footer