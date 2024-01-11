import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import useSelectedCourtStore from '../stores/selectedCourt';


const Total = styled.div`
  width: 100%;
  flex: 1;
  /* height: 400px; */
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

const TableInfo = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;

const TableContents = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  /* border: 1px #000123 solid; */
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
`;

const DateInfo = styled.div`
  /* border: 1px #000123 solid; */

  width: 100%;
  height: 100%;
  flex: 3;
  
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const DateScheme = styled.div`
  border: 1px #000123 solid;

  width: 100%;
  height: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DatesList = styled.div`
  /* border: 1px #000123 solid; */

  width: 100%;
  height: 90vh;
  /* height: auto; */
  flex: 1;
  
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


const CourtInfo = styled.div`
  /* border: 1px #000123 solid; */

  width: 100%;
  height: 100%;
  flex: 94;
  
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const CourtScheme = styled.div`
  border: 1px #000123 solid;

  width: 100%;
  height: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;





const Court = styled.div`
  width: 100%;
  height: 100%;
  border: 1px #000123 solid;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TimeTable = styled.div`
  width: 100%;
  /* height: 100%; */
  height: 100vh; // 20240111-modify
  flex: 94;
  /* border: 1px #000123 solid; */
  display: flex;
  flex-direction: row;
`;



const AllCourtSchedule = styled.div`
  width: 100%;
  /* height: 100%; */
  height: 100vh;
  flex: 94;
  /* border: 1px #000123 solid; */
  display: flex;
  flex-direction: row;

  overflow-x: scroll;
`;

const OneCourtSchedule = styled.div`
  width: 100%;
  /* height: 100%; */
  height: 100vh;
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
  color: #ff7f00;
  background-color: blue;
  border-radius: 50%;
  /* font-size: 1em; */
  /* font-size: 1vw, 1vh; */
  /* text-size-adjust: auto; */
  font-size: xx-small;
`;

const CloseTime = styled.div`
  color: #005666;
  background-color: red;
  border-radius: 50%;
  /* font-size: 1em; */
  /* font-size: 1vw, 1vh; */
  /* text-size-adjust: auto; */
  font-size: xx-small;
`;

function Calendar(date) {

  const [courtList, setCourtList] = useState();
  const [oneCourtInfo, setOneCourtInfo] = useState({});
  const [allCourtInfo, setAllCourtInfo] = useState({});

  const { selectedCourt } = useSelectedCourtStore();

  useEffect(() => {
    const fetchCourtList = async () => {
      try {
        setCourtList();
        // const response = await axios.get('http://localhost:38080/SaemulCourtList', {
        // const response = await axios.get('http://localhost:38080/SeozoCourtList', {
        const response = await axios.get(`http://localhost:38080/${selectedCourt}CourtList`, {
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
        const response = await axios.post(`http://localhost:38080/${selectedCourt}OneCourtInfo`, {
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
        const response = await axios.post(`http://localhost:38080/${selectedCourt}AllCourtInfo`, {
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

  }, [selectedCourt, date]);

  return (
    <Total>
      <Table>
        <TableInfo>
          {oneCourtInfo?.data?.thisYear}년 {oneCourtInfo?.data?.thisMonth}월 {oneCourtInfo?.data?.courtName}-코트장
        </TableInfo>

        <TableContents>
          <DateInfo>
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
          <CourtInfo>
            <CourtScheme>
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
            </CourtScheme>




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
                                                  ? <OpenTime>{timeList[0]?.replace(/:00/g, "")}</OpenTime>
                                                  : <CloseTime>{timeList[0]?.replace(/:00/g, "")}</CloseTime>}
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



            <CourtScheme>
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
            </CourtScheme>
          </CourtInfo>
          <DateInfo>
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