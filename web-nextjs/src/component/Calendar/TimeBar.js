import React from 'react';

export default async function TimeBar(t) {

  return (
    <div>

      {t.t[1] === '신청' ?
        <div
          style={{
            color: 'blue',
          }}
        >
          {t.t[0].replace(/:00/g, "")} {/* /특정문자열/ 모두 제거 */}
        </div> :
        <div
          style={{
            color: 'red',
          }}
        >
          {t.t[0].replace(/:00/g, "")}
        </div>
      }

    </div>
  )
}
