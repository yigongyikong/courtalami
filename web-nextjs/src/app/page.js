import Calendar from '@/component/Calendar/Calendar'
import Image from 'next/image'

export default function Home() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        // margin: '5px',
        // backgroundColor: 'blue',
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'center'
      }}
    >
      <Calendar />
    </div>
  )
}
