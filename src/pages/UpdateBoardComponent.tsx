import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BoardService from '../service/BoardService';
import TextArea from 'antd/es/input/TextArea';
import { Button, Form, Input, Upload, UploadFile } from 'antd';
import { InboxOutlined, UserOutlined } from '@ant-design/icons';

export default function UpdateBoardComponent() {
    const [data, setData] = useState({
        title: '',
        contents: '',
        member_id: '',
    });

    const [fileData, setFileData] = useState<any[]>([]);
    const [fileList, setFileList] = useState<any[]>([]);
    const { no } = useParams();
    const navigate = useNavigate();
    const formData = new FormData();
    const existingFiles: any[] = [];
    const newFiles: any[] = [];
    const removedFiles: any[] = [];

    const changeTitle = (event : React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, title: event.target.value });
    };
    const changeContents = (event : React.ChangeEvent<HTMLTextAreaElement>) => {
        setData({ ...data, contents: event.target.value });
    };
    const changeMemberId = (event : React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, member_id: event.target.value });
    };
    const updateBoard = (event : React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        
        fileList.forEach(file => {
          if (file.status === 'done') {
            existingFiles.push(file);
          } else if (file.status === undefined || file.status === 'done') {
            newFiles.push(file);
          }});

        fileData.forEach(file => {
            if(file.status === 'removed') {
                removedFiles.push(file);
            }
        })

        console.log('기존 파일:', existingFiles);
        console.log('새로 추가한 파일:', newFiles);
        console.log('삭제한 파일:', removedFiles);

        // BoardService.updateBoard(Number(no), data)
        //     .then(() => {
        //         navigate('/read_board/' + no);
        //     });
    };

    const uploadFile = (e: any) => {
        setFileList(e.fileList);
        // setFileData(e.fileList);
    };

    useEffect(() => {
        BoardService.getOneBoard(Number(no))
            .then((res) => {
                setData({
                    title: res.title,
                    contents: res.contents,
                    member_id: res.member_id,
                });
            })
            .catch((error) => {
                console.error("Error fetching board data:", error);
            });

        BoardService.getFileByNo(Number(no))
        .then((data) => {
            setFileData(data);

            const defaultFiles = data.map((file: { fid: string; fname: string; fpath: string; }) => ({
                uid: file.fid,
                name: file.fname,
                status: 'done',
                url: file.fpath,
            }));
            setFileData(defaultFiles);
            setFileList(defaultFiles);
        })
        .catch((error) => {
            console.error("파일 가져오기 실패", error);
        });   

    }, [no]);

    return (
        <>
        <h2 style={{textAlign: "center", marginTop: "3%"}}>기존 글을 수정합니다</h2>
        <div style={{marginLeft: "15%", marginRight: "15%" }}>
            <Form>
            <Form.Item className='create_div'>
                    <p className='label'><UserOutlined style={{marginRight: '10px'}}/>작성자</p>
                    <Input type='text' placeholder='작성자를 입력해주세요' value={data.member_id} onChange={changeMemberId} className='inputBoard' ></Input>
                </Form.Item>
                <Form.Item className='create_div'>
                    <p className='label'>제목</p>
                    <Input type='text' placeholder='제목을 입력해주세요'  value={data.title} onInput={changeTitle} className='inputBoard'></Input>
                </Form.Item>
                <div className='create_div'>
                    <p className='label'>내용</p>
                    <TextArea placeholder='내용을 입력해주세요' value={data.contents} rows={4} onChange={changeContents} className='inputBoard'></TextArea>
                </div>
                <Form.Item>
                    <p className='label'>첨부파일</p>
                    <Upload.Dragger
                    fileList={fileList}
                    name='file'
                    multiple={true}
                    onChange={uploadFile}
                    beforeUpload={(e) => false}
                    defaultFileList={fileData}
                    >
                        <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    </Upload.Dragger>
                </Form.Item>
            
            </Form>
            <Button className='MarginButton' onClick={updateBoard}>완료</Button>
            <Button className='MarginButton' danger onClick={() => navigate(-1)}>취소</Button>
        </div>
        </>
    )
}

/*
[ status ]
done => 기존 파일 - x
undefined => 새로 추가한 파일 - create_file
removed => 삭제한 파일 - delete_file
*/