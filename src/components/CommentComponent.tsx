import { Avatar, Button, Form, Input, List, Modal, message } from 'antd'
import React, { useEffect, useState } from 'react'
import BoardService from '../service/BoardService';
import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';

interface commentType{
    currentNo: number,
    c_created_time?: string,
    c_contents?: string,
    c_member_id?: string,
    cno?: number,
  };

export default function CommentComponent(props: commentType) {
    const [ comment, setComment ] = useState({
        cno: '',
        c_contents: '',
        c_member_id: ''
    });
    const [ comList, setComList ] = useState<Array<commentType>>();
    const [ count, setCount ] = useState<any>(0);
    const [ModalOpen, setModalOpen] = useState(false);
    const [inputNo, setInputNo] = useState<string>('');

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

    const InputContents = (e : React.ChangeEvent<HTMLInputElement>) => {
        setComment({...comment, c_contents: e.target.value});
    }

    const InputMember= (e : React.ChangeEvent<HTMLInputElement>) => {
        setComment({...comment, c_member_id: e.target.value});
    }

    const addComments = () => {
        if(comment.c_contents === '') {
            mes.open({
                content: '내용을 입력해주세요',
                type: 'warning'
            });
        }
        else if(comment.c_member_id === '') {
            mes.open({
                content: '작성자 번호를 입력해주세요',
                type: 'warning'
            });
        } 
        
        else {
            BoardService.addComment(props.currentNo,comment)
                .then(() => {
                window.location.replace('/read_board/' + props.currentNo);
                })
                .catch(error => {
                console.error(error);
                });
        }
    }

    const Ok = () => {
        // console.log("입력된 작성자 번호 : " + inputNo);
        // console.log("댓글 번호 : " + comList?.map(i => i.cno)[0]);
        // console.log(String(comList?.map(i => i.c_member_id)));

        if(String(comList?.map(i => i.c_member_id)) === inputNo) {
            BoardService.delComment(props.currentNo)
            .then(() => window.location.replace('/read_board/' + props.currentNo));
        } else {
            mes.open({
                content: '옳바르지 않는 번호입니다 !',
                type: 'error'
            });
            setInputNo('');
        }
    };
  
    const Cancel = () => {
        setModalOpen(false);
        setInputNo('');
    };

    const delComment = () => {
        setModalOpen(true);
    }

    const upComment = () => {
        setModalOpen(true);
    }

    const checkNo = (e : React.ChangeEvent<HTMLInputElement>) => {
        setInputNo(e.target.value);
    }

    return (
        <>
        {setMes}
        <h3 style={{marginTop: '60px'}}>댓글<span style={{marginLeft: "10px", color: "#1677ff"}}>{count}</span></h3>

        <table width={'500px'}>
            <tbody>
                <tr>
                    <td>
                    <Form style={{ display: 'flex', alignItems: 'center'}}>
                        <Input value={comment.c_contents} onChange={InputContents} placeholder='댓글을 입력해주세요' 
                        style={{ height: '60px', marginRight: '10px'}}/>
                        <Button style={{height: '60px'}} onClick={addComments}>댓글 작성</Button>
                    </Form>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Input value={comment.c_member_id} onChange={InputMember} style={{marginBottom: '30px'}} 
                        bordered={false} placeholder='작성자 번호를 입력해주세요' prefix={<UserOutlined />}/>
                    </td>
                </tr>                
            </tbody>
        </table>

        <List
        style={{marginRight: "60%"}}
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
        pagination={{
            defaultPageSize: 3,
            defaultCurrent: 1,
            align: "start"
        }}
        />
        <Modal closable={false} open={ModalOpen} onOk={Ok} onCancel={Cancel} cancelText={"취소"} okText={"삭제"}>
            <div style={{marginBottom: "5%", textAlign: "center"}}>
                <h2>작성자 번호를 입력해주세요</h2>
                <Input style={{width: '180px', marginTop: '10px', fontSize: '20px'}}
                value={inputNo} onChange={checkNo} prefix={<UserOutlined />}/>
            </div>
        </Modal>
        </>
    )
}