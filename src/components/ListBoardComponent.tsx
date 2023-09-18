import React, { useEffect, useState } from 'react';
import BoardService from '../service/BoardService';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Select, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { error } from 'console';

interface DataType {
    no: string;
    title: string;
    member_id: number;
    created_time: string;
}

export default function ListBoardComponent() {
    const [boards, setBoards] = useState<any>([]);
    const [selected, SetSelected] = useState<string>('title');
    const [inputted , setInput] = useState<string>('');

    const navigate = useNavigate();

    useEffect(() => {
        BoardService.getBoards()
            .then((data) => {
                setBoards(data);
            })
            .catch((error) => {
                console.log("글 목록 api 호출 실패");
                console.error(error);
            });
    }, []);

    const createBoard = () => {
        navigate('/create_board');
    }

    const readBoard = (no: string) => {
        navigate(`/read_board/${no}`);
    }

    const selectChange = (e : string) => {
        SetSelected(e);
    }

    const InputSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }

    const searchBoard  = () => {
        if(inputted === '') {
            alert("검색어를 입력해주세요");
        } else {
            BoardService.searchBoard(selected, inputted)
            .then((data) => {
                setBoards(data);
            })
            .catch((error) => {
                console.log("글 검색 실패");
                console.error(error);
            })
        }
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

        <div id='selectButton' style={{ display: 'flex', alignItems: 'center' }}>
            <Select
                id='ListSelect'
                style={{ width: 80, cursor: 'pointer', marginRight: '8px' }}
                key={selected}
                onChange={selectChange}
                value={selected}
                options={[
                    { value: 'title', label: '제목' },
                    { value: 'member_id', label: '작성자' }
                ]}
            />
            <Input
                placeholder='검색어를 입력해주세요'
                id='ListInput'
                onChange={InputSearch}
                value={inputted}
                style={{ flex: '1', marginRight: '8px' }}
            />
            <Button style={{ margin: '0' }} id='ListSearch' onClick={searchBoard}>검색</Button>
        </div>
        <Table rowKey={(boards) => boards.no} columns={columns} dataSource={boards} 
        onRow={(record, rowIndex) => {
            return {
                onClick : () => readBoard(record.no)
            }
        }} style={{cursor: 'pointer'}}/>
        </>
    )
}
