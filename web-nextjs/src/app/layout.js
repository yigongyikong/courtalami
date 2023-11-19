// "use client";

import Link from 'next/link'
import './globals.css'
import { Control } from './Control';
// import { useEffect, useState } from 'react'

export const metadata = {
  title: '코트 알라미',
  description: '보기 쉬운 코트 예약 상태 페이지입니다.',
}


export default async function RootLayout({ children }) {
  // const [topics, setTopics] = useState([]);
  // useEffect(() => {
  //   fetch('http://localhost:9999/topics')
  //     .then((resp) => { return resp.json(); })
  //     .then(result => {
  //       console.log(result)
  //       setTopics(result);
  //     });
  // }, []);

  // const resp = await fetch('http://localhost:9999/topics', { next: { revalidate: 10 } }); // 10초간만 캐시에 저장하고 지움
  // const resp = await fetch('http://localhost:9999/topics', { next: { revalidate: 0 } }); // 캐시를 사용하지 않는 격
  // const resp = await fetch('http://localhost:9999/topics', { cache: 'no-store' });
  const resp = await fetch(process.env.NEXT_PUBLIC_API_URL+'topics', { cache: 'no-store' });
  const topics = await resp.json();

  return (
    <html>
      <body>
        <h1><Link href='/'>WEB</Link></h1>
        <ol>
          {/* <li><Link href='/read/1'>html</Link></li>
          <li><Link href='/read/2'>css</Link></li> */}
          {topics.map((topic) => {
            return <li key={topic.id}><Link href={`/read/${topic.id}`}>{topic.title}</Link></li>
          })}
        </ol>
        {children}
        {/* <ul>
          <li><Link href='/create'>Create</Link></li>
          <li><Link href='/update/1'>Update</Link></li>
          <li><input type="button" value="delete" /></li>
        </ul> */}
        <Control />
      </body>
    </html>
  )
}
