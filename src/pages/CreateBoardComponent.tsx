import React, { useEffect, useState } from 'react';
import BoardService from '../service/BoardService';
import { useNavigate } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import { Button, Form, Input, Upload, UploadFile, message } from 'antd';
import UpModalComponent from '../components/UpModalComponent';
import { FileAddOutlined, InboxOutlined, UserOutlined } from '@ant-design/icons';

export default function CreateBoardComponent() {

    const [newNo, setNewNo] = useState(0);   
    const [showNo, setShowNo] = useState(0);   
    const [data, setData] = useState({
        title: '',
        contents: '',
        member_id: '',
    });
    const [fileData, setFileData] = useState<any[]>([]);
    const [fileList, setFileList] = useState<any[]>([]);
    const [title, setTitle] = useState('새 글을 작성합니다');

    const [mes, setMes] = message.useMessage();    
    const navigate = useNavigate();

    const existingFiles: any[] = []; 
    const newFiles: any[] = [];
    const removedFiles: any[] = []; 

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
      });

    const changeTitle = (event : React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, title: event.target.value }); 
    };
    const changeContents = (event : React.ChangeEvent<HTMLTextAreaElement>) => {
        setData({ ...data, contents: event.target.value });
    };
    const changeMemberId = (event : React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, member_id: event.target.value });
    };

    const new_board = {
        title : data.title,
        contents : data.contents,
        member_id : data.member_id,
    };

    const createBoard = async (event : React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        console.log(new_board, fileData);

        if(new_board.title === '') {
            mes.open({
                content: '제목을 입력해주세요',
                type: 'warning'
            });
        } 
        else if(new_board.contents === '') {
            mes.open({
                content: '내용을 입력해주세요',
                type: 'warning'
            });
        }
        else if(new_board.member_id === '') {
            mes.open({
                content: '작성자 번호를 입력해주세요',
                type: 'warning'
            });
        }
        else {
            if (newNo !== 0) { // 글 수정
                console.log(existingFiles, newFiles, removedFiles);
                try {
                    if (removedFiles.length !== 0) {
                        BoardService.deleteFile(removedFiles.map(i => i.uid));
                    }
                
                    if (newFiles.length !== 0) {
                        const formData = new FormData();
                        newFiles.forEach((file, i) => {
                            formData.append(`files[${i}]`, file.originFileObj);
                        });
                        BoardService.createFile(formData, newNo);
                    }
                } catch (error) {
                    console.error(error);
                }

                navigate('/board');
            } 
            else { // 글 작성
                console.log(fileData);      
                try{
                    BoardService.createBoard(new_board)
                    .then((res) => {
                    if (fileData.length > 0) {
                        const formData = new FormData();
                    
                        for (let i = 0; i < fileData.length; i++) {
                            const files = fileData[i].originFileObj;
                            formData.append(`files[${i}]`, files);
                        }
                        
                        BoardService.createFile(formData, res);
                    }

                    navigate('/board')});

                    } catch(error) {
                        console.error(error);
                    }
            }
        }
    };

    const uploadFile = (e: any) => {
        setFileList(e.fileList);
        // setFileData(e.fileList);
    };

    useEffect(() => {
        if(newNo !== 0) {
            BoardService.getOneBoard(newNo, fileData)
            .then((data) => {
                setData({
                    title: data.title,
                    contents: data.contents,
                    member_id: data.member_id,
                });
            })
            .catch((error) => {
                console.error("수정 글 가져오기 실패", error);
            });

            BoardService.getFileByNo(newNo)
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
            setTitle("기존 글을 수정합니다");
        } 
        else {
            setTitle('새 글을 작성합니다');
            setData({
                title: '',
                contents: '',
                member_id: '',
            });
        }
    }, [newNo]);

    console.log(newNo);

    return (
        <>
        {setMes}
        <h2 style={{textAlign: "center", marginTop: "3%"}}>{title}</h2>
        <div style={{marginLeft: "15%", marginRight: "15%"}}>
            <Form encType='multipart/form-data'>
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
                    <p className='label'><FileAddOutlined style={{marginRight: '10px'}}/>첨부파일</p>
                    <Upload.Dragger
                    fileList={fileList}
                    name='file'
                    multiple={true}
                    onChange={uploadFile}
                    beforeUpload={(e) => false}
                    >
                        <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                        <p className="ant-upload-text">파일을 끌어 놓거나 버튼을 클릭해주세요</p>
                    </Upload.Dragger>
                </Form.Item>
            </Form>
            <Button className='MarginButton' type='primary' onClick={createBoard}>완료</Button>

            <UpModalComponent 
            newNo={newNo} setNewNo={setNewNo} showNo={showNo} setShowNo={setShowNo}
            />
        </div>
        </>
    );
}