import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import useSelectedCourtStore from '../stores/selectedCourt';
import { courtMapper } from '../courtName/courtMapper';

const Total = styled.div`
  border: 1px #000123 solid;
  flex: 1;
  width: 100%;

  display: flex;
  flex-direction: column;
  /* justify-content: center;
  align-items: center; */
  background-color: beige;

  /* overflow-y: scroll; */
`;
const Table = styled.div`
  /* border: 1px #000123 solid; */
  flex: 1;
  width: 100%;

  display: flex;
  flex-direction: column;
  /* justify-content: start; */
  justify-content: center;
  align-items: center;
`;
const TableInfo = styled.div`
  border: 1px #000123 solid;
  width: 100%;
  height: 30px;

  display: flex;
  /* justify-content: start; */
  justify-content: center;
  align-items: center;
`;
const TableContents = styled.div`
  /* border: 1px #000123 solid; */
  flex: 1;
  width: 100%;
  /* height: 100%; */
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const DateInfo = styled.div`
  border: 1px #000123 solid;
  flex: 3;
  width: 100%;
  height: 100%;
  
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const DateScheme = styled.div`
  border: 1px #000123 solid;
  flex: 1;
  width: 100%;
  /* height: 5vh; */

  display: flex;
  justify-content: center;
  align-items: center;
`;
const DatesList = styled.div`
  border: 1px #000123 solid;
  flex: 98;
  width: 100%;
  /* height: 90vh; */
  /* height: 100%; */
  
  display: flex;
  flex-direction: column;
`;
const Date = styled.div`
  border: 1px #000123 solid;
  flex: 1;

  display: flex;
  justify-content: center;
  align-items: center;
`;


const AllCourtInfo = styled.div`
  border: 1px #000123 solid;
  flex: 94;
  width: 100%;
  height: 100%;
  
  display: flex;
  /* justify-content: center;
  align-items: center; */ /* center로 하면 x-축 overflow 적용시 tennis1 짤림 */
  flex-direction: row;

  overflow-x: scroll;
`;
const OneCourtInfo = styled.div`
  flex: 1;
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
`;
const CourtScheme = styled.div`
  border: 1px #000123 solid;
  flex: 1;
  width: 100%;
  
  display: flex;
  justify-content: center;
  align-items: center;
`;
const OneCourtAllTime = styled.div`
/* background-color: crimson; */
  border: 1px #000123 solid;
  flex: 98;
  width: 100%;

  display: flex;
  flex-direction: column;
`;
const TimeGrid = styled.div`
  /* background-color: crimson; */
  /* margin: 2px; */
  border: 1px #000123 solid;
  flex: 1;
  width: 100%;

  display: grid;
  /* grid-template-columns: repeat(4, 1fr); */
  grid-template-columns: repeat(3, 1fr);
  /* grid-template-columns: repeat(2, 1fr); */
  align-items: center;
  justify-content: center;
`;
const TimeBar = styled.div`
  /* flex: 1; */
  margin: 1px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
const OpenTime = styled.div`
  color: blue;
  background-color: greenyellow;
  border-radius: 30%;
  text-size-adjust: auto;
  max-width: 65px;
  max-height: 19px;
  overflow-y: scroll;
`;
const CloseTime = styled.div`
  color: red;
  border-radius: 30%;
  text-size-adjust: auto;
  max-width: 65px;
  max-height: 19px;
  overflow-y: scroll;
`;

function Calendar(date) {

  const [courtList, setCourtList] = useState();
  const [oneCourtInfo, setOneCourtInfo] = useState({});
  const [allCourtInfo, setAllCourtInfo] = useState({});
  const [maxCourtCnt, setMaxCourtCnt] = useState(0);

  const { selectedCourt } = useSelectedCourtStore();

  useEffect(() => {
    const fetchCourtList = async () => {
      try {
        setCourtList();
        // const response = await axios.get('http://localhost:38080/SaemulCourtList', {
        // const response = await axios.get('http://localhost:38080/SeozoCourtList', {
        const response = await axios.get(`${process.env.REACT_APP_API_NODEJS_EP}/${selectedCourt}CourtList`, {
        // const response = await axios.get(`http://localhost:38080/${selectedCourt}CourtList`, {
        });

        setCourtList(response);
      } catch (e) {
        console.log(e);
      }
    }

    const fetchOneCourtInfo = async (thisYear, thisMonth, court) => {
      try {
        setOneCourtInfo({});

        // const response = await axios.post('http://localhost:38080/SaemulOneCourtInfo', {
        // const response = await axios.post('http://localhost:38080/SeozoOneCourtInfo', {
        const response = await axios.post(`${process.env.REACT_APP_API_NODEJS_EP}/${selectedCourt}OneCourtInfo`, {
        // const response = await axios.post(`http://localhost:38080/${selectedCourt}OneCourtInfo`, {
          "thisYear": thisYear,
          "thisMonth": thisMonth,
          "court": court
        });

        setOneCourtInfo(response);
        return response;
      } catch (e) {
        console.log(e);
      }
    }

    const fetchAllCourtInfo = async (thisYear, thisMonth) => {
      try {
        setAllCourtInfo({});

        // const response = await axios.post('http://localhost:38080/SaemulAllCourtInfo', {
        // const response = await axios.post('http://localhost:38080/SeozoAllCourtInfo', {
        const response = await axios.post(`${process.env.REACT_APP_API_NODEJS_EP}/${selectedCourt}AllCourtInfo`, {
        // const response = await axios.post(`http://localhost:38080/${selectedCourt}AllCourtInfo`, {
          "thisYear": thisYear,
          "thisMonth": thisMonth,
        })

        setAllCourtInfo(response);
        return response;
      } catch (e) {
        console.log(e);
      }
    }

    const fetchMaxCourtCnt = async (thisYear, thisMonth) => {
      try {
        setMaxCourtCnt();

        const response = await axios.post(`${process.env.REACT_APP_API_NODEJS_EP}/${selectedCourt}MaxCourtCnt`, {
        // const response = await axios.post(`http://localhost:38080/${selectedCourt}MaxCourtCnt`, {
          "thisYear": thisYear,
          "thisMonth": thisMonth,
        })
        setMaxCourtCnt(response.data);
        return response.data;

      } catch (e) {
        console.log(e);
      }
    }

    fetchCourtList();
    fetchOneCourtInfo(date.year, date.month, "tennis1");
    fetchAllCourtInfo(date.year, date.month);
    fetchMaxCourtCnt(date.year, date.month);
  }, [selectedCourt, date]);


  // console.log(courtMapper["Saemul"])


  return (
    <Total>
      <Table>
        <TableInfo>  {/* 상단 날짜 및 코트장 이름 */}
          <OpenTime>신청-가능</OpenTime>
          {oneCourtInfo?.data?.thisYear}년 {oneCourtInfo?.data?.thisMonth}월 {courtMapper[`${oneCourtInfo?.data?.courtName}`]}-코트장
          <CloseTime>신청-불가</CloseTime>
        </TableInfo>

        <TableContents>

          <DateInfo> {/* 좌측 날짜 열 */}
            <DateScheme>
              일
            </DateScheme>
            <DatesList>
              {
                oneCourtInfo?.data?.date.map(
                  (day, idx) => {
                    return (
                      day[1].length !== 0 ?
                        (<Date key={idx}>
                          {day[0]}
                        </Date>)
                        : null
                    )
                  }
                )
              }
            </DatesList>
            <DateScheme>
              일
            </DateScheme>
          </DateInfo>

          <AllCourtInfo> {/* 중앙 코트 정보 */}
            {
              allCourtInfo?.data?.map(
                (courtInfo, idx) => {
                  return (
                    <OneCourtInfo key={idx}>
                      <CourtScheme>
                        {courtList.data[idx]}
                      </CourtScheme>
                      <OneCourtAllTime>
                        {
                          courtInfo?.date.map(
                            (oneCourt, idx) => {

                              let addEmptyTimeBar = maxCourtCnt - oneCourt[1].length;
                              let emptyBarArr = [];
                              for (let i = 0; i < addEmptyTimeBar; i++) {
                                emptyBarArr.push(i);
                              }

                              return (
                                oneCourt[1].length !== 0
                                  ?
                                  <TimeGrid key={idx}>
                                    {
                                      oneCourt[1]?.map(
                                        (timeList, idx) => {
                                          return (
                                            <TimeBar key={idx}>
                                              {timeList[1] === '신청'
                                                ? <OpenTime>
                                                  <a href='https://www.auc.or.kr/reservation/program/rental/calendar?menuLevel=2&menuNo=371&'>
                                                    {timeList[0]?.replace(/:00/g, "")}
                                                  </a>
                                                </OpenTime>
                                                : <CloseTime> {timeList[0]?.replace(/:00/g, "")} </CloseTime>}
                                            </TimeBar>
                                          );
                                        }
                                      )
                                    }
                                    {
                                      emptyBarArr?.map(
                                        (dummyTimeList, idx) => {
                                          return (
                                            <TimeBar key={idx}>
                                              <CloseTime>00-00</CloseTime>
                                            </TimeBar>
                                          )
                                        }
                                      )
                                    }
                                  </TimeGrid>
                                  :
                                  <div key={idx} />
                              );
                            }
                          )
                        }
                      </OneCourtAllTime>
                      <CourtScheme>
                        {courtList.data[idx]}
                      </CourtScheme>
                    </OneCourtInfo>
                  );
                }
              )
            }
          </AllCourtInfo>

          <DateInfo> {/* 우측 날짜 열 */}
            <DateScheme>
              일
            </DateScheme>
            <DatesList>
              {
                oneCourtInfo?.data?.date.map(
                  (day, idx) => {
                    return (
                      day[1].length !== 0 ?
                        (<Date key={idx}>
                          {day[0]}
                        </Date>)
                        : null
                    )
                  }
                )
              }
            </DatesList>
            <DateScheme>
              일
            </DateScheme>
          </DateInfo>

        </TableContents>
      </Table>
    </Total>
  )
}

export default Calendar;