import { Button, Descriptions, Form, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import BoardService from '../service/BoardService';
import { useParams } from 'react-router-dom';

interface commentType{
    cno: number,
    bno: number,
    c_created_time: Date,
    c_contents: string
  }

export default function CommentComponent() {

    const [ comment, setComment ] = useState<any>('');
    const [ comList, setComList ] = useState<Array<commentType>>();

    const { no } = useParams();

    useEffect(() => {        
        BoardService.getComment(no)
          .then((data) => {
            console.log(data)
            setComList(data);
          });
      }, [no]);

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
        <h3 style={{marginTop: '60px'}}>댓글</h3>

        <Form style={{ display: 'flex', alignItems: 'center', marginBottom: '40px'}}>
            <Input value={comment} onChange={InputComment} placeholder='댓글을 입력해주세요' 
            style={{ width: '40%', height: '60px', marginRight: '10px'}}/>
            <Button style={{height: '60px'}} onClick={addComments}>댓글 작성</Button>
        </Form>
        <h3 style={{marginBottom: '40px' }}>댓글 목록</h3>
        {comList?.map(item => item.c_contents)}

        {/* <Descriptions title="댓글 목록" /> */}
        </>
    )
}
