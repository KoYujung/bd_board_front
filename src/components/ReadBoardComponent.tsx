import React, { useEffect, useState } from 'react'
import BoardService from '../service/BoardService';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'antd';
import TextArea from 'antd/es/input/TextArea';

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
    <div>
      <div>
        <h3>글 상세 조회</h3>
      </div>
      <div>
        <label>제목 </label>{board.title}
      </div>
      <div>
        <label>내용 </label><TextArea value={board.contents} readOnly>{board.contents}</TextArea>
      </div>
      <div>
        <label>작성자 </label>{board.member_id}
      </div>
      <div>
        <label>작성일 </label>{board.created_time}
      </div>
      <div>
        <Button onClick={() => navigate('/board')}>글 목록</Button>
        <Button onClick={() => navigate('/update_board/' + no)}>글 수정</Button>
        <Button danger onClick={deleteView}>글 삭제</Button>
      </div>
    </div>
  )
}


