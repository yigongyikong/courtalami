import React from 'react'

export default function Nav() {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: 'green',
            }}
        >
            <div>LOGO</div>
            <div>Today</div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // backgroundColor: 'grey',
                }}
            >
                <div>LOGIN</div>
                <div>SIGNIN</div>
            </div>

        </div>
    )
}
