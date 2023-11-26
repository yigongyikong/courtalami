import React from 'react';


export default async function TimeBar(t) {
  console.log(`\n`);
  console.log(t.t[0]);
  console.log(t.t[1]);
  console.log(`\n`);

  return (
    <div>
      {`time: ${t.t[0]} | state: ${t.t[1]}`}
      {/* <h1>{resp.nowMonth}</h1> */}
    </div>
  )
}
