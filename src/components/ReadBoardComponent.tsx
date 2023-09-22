import React, { useEffect, useState } from 'react'
import BoardService from '../service/BoardService';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Descriptions, DescriptionsProps } from 'antd';
import ModalComponent from './ModalComponent';

export default function ReadBoardComponent() {
  const [ board, setBoard] = useState({
    title: '',
    contents: '',
    member_id: '',
    created_time: '' ,
  });
  const { no } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    BoardService.getOneBoard(no)
      .then((data) => {
        setBoard(data);
      })
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

  function deleteView() {
    if(window.confirm("게시글을 삭제하시겠습니까? ")) {
      BoardService.deleteBoard(no)
        .then(res => {
          console.log(JSON.stringify(res.status));
          if(res != null) {
            navigate('/board');
          } else alert("글 삭제 실패");
        }) 
    } 
  }

  return (
    <>
    <Button className='MarginButton' onClick={() => navigate('/board')}>글 목록</Button>
    <Button className='MarginButton' onClick={() => navigate('/update_board/' + no)}>글 수정</Button>
    <Button className='MarginButton' danger onClick={deleteView}>글 삭제</Button>
    <Descriptions bordered items={items}/>
    <ModalComponent title={board.title} contents={board.contents}/>
    </>
  )
}

// typescript에서 props 전달할 때 타입 지정을 해줘야 함!