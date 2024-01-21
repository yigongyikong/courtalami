import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../assets/courtAlami1.jpeg';
import times from '../utils/times';
import useSelectedCourtStore from '../stores/selectedCourt';

const Total = styled.div`
  /* background-color: #880000; */
  /* background-color: coral; */
  width: 100%;
  height: 57px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`

const Logo = styled.div`
  /* border: 1px #000123 solid; */
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const UpdateTime = styled.div`
   /* border: 1px #000123 solid; */
   flex: 3;
   display: flex;
   justify-content: center;
   align-items: center;
`

const LoginSignin = styled.div`
   /* border: 1px #000123 solid; */
   flex: 1;
   display: flex;
   justify-content: center;
   align-items: center;
   font-size: x-small;
`

function Nav() {
    const isLogin = true;
    const [updateTime, setUpdateTime] = useState();

    const { selectedCourt } = useSelectedCourtStore();

    useEffect(() => {
        const fetchUpdateTime = () => {
            setUpdateTime();
            const getTimes = times();
            setUpdateTime(getTimes);
        }

        fetchUpdateTime();
    }, [selectedCourt])

    return (
        <Total>
            <Logo>
                <Link to="/">
                    <img src={logo} alt="logo" width="50px" height="50px" />
                </Link>
            </Logo>
            <UpdateTime>
                업데이트 시간:{updateTime?.nowYear}년{updateTime?.nowMonth}월 {updateTime?.nowDay}일 {updateTime?.nowHour}시 {updateTime?.nowMinutes}분
            </UpdateTime>
            <LoginSignin>
                {isLogin === true
                    ?
                    (<div>
                        {/* <Link to="/login"> */}
                            로그인(준비중)
                        {/* </Link> */}
                        {/* <Link to="/signin"> */}
                            회원가입(준비중)
                        {/* </Link> */}
                    </div>)
                    :
                    (<div>
                        {/* <Link to="/"> */}
                            로그아웃(준비중)
                        {/* </Link> */}
                        {/* <Link to="/mypage"> */}
                            마이페이지(준비중)
                        {/* </Link> */}
                    </div>)
                }
            </LoginSignin>
        </Total>
    )
}

export default Nav;