import { Avatar, Button, Form, Input, List, Modal, message } from 'antd'
import React, { useEffect, useState } from 'react'
import BoardService from '../service/BoardService';
import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';

interface commentType{
    currentNo: number,
    c_created_time?: string,
    c_contents?: string,
    c_member_id?: number,
  };

export default function CommentComponent(props: commentType) {
    const [ comment, setComment ] = useState<any>('');
    const [ comList, setComList ] = useState<Array<commentType>>();
    const [ count, setCount ] = useState<any>(0);
    const [ModalOpen, setModalOpen] = useState(false);
    const [mes, setMes] = message.useMessage();

    useEffect(() => {        
        BoardService.getComment(props.currentNo)
        .then((data) => {
            setComList(data);
        });

        BoardService.countComment(props.currentNo)
        .then((res) => {
            setCount(res.data);
        })
    }, [props.currentNo]);

    const InputComment = (e : React.ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
    }

    const addComments = () => {
        if(comment === '') {
            mes.open({
                content: '내용을 입력해주세요',
                type: 'warning'
            });
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

    const Ok = () => {
        BoardService.delComment(props.currentNo)
        .then(() => window.location.replace('/read_board/' + props.currentNo));
        // console.log(props.currentNo);
    };
  
    const Cancel = () => {
        setModalOpen(false);
    };

    const delComment = () => {
        setModalOpen(true);
    }

    const upComment = () => {
        
    }

    return (
        <>
        {setMes}
        <h3 style={{marginTop: '60px'}}>댓글<span style={{marginLeft: "10px", color: "#1677ff"}}>{count}</span></h3>
        {/* <Form style={{width: '40%'}}>
        <Input placeholder='작성자 이름을 입력해주세요' />
        <Form style={{ display: 'flex', alignItems: 'center', marginBottom: '30px'}}>
            <Input value={comment} onChange={InputComment} placeholder='댓글을 입력해주세요' 
            style={{ height: '60px', marginRight: '10px'}}/>
            <Button style={{height: '60px'}} onClick={addComments}>댓글 작성</Button>
        </Form>
        </Form> */}
        {/* <Input placeholder='작성자 이름을 입력해주세요'></Input>
        <Form style={{ display: 'flex', alignItems: 'center', marginBottom: '30px', width: '40%'}}>
            <Input value={comment} onChange={InputComment} placeholder='댓글을 입력해주세요' 
            style={{ height: '60px', marginRight: '10px'}}/>
            <Button style={{height: '60px'}} onClick={addComments}>댓글 작성</Button>
        </Form> */}

        <table width={'500px'}>
            <tr>
                <td>
                <Form style={{ display: 'flex', alignItems: 'center'}}>
                    <Input value={comment} onChange={InputComment} placeholder='댓글을 입력해주세요' 
                    style={{ height: '60px', marginRight: '10px'}}/>
                    <Button style={{height: '60px'}} onClick={addComments}>댓글 작성</Button>
                </Form>
                </td>
            </tr>
            <tr>
                <td><Input style={{marginBottom: '30px'}} bordered={false} placeholder='작성자 번호를 입력해주세요' prefix={<UserOutlined />}/></td>
            </tr>
        </table>

        <List
        style={{marginRight: "70%"}}
            itemLayout="horizontal"
            dataSource={comList}
            renderItem={(comList, index) => (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <List.Item actions={[<a onClick={delComment}><DeleteOutlined /></a>,<a onClick={upComment}><EditOutlined /></a>, ]}>
                    <List.Item.Meta 
                    avatar= {<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                    title={comList.c_contents}
                    description={comList.c_created_time}
                    />
                </List.Item>
            )}
        />
        <Modal closable={false} open={ModalOpen} onOk={Ok} onCancel={Cancel} cancelText={"취소"} okText={"삭제"}>
            <h3 style={{marginBottom: "5%", textAlign: "center"}}>해당 댓글을 삭제하시겠습니까 ?</h3>
        </Modal>
        </>
    )
}