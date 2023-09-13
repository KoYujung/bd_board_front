import React, { useEffect, useState } from 'react'
import BoardService from '../service/BoardService';
import { useNavigate, useParams } from 'react-router-dom';

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
        <label>제목 </label> : {board.title}
      </div>
      <div>
        <label>내용 </label> : <textarea defaultValue={board.contents} readOnly></textarea>
      </div>
      <div>
        <label>작성자 </label> : {board.member_id}
      </div>
      <div>
        <label>작성일 </label> : {board.created_time}
      </div>
      <div><br></br>
        <button onClick={() => {navigate('/board')}}>글 목록</button>
        <button onClick={() => {navigate('/update_board/' + no)}}>글 수정</button>     
        <button onClick={() => {deleteView()}}>글 삭제</button>      
      </div>
    </div>
  )
}


