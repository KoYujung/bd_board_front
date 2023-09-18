import React, { useState } from 'react';
import BoardService from '../service/BoardService';
import { useNavigate } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import { Button, Input, Upload, UploadProps, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export default function CreateBoardComponent() {
    const [data, setData] = useState({
        title: '',
        contents: '',
        member_id: '',
        file: ''
    });
    const navigate = useNavigate();

    const changeTitle = (event : React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, title: event.target.value }); 
    };
    const changeContents = (event : React.ChangeEvent<HTMLTextAreaElement>) => {
        setData({ ...data, contents: event.target.value });
    };
    const changeMemberId = (event : React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, member_id: event.target.value });
    };
    const createBoard = (event : React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        let new_board = {
            title : data.title,
            contents : data.contents,
            member_id : data.member_id
        };
        console.log("new_board", JSON.stringify(new_board));
        BoardService.createBoard(new_board)
            .then(() => { navigate('/board') });
    };
    const props: UploadProps = {
        name: 'file',
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };

    return (
        <div>
            <h2>글 작성</h2>
            <form>
                <div className='create_div'>
                    <label>제목</label>
                    <Input type='text' placeholder='제목을 입력해주세요' value={data.title} onChange={changeTitle} style={{marginTop: '7px'}}></Input>
                </div>
                <div className='create_div'>
                    <label className='label'>내용</label>
                    <TextArea placeholder='내용을 입력해주세요' value={data.contents} onChange={changeContents} style={{marginTop: '7px'}}></TextArea>
                </div>
                <div className='create_div'>
                    <label className='label'>작성자 번호</label>
                    <Input placeholder='작성자 번호를 입력해주세요' value={data.member_id} onChange={changeMemberId} style={{marginTop: '7px'}}></Input>
                </div>
                {/* <div className='create_div'>
                    <label className='label'>파일 업로드</label><br></br>
                    <Upload {...props}><Button style={{marginTop: '7px'}} icon={<UploadOutlined />}>Click to Upload</Button></Upload>
                </div> */}
                <div className='create_div'>
                    <label>파일 업로드</label><br></br>
                    <input type='file' name='file' style={{marginTop: '7px'}}></input>
                </div>
            </form>
            <Button className='MarginButton' type='primary' onClick={createBoard}>완료</Button>
            <Button className='MarginButton' onClick={() => {navigate(-1)}}>이전</Button>
        </div>
    );
}