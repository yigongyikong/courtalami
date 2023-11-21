import Nav from '@/component/Nav'
import './globals.css'
import Footer from '@/component/Footer'
import FilterBar from '@/component/FilterBar'

export const metadata = {
  title: '코트 알라미',
  description: '스포츠 코트 예약 상태를 보기 편하게',
}

export default async function RootLayout({ children }) {

  return (
    <html
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: 'beige',
        margin: '10px',
        padding: '5px',
        border: '2px black solid'
      }}
    >
      <body
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          backgroundColor: 'red',
          margin: '10px',
          padding: '15px',
          border: '2px yellow solid'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            backgroundColor: 'pink'
          }}
        >
          <div
            style={{
              flex: 1,
              backgroundColor: 'olive',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <Nav />
          </div>
          <div
            style={{
              flex: 2,
              backgroundColor: '#123456',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <FilterBar />
          </div>
          <div
            style={{
              flex: 5,
              backgroundColor: '#789abc',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            {children}
          </div>
          <div
            style={{
              flex: 1,
              backgroundColor: '#def123',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <Footer />
          </div>
        </div>
      </body>
    </html>
  )
}