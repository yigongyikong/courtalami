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
  border: 1px #000123 solid;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

const Schema = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  border: 1px #000123 solid;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
`;

const Daily = styled.div`
  width: 100%;
  height: 100%;
  flex: 3;
  border: 1px #000123 solid;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Courts = styled.div`
  width: 100%;
  height: 100%;
  flex: 94;
  border: 1px #000123 solid;
  display: flex;
  flex-direction: row;
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
  height: 100%;
  flex: 94;
  border: 1px #000123 solid;
  display: flex;
  flex-direction: row;
`;

const DatesList = styled.div`
  width: 100%;
  height: 100%;
  flex: 3;
  border: 1px #000123 solid;
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

const TimeList = styled.div`
  width: 100%;
  height: 100%;
  flex: 94;
  border: 1px #000123 solid;
  display: flex;
  flex-direction: row;
`;

function Calendar() {

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

        let tmpAllCourtInfo = {};

        courtList?.map(async (court, idx) => {
          const response = await fetchOneCourtInfo(thisYear, thisMonth, court);

          tmpAllCourtInfo[court] = response;
        })


        setAllCourtInfo(tmpAllCourtInfo);
        // return response;
      } catch (e) {
        console.log(e);
      }
    }

    fetchCourtList();
    fetchOneCourtInfo("2024", "1", "tennis1");
    fetchAllCourtInfo("2024", "1");

  }, []);

  // console.log(courtList?.data);
  console.log(oneCourtInfo?.data?.date);
  console.log(allCourtInfo);

  // console.log(courtInfo?.data?.date[0][0]);
  // console.log(courtInfo?.data?.date[0][1]);

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
                      : (null)
                  )
                }
              )
            }
          </DatesList>
          <TimeList>
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
          </TimeList>
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