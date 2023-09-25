import React, { useEffect, useState } from 'react';
import BoardService from '../service/BoardService';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Divider, Input, Radio, Select, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useSelector, useDispatch } from 'react-redux';
import { setMember, setTitle } from '../modules/boardReducer';

interface DataType {
    no: string;
    title: string;
    member_id: number;
    created_time: string;
}

export default function ListBoardComponent() {
    const [boards, setBoards] = useState<any>([]);
    const [inputted , setInput] = useState<string>('');
    const [selectionType, setSelectionType] = useState<"checkbox" | "radio">("checkbox");
    const [deleteNo, setDeleteNo] = useState<string | undefined>();

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
        if(e === 'title') {
            disPath(setTitle(e));
            console.log(disPath(setTitle(e)));
        } else {
            disPath(setMember(e));
            console.log(disPath(setMember(e)));
        }
    }

    const InputSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }

    const searchBoard  = () => {
        console.log(search_type);
        if(inputted === '') {
            alert("검색어를 입력해주세요");
        } else {
            BoardService.searchBoard(search_type, inputted)
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

    const deleteBoard = () => {
        if(window.confirm("게시글을 삭제하시겠습니까? ")) {
            BoardService.deleteBoard(deleteNo)
              .then(res => {
                console.log(JSON.stringify(res.status));
                if(res != null) {
                    window.location.replace("/");
                } else alert("글 삭제를 실패하였습니다");
              }) 
          } 
    }

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            setDeleteNo(selectedRows[0].no);
            console.log(
                `selectedRowKeys: ${selectedRowKeys}`,
                "selectedRows: ",
                selectedRows
            ); 
        }
      };
    
    return (
        <>
        <div id='createButton'>
            <Button onClick={createBoard} >글 작성</Button>
        </div>

        <div id='deleteButton'>
            <Button danger onClick={deleteBoard} >글 삭제</Button>
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
        }} rowSelection={{
            type: selectionType,
            ...rowSelection
        }} 
        style={{cursor: 'pointer'}}/>

        <Radio.Group  onChange={({ target: { value } }) => {
          setSelectionType(value);}} value={selectionType}>
            <Radio value="checkbox">checkbox</Radio>
            <Radio value="radio">radio</Radio>
        </Radio.Group>
        </>
    )
}