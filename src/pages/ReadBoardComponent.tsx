import React, { useEffect, useState } from 'react'
import BoardService from '../service/BoardService';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Descriptions, DescriptionsProps, Form, Input } from 'antd';
import ModalComponent from '../components/ModalComponent';

interface commentType{
  cno: number,
  bno: number,
  c_created_time: Date,
  c_contents: string
}

export default function ReadBoardComponent()  {
  const [ board, setBoard] = useState({
    title: '',
    contents: '',
    member_id: '',
    created_time: '' ,
  });
  const [ comment, setComment ] = useState<any>('');
  const [ comList, setComList ] = useState<commentType>();

  const { no } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // console.log(location.state);
  console.log(comList);

  useEffect(() => {
    BoardService.getOneBoard(no)
      .then((data) => {
        setBoard(data);
      });
    
    BoardService.getComment(no)
      .then((data) => {
        setComList(data);
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

  const deleteView = () => {
    if(window.confirm("게시글을 삭제하시겠습니까? ")) {
      BoardService.changeUseYN(no)
        .then(res => {
          console.log(JSON.stringify(res.status));
          if(res != null) {
            navigate('/board');
          } else alert("글 삭제를 실패하였습니다");
        }) 
    } 
  }
  
  const InputComment = (e : React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  }

  const addComments = () => {
    console.log(comment);
    if(comment === '') {
      alert("내용을 입력해주세요");
    } else {
      BoardService.addComment(no,comment)
      .then(() => {
        window.location.replace('/read_board/' + no);
        setComList(comment);
      })
      .catch(error => {
        console.error(error);
      });
    }
  }

  return (
    <>
    <Button className='MarginButton' onClick={() => navigate('/board')}>글 목록</Button>
    <Button className='MarginButton' onClick={() => navigate('/update_board/' + no)}>글 수정</Button>
    <Button className='MarginButton' danger onClick={deleteView}>글 삭제</Button>
    <Descriptions bordered items={items}/>
    {/* <ModalComponent currentNo={Number(no)} /> */}
    <ModalComponent prevNo={location.state.prevNo} nextNo={location.state.nextNo} />

    <h3 style={{marginTop: '60px'}}>댓글</h3>

    <Form style={{ display: 'flex', alignItems: 'center', marginBottom: '40px'}}>
        <Input value={comment} onChange={InputComment} placeholder='댓글을 입력해주세요' 
        style={{ width: '40%', height: '60px', marginRight: '10px'}}/>
        <Button style={{height: '60px'}} onClick={addComments}>댓글 작성</Button>
    </Form>
    <h3>댓글 목록</h3>
    <p></p>
    </>
  )
}