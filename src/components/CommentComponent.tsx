import { Avatar, Button, Form, Input, List } from 'antd'
import React, { useEffect, useState } from 'react'
import BoardService from '../service/BoardService';

interface commentType{
    currentNo: number,
    c_created_time?: string,
    c_contents?: string
  };

export default function CommentComponent(props: commentType) {

    const [ comment, setComment ] = useState<any>('');
    const [ comList, setComList ] = useState<Array<commentType>>();

    useEffect(() => {        
        BoardService.getComment(props.currentNo)
          .then((data) => {
            setComList(data);
          });
    }, [props.currentNo]);

    const InputComment = (e : React.ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
    }

    const addComments = () => {
        if(comment === '') {
            alert("내용을 입력해주세요");
        } else {
            BoardService.addComment(props.currentNo,comment)
                .then(() => {
                window.location.replace('/read_board/' + props.currentNo);
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
        <Form style={{ display: 'flex', alignItems: 'center', marginBottom: '30px'}}>
            <Input value={comment} onChange={InputComment} placeholder='댓글을 입력해주세요' 
            style={{ width: '40%', height: '60px', marginRight: '10px'}}/>
            <Button style={{height: '60px'}} onClick={addComments}>댓글 작성</Button>
        </Form>
        <List
            itemLayout="horizontal"
            dataSource={comList}
            renderItem={(comList, index) => (
                <List.Item>
                    <List.Item.Meta 
                    avatar= {<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                    title={comList.c_contents}
                    description={comList.c_created_time}
                    />
                </List.Item>
            )}
        />
        </>
    )
}
