import React from 'react'
import styled from 'styled-components'

const Total = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: beige;
  border: 10px white soild;
`

const Table = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  border: 1px #000123 solid;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`

const Weekly = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  border: 1px #000123 solid;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
`

const Daily = styled.div`
  width: 100%;
  height: 100%;
  flex: 3;
  border: 1px #000123 solid;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Courts = styled.div`
  width: 100%;
  height: 100%;
  flex: 94;
  border: 1px #000123 solid;
  display: flex;
  flex-direction: row;
`

const TimeTable = styled.div`
  width: 100%;
  height: 100%;
  flex: 94;
  border: 1px #000123 solid;
  display: flex;
  flex-direction: row;
`

function Calendar() {
    return (
        <Total>
            <Table>
                12월 18일
                <Weekly>
                    <Daily>
                        day
                    </Daily>
                    <Courts>
                        crt
                    </Courts>
                    <Daily>
                        day
                    </Daily>
                </Weekly>
                <TimeTable>
                    timetable
                </TimeTable>
            </Table>
        </Total>
    )
}

export default Calendar