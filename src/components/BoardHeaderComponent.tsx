import { Header } from 'antd/es/layout/layout'
import { useNavigate } from 'react-router-dom'

export default function BoardHeaderComponent() {
  const navigate = useNavigate();

  return (
    <div>
      <a onClick={() => navigate('/board')} style={{cursor: 'pointer'}}>
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
      </Header></a>
    </div>
  )
}
