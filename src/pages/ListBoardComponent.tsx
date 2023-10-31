import React, { useEffect, useState } from 'react';
import BoardService from '../service/BoardService';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Select, Table, Tooltip, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useSelector, useDispatch } from 'react-redux';
import { setContent, setMember, setTitle } from '../modules/boardReducer';
import DeleteComponent from '../components/DelModalComponent';
import { SearchOutlined } from '@ant-design/icons';

interface DataType {
    no: number;
    title: string;
    member_id: number;
    created_time: string;
    content: string;
    view: number;
}

export default function ListBoardComponent() {
    const [boards, setBoards] = useState<any>([]);
    const [inputted , setInput] = useState<string>('');
    const [deleteNo, setDeleteNo] = useState<Object>([]);
    const [mes, setMes] = message.useMessage();

    const selected = useSelector((state: any) => (state).selected);
    const search_type = useSelector((state: any) => (state).search_type);

    const navigate = useNavigate();
    const disPath = useDispatch();

    useEffect(() => {
        BoardService.getBoards()
            .then((data) => {
                setBoards(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const readBoard = (no: number, prevNo?: number, nextNo?: number) => {
        navigate(`/read_board/${no}`, {state: {prevNo, nextNo}});
    }
  
    const selectChange = (e : string) => {
        if(e === 'title') {
            disPath(setTitle(e));
        } else if(e === 'member_id') {
            disPath(setMember(e));
        } else {
            disPath(setContent(e));
        }
    }

    const InputSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }

    const searchBoard = () => {
        console.log(search_type);
        if(inputted === '') {
            mes.open({
                content: '검색어를 입력해주세요',
                type: 'warning'
            });
        } else {
            BoardService.searchBoard(search_type, inputted)
            .then((data) => {
                setBoards(data);
            })
            .catch((error) => {
                console.error(error);
            })
        }
    }

    const columns: ColumnsType<DataType> = [
        {
            title: "NO",
            dataIndex: "no",
            sorter: (a,b) => a.no - b.no,
            width: "100px",
        },
        {
            title: "제목",
            dataIndex: "title",
            width: "400px",
        },
        {
            title: "작성자",
            dataIndex: "member_id",
            width: "150px",
            align: "center"
        },
        {
            title: "작성일",
            dataIndex: "created_time",
            width: "250px",
            align: "center"
        },
        {
            title: "조회수",
            dataIndex: "view",
            width: "100px",
            sorter: (a,b) => a.view - b.view,
            align: "center"
        },
    ];

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[]) => {
            setDeleteNo(selectedRowKeys);
        }
    };

    return (
        <>
        {setMes}
        <div id='deleteButton'>
            <DeleteComponent deleteNo={deleteNo}/>
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
                    { value: 'member_id', label: '작성자' },
                    { value: 'content', label: '내용' }
                ]}
            />
            <Input
                placeholder='검색어를 입력해주세요'
                id='ListInput'
                onChange={InputSearch}
                value={inputted}
                style={{ flex: '1', marginRight: '8px' }}
            />
            <Tooltip title="search">
                <Button id='ListSearch' onClick={searchBoard} icon={<SearchOutlined />}></Button>
            </Tooltip>
        </div>

        <Table 
        rowKey={(boards) => boards.no} columns={columns} dataSource={boards}
        onRow={(record) => {
            return {
                onClick : () => {
                    const prevNo = Number(record.no) - 1;
                    const nextNo = Number(record.no) + 1;
                    readBoard(record.no, prevNo, nextNo);
                    BoardService.addView(record.no);
                }
            }
        }} 
        rowSelection={{
            type: 'checkbox',
            ...rowSelection
        }} 
        style={{cursor: 'pointer'}}
        pagination={{
            defaultPageSize: 7,
            defaultCurrent: 1,
        }}
        />
        </>
    )
}