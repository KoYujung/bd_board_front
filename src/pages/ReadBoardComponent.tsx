import { useEffect, useState } from 'react'
import BoardService from '../service/BoardService';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Descriptions, DescriptionsProps, Popover, Typography } from 'antd';
import ModalComponent from '../components/ModalComponent';
import CommentComponent from '../components/CommentComponent';
import DeleteComponent from '../components/DelModalComponent';
import { DownloadOutlined } from '@ant-design/icons';

export default function ReadBoardComponent()  {
  const [ board, setBoard] = useState({
    title: '',
    contents: '',
    member_id: '',
    created_time: '' ,
    view: '',
  });

  const [file, setFile] = useState<Array<any>>();

  const { no } = useParams();
  const navigate = useNavigate();
  // const location = useLocation();

  useEffect(() => {
    BoardService.getOneBoard(Number(no))
      .then((data) => {
        setBoard(data);
      });

    BoardService.getFileByNo(Number(no))
      .then((data) => {
        setFile(data);
      });
      
  }, [no]);

  const items: DescriptionsProps['items'] = [
    {
      label: '제목',
      children: board.title,
      span: 3,
    },
    {
      label: '작성일',
      children: board.created_time,
      span: 2,
    },
    {
      label: '작성자',
      children: board.member_id,
      span: 1,
    },
    {
      label: '내용',
      children: board.contents,
      span: 3,
    },
    {
      label: '첨부파일',
      children: file?.length === 0 ? "업로드 된 파일이 없습니다" :
      (
        <ul style={{ listStyleType: "square"}}>
          {file?.map((i) => (
            <li key={i.fid} style={{marginBottom: '10px'}}>
              <Popover placement='right' content={<img src={`http://localhost:8080/download_file/${i.fid}`} width={300}></img>}>
              {i.fname}<a href={`http://localhost:8080/download_file/${i.fid}`} target='_blank' rel="noreferrer" style={{marginLeft: '15px'}} ><DownloadOutlined/></a>
              </Popover>
            </li>
          ))}
        </ul>
      ),
      span: 1,
    },
  ]

  return (
    <>
    <Button className='MarginButton' onClick={() => navigate('/board')}>글 목록</Button>
    <Button className='MarginButton' onClick={() => navigate('/update_board/' + no)}>글 수정</Button>
    <DeleteComponent deleteNo={Object([no])}/>
    <p style={{float: 'right', marginTop: '30px', marginRight: '20px', color: '#1677ff'}}>조회수 : {board.view}</p>
    <Descriptions bordered items={items} />
    {/* <ModalComponent prevNo={location.state.prevNo} nextNo={location.state.nextNo} /> */}
    <ModalComponent currentNo={Number(no)} />
    <CommentComponent currentNo={Number(no)} />
    </>
  )
}