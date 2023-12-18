import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

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
            <Link to="/">
                logo
            </Link>
            <div>
                current time
            </div>
            <div>
                {isLogin === true
                    ?
                    (<div>
                        <Link to="/login">
                            LOGIN
                        </Link>
                        <Link to="/signin">
                            SIGNIN
                        </Link>
                    </div>)
                    :
                    (<div>
                        <Link to="/">
                            LOGOUT
                        </Link>
                        <Link to="/mypage">
                            MyPage
                        </Link>
                    </div>)
                }
            </div>
        </Total>
    )
}

export default Nav