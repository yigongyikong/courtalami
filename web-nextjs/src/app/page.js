import Calendar from '@/component/Calendar/Calendar';
import Image from 'next/image'

export default function Home() {
  return (
    <div
      style={{
        flex: 8,
        // width: '100%',
        // height: '100%',
      }}
    >
      <Calendar />
    </div>
  )
}
