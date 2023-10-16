import { useEffect, useState } from 'react'
import BoardService from '../service/BoardService';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Descriptions, DescriptionsProps } from 'antd';
import ModalComponent from '../components/ModalComponent';
import CommentComponent from '../components/CommentComponent';
import DeleteComponent from '../components/DeleteComponent';

export default function ReadBoardComponent()  {
  const [ board, setBoard] = useState({
    title: '',
    contents: '',
    member_id: '',
    created_time: '' ,
    view: '',
  });

  const { no } = useParams();
  const navigate = useNavigate();
  // const location = useLocation();

  useEffect(() => {
    BoardService.getOneBoard(Number(no))
      .then((data) => {
        setBoard(data);
      });
  }, [no]);

  const items: DescriptionsProps['items'] = [
    {
      label: '제목',
      children: board.title,
    },
    {
      label: '작성일',
      children: board.created_time,
      span: 2,
    },
    {
      label: '내용',
      children: board.contents,
      span: 3,
    },
  ]

  return (
    <>
    <Button className='MarginButton' onClick={() => navigate('/board')}>글 목록</Button>
    <Button className='MarginButton' onClick={() => navigate('/update_board/' + no)}>글 수정</Button>
    <DeleteComponent deleteNo={no}/>
    <p style={{float: "right", marginTop: "30px", marginRight: "20px", color: "#1677ff"}}>조회수 : {board.view}</p>
    <Descriptions bordered items={items}/>
    {/* <ModalComponent prevNo={location.state.prevNo} nextNo={location.state.nextNo} /> */}
    <ModalComponent currentNo={Number(no)} />
    <CommentComponent currentNo={Number(no)}/>
    </>
  )
}