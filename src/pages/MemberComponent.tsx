import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import BoardService from "../service/BoardService";

interface DataType {
  uname: string,
  uid: string,
  upass: string
};

export default function MemberComponent() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [ members, setMembers ] = useState([]);

  const columns: ColumnsType<DataType> = [
    {
      title: '이름',
      dataIndex: 'uname',
    },
    {
      title: '아이디',
      dataIndex: 'uid',
    },
    {
      title: '비밀번호',
      dataIndex: 'upass',
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const selectMember = (n: string) => {
    console.log(n);
  }

  useEffect(() => {
    BoardService.getAllMembers()
    .then((res) => setMembers(res.data));
  },[])

  return (
    <>
    <h2>회원 목록</h2>
    <Table rowKey={(members) => members.uid} style={{width: "50%", cursor: "pointer"}}
    rowSelection={rowSelection} columns={columns} dataSource={members}
    onRow={(record) => {
      return {
          onClick : () => {
            selectMember(record.uid);
          }
      }
  }} 
    pagination={{
      defaultPageSize: 7,
      defaultCurrent: 1,
    }}
    />
    </>
  )
}
