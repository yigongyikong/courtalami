import React from 'react'
import styled from 'styled-components'

const Total = styled.div`
  flex: 3;
  display: flex;
  flex-direction: row;
  background-color: skyblue;
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