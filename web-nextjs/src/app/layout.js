import Nav from '@/component/Nav'
import './globals.css'
import Footer from '@/component/Footer'
import FilterBar from '@/component/FilterBar'
import SideLeftBar from '@/component/SideLeftBar'
import SideRightBar from '@/component/SideRightBar'

export const metadata = {
  title: '코트 알라미',
  description: '스포츠 코트 예약 상태를 보기 편하게',
}

export default async function RootLayout({ children }) {

  return (
    <html
      style={{
        width: '100%',
        height: '100%',
        // margin: '5px',
        // border: '4px green solid',
        // backgroundColor: 'beige',
        // margin: '10px',
        // padding: '5px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <body
        style={{
          // height: '100%',
          // width: '100%',
          // margin: '5px',
          // border: '2px black solid',
          // backgroundColor: 'red',
          // margin: '10px',
          // padding: '15px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            // height: '100%',
            // width: '100%',
            // margin: '5px',
            border: '4px skyblue solid',
            display: 'flex',
            flexDirection: 'column',
            // backgroundColor: 'pink'
          }}
        >
          <div
            style={{
              width: '100%',
              height: '57px',
              // flex: 1,
              border: '2px red solid',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <Nav />
          </div>
          <div
            style={{
              width: '100%',
              height: '66px',
              // flex: 3,
              border: '4px orange solid',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <FilterBar />
          </div>

          <div
            style={{
              width: '100%',
              flex: 21,
              border: '2px yellow solid',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%'
              }}
            >
              <SideLeftBar />
              {children}
              <SideRightBar />
            </div>

          </div>
          <div
            style={{
              width: '100%',
              flex: 3,
              border: '4px green solid',
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