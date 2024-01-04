import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';


const Total = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  background-color: beige;
  border: 10px white soild;
`;

const Table = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  /* border: 1px #000123 solid; */
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

const Schema = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  /* border: 1px #000123 solid; */
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
`;

const Daily = styled.div`
  width: 100%;
  height: 100%;
  flex: 3;
  /* border: 1px #000123 solid; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Courts = styled.div`
  width: 100%;
  height: 100%;
  flex: 94;
  /* border: 1px #000123 solid; */
  display: flex;
  flex-direction: row;
`;

const Court = styled.div`
  width: 100%;
  height: 100%;
  /* border: 1px #000123 solid; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TimeTable = styled.div`
  width: 100%;
  height: 100%;
  flex: 94;
  /* border: 1px #000123 solid; */
  display: flex;
  flex-direction: row;
`;

const DatesList = styled.div`
  width: 100%;
  height: 100vh;
  flex: 3;
  /* border: 1px #000123 solid; */
  display: flex;
  flex-direction: column;
`;

const Date = styled.div`
  flex: 1;
  border: 1px #000123 solid;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AllCourtSchedule = styled.div`
  width: 100%;
  /* height: 100%; */
  height: 100vh;
  flex: 94;
  /* border: 1px #000123 solid; */
  display: flex;
  flex-direction: row;
`;

const OneCourtSchedule = styled.div`
  width: 100%;
  height: 100%;
  border: 1px #000123 solid;
`;


const OneCourtFrame = styled.div`
  flex: 1;
  height: fit-content;
  width: fit-content;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`;


const TimeGrid = styled.div`
  border: 1px #000123 solid;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  justify-content: center;
`;

const TimeBar = styled.div`
  align-items: center;
  justify-content: center;
`;

const OpenTime = styled.div`
  color: blue;
  font-size: xx-small;
`;

const CloseTime = styled.div`
  color: red;
  font-size: xx-small;
`;

function Calendar(date) {

  console.log(date)
  const [courtList, setCourtList] = useState();
  const [oneCourtInfo, setOneCourtInfo] = useState({});
  const [allCourtInfo, setAllCourtInfo] = useState({});

  useEffect(() => {
    const fetchCourtList = async () => {
      try {
        setCourtList();
        // SeozoCourtList
        // const response = await axios.get('http://localhost:38080/SaemulCourtList', {
        const response = await axios.get('http://localhost:38080/SeozoCourtList', {
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
        const response = await axios.post('http://localhost:38080/SeozoOneCourtInfo', {
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
        const response = await axios.post('http://localhost:38080/SeozoAllCourtInfo', {
          "thisYear": thisYear,
          "thisMonth": thisMonth,
        });

        setAllCourtInfo(response);
        return response;
      } catch (e) {
        console.log(e);
      }
    }

    fetchCourtList();
    fetchOneCourtInfo(date.year, date.month, "tennis1");
    fetchAllCourtInfo(date.year, date.month);

  }, []);

  console.log(allCourtInfo);

  return (
    <Total>
      <Table>
        {oneCourtInfo?.data?.thisYear}년 {oneCourtInfo?.data?.thisMonth}월 {oneCourtInfo?.data?.courtName}-코트장
        <Schema>
          <Daily>
            일
          </Daily>
          <Courts>
            {
              courtList?.data.map(
                (crt, idx) => {
                  return (
                    <Court key={idx}>
                      {crt}
                    </Court>
                  );
                }
              )
            }
          </Courts>
          <Daily>
            일
          </Daily>
        </Schema>
        <TimeTable>
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
          <AllCourtSchedule>
            {
              allCourtInfo?.data?.map(
                (courtInfo, idx) => {
                  return (
                    <OneCourtSchedule key={idx}>
                      <OneCourtFrame>
                        {
                          courtInfo?.date.map(
                            (oneCourt, idx) => {
                              // console.log(idx);
                              // console.log(oneCourt);
                              // console.log(oneCourt[1].length);
                              return (
                                oneCourt[1].length !== 0
                                  ?
                                  <TimeGrid key={idx}>
                                    {
                                      oneCourt[1]?.map(
                                        (timeList, idx) => {
                                          // console.log(timeList);
                                          return (
                                            <TimeBar key={idx}>
                                              {timeList[1] === '신청'
                                                ? <OpenTime>/ {timeList[0]?.replace(/:00/g, "")} /</OpenTime>
                                                : <CloseTime>/ {timeList[0]?.replace(/:00/g, "")} /</CloseTime>}
                                            </TimeBar>
                                          );
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
                      </OneCourtFrame>
                    </OneCourtSchedule>
                  );
                }
              )
            }
          </AllCourtSchedule>
          <DatesList>
            {
              oneCourtInfo?.data?.date.map(
                (day, idx) => {
                  return (
                    day[1].length !== 0 ?
                      (<Date key={idx}>
                        {day[0]}
                      </Date>)
                      : (null)
                  )
                }
              )
            }
          </DatesList>
        </TimeTable>
        <Schema>
          <Daily>
            일
          </Daily>
          <Courts>
            {
              courtList?.data.map(
                (crt, idx) => {
                  return (
                    <Court key={idx}>
                      {crt}
                    </Court>
                  );
                }
              )
            }
          </Courts>
          <Daily>
            일
          </Daily>
        </Schema>
      </Table>
    </Total>
  )
}

export default Calendar;