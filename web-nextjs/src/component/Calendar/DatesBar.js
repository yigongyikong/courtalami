import React from 'react';
import DayBar from './DayBar';

export default function DatesBar(dt) {

    return (
        <div>
            {dt.d.date.map((date, idx) => {
                return (date[1].length !== 0 ?
                    <div
                        style={{
                            height: '100%',
                            width: '100%',
                            border: '1px #000123 solid',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}  key={idx}
                    >
                        <DayBar d={date} />
                    </div> :
                    <div key={idx} />)
            })}
        </div>
    )
}
