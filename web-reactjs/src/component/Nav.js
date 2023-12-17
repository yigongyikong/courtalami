import React from 'react'
import styled from 'styled-components'

const Total = styled.div`
  width: 100%;
  height: 57px;
  background-color: yellow;
  display: flex;
  flex-direction: row;
`

function Nav() {
    
    const isLogin = true;

    return (
        <Total>
            <div>
                logo
            </div>
            <div>
                current time
            </div>
            <div>
                {isLogin === true
                    ?
                    (<div>
                        <div>
                            LOGIN
                        </div>
                        <div>
                            SIGNIN
                        </div>
                    </div>)
                    :
                    (<div>
                        <div>
                            LOGOUT
                        </div>
                        <div>
                            MyPage
                        </div>
                    </div>)
                }
            </div>
        </Total>
    )
}

export default Nav