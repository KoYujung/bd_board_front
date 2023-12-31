import { Card, List } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BoardService from "../service/BoardService";

interface boardType {
  no: number,
  title: string,
  contents: string,
}

export default function MainComponent() {
  const [boards, setBoards] = useState<Array<boardType>>();
  const navigate = useNavigate();  

  useEffect(() => {
    BoardService.getTop4Board()
    .then((board) => {
      setBoards(board.data);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <>
    <h2 className="subtitle">조회수 TOP 4</h2>
    <List 
    dataSource={boards}
    grid={{column:4 }}
    renderItem={(boards) => {
      return <List.Item>
        <Card onClick={() => navigate('/read_board/' + boards.no)}
        hoverable title={boards.title} extra={<p onClick={() => navigate('/read_board/' + boards.no)} className="mainP">More</p>}
          className="mainC">
          <p>{boards.contents}</p>
        </Card>
      </List.Item>;
    }}
    />  
    </>
  )
}
