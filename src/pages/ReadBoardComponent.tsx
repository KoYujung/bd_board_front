import { useEffect, useState } from 'react'
import BoardService from '../service/BoardService';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Descriptions, DescriptionsProps } from 'antd';
import ModalComponent from '../components/ModalComponent';
import CommentComponent from '../components/CommentComponent';
import DeleteComponent from '../components/DelModalComponent';
import { couldStartTrivia } from 'typescript';

export default function ReadBoardComponent()  {
  const [ board, setBoard] = useState({
    title: '',
    contents: '',
    member_id: '',
    created_time: '' ,
    view: '',
    fid: '',
    fname: '',
    fpath: '',
    files: '',
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

  const download = (id: string) => {
    BoardService.download(id)
    .then((data) => {
      console.log(data);
      return data;
    })
  }

  const items: DescriptionsProps['items'] = [
    {
      label: '제목',
      children: board.title,
      span: 3,
    },
    {
      label: '작성일',
      children: board.created_time,
      span: 2,
    },
    {
      label: '작성자',
      children: board.member_id,
    },
    {
      label: '내용',
      children: board.contents,
      span: 3,
    },
    {
      label: '첨부파일',
      children: <a href={"http://localhost:8080/download/" + board.fid} target='_blank' rel="noreferrer" download>{board.fname}</a>,
      span: 3,
    },
  ]

  return (
    <>
    <Button className='MarginButton' onClick={() => navigate('/board')}>글 목록</Button>
    <Button className='MarginButton' onClick={() => navigate('/update_board/' + no)}>글 수정</Button>
    <DeleteComponent deleteNo={Object([no])}/>
    <p style={{float: 'right', marginTop: '30px', marginRight: '20px', color: '#1677ff'}}>조회수 : {board.view}</p>
    <Descriptions bordered items={items} />
    {/* <ModalComponent prevNo={location.state.prevNo} nextNo={location.state.nextNo} /> */}
    <ModalComponent currentNo={Number(no)} />
    <CommentComponent currentNo={Number(no)} />
    </>
  )
}

//download api도 따로 추가해서 서버에서 다운로드할 수 있는 형식으로 처리해서 클라이언트로 받아와야함