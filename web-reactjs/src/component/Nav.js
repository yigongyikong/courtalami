import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Total = styled.div`
  /* background-color: #880000; */
  background-color: coral;
  width: 100%;
  height: 57px;
  display: flex;
  justify-content: center;
  align-items: center;
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
                            LOGIN(준비중)
                        </Link>
                        <Link to="/signin">
                            SIGNIN(준비중)
                        </Link>
                    </div>)
                    :
                    (<div>
                        <Link to="/">
                            LOGOUT(준비중)
                        </Link>
                        <Link to="/mypage">
                            MyPage(준비중)
                        </Link>
                    </div>)
                }
            </div>
        </Total>
    )
}

export default Nav;