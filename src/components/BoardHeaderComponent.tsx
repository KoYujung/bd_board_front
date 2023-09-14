import { Header } from 'antd/es/layout/layout'

export default function BoardHeaderComponent() {
  return (
    <div>
      <Header
        style={{
          position: 'sticky',
          textAlign: 'center',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          color : 'white',
          fontSize : 25,
          marginBottom : 20
        }}
      >게시판
      </Header>
    </div>
  )
}
