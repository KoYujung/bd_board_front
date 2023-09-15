import React, { useEffect, useState } from 'react';
import BoardService from '../service/BoardService';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Select, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

interface DataType {
    no: string;
    title: string;
    member_id: number;
    created_time: string;
}

export default function ListBoardComponent() {
    const [boards, setBoards] = useState<any>([]);
    const [selected, SetSelected] = useState<string>('제목');
    const [inputted , setInput] = useState<string>('');

    const navigate = useNavigate();

    useEffect(() => {
        BoardService.getBoards()
            .then((data) => {
                setBoards(data);
                // console.log(data);
            })
            .catch((error) => {
                console.log("글 목록 api 호출 실패");
                console.error(error);
            });
    }, []);

    const createBoard = () => {
        navigate('/create_board');
    }

    const readBoard = (no: any) => {
        navigate(`/read_board/${no}`);
    }

    const selectChange = (e : string) => {
        SetSelected(e);
    }

    const InputSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }

    const searchBoard  = () => {
        console.log(selected, inputted);
        navigate('/search_board/')
    }

    const columns: ColumnsType<DataType> = [
    {
        title: "글 번호",
        dataIndex: "no",
        key: "no",
    },
    {
        title: "제목",
        dataIndex: "title",
        key: "title",
    },
    {
        title: "작성자",
        dataIndex: "member_id",
        key: "member_id"
    },
    {
        title: "작성일",
        dataIndex: "created_time",
        key: "created_time"
    },
    ];
    
    return (
        <>
        <div id='createButton'>
            <Button type="primary" onClick={createBoard} >글 작성</Button>
        </div>

        <div id='selectButton'>
            <Select id='ListSelect' style={{width: 80, cursor: 'pointer'}} key={selected}
            onChange={(selectChange)} value={selected}
            options={[
                { value : 'title', label : '제목' },
                { value : 'member_id', label : '작성자'}
            ]}/>

            <Input placeholder='검색어를 입력해주세요' id='ListInput' onChange={InputSearch} value={inputted}/>

            <Button style={{margin : '0'}} id='ListSearch' onClick={searchBoard}>검색</Button>
        </div>
        
        <Table columns={columns} dataSource={boards} 
        onRow={(record, rowIndex) => {
            return {
                onClick : () => readBoard(record.no)
            }
        }} style={{cursor: 'pointer'}}/>
        </>
    )
}
