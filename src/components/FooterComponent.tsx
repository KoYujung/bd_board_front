import { UserOutlined } from '@ant-design/icons';
import { Input, Modal, message } from 'antd';
import { Footer } from 'antd/es/layout/layout'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function FooterComponent() {
    const [ ModalOpen, setModalOpen] = useState<boolean>(false);
    const [ manageNo, setManageNo ] = useState<string>('');
    const navigate = useNavigate();
    const [mes, setMes] = message.useMessage();

    const Ok = () => {
        if(manageNo === '1234') {
            mes.open({
                content: '관리자 화면입니다',
                type: 'success'
            });
            navigate('/manage_member');
            setManageNo('');
            setModalOpen(false);
        } else {
            mes.open({
                content: '옳바르지 않는 번호입니다 !',
                type: 'error'
            });
            setManageNo('');
        }
    };
  
    const Cancel = () => {
        setModalOpen(false);
    };

    const changeNo = (e: React.ChangeEvent<HTMLInputElement>) => {
        setManageNo(e.target.value);
    };

    return (
        <>
        {setMes}
        <Footer onClick={() => setModalOpen(true)}>©2023 Created by yuu</Footer>
        <Modal closable={false} open={ModalOpen} onOk={Ok} onCancel={Cancel} cancelText={"닫기"} okText={"확인"}>
            <div style={{marginBottom: "5%", textAlign: "center"}}>
                <h2>관리자 번호를 입력해주세요</h2>
                <Input style={{width: '180px', marginTop: '10px', fontSize: '20px'}}
                value={manageNo} onChange={changeNo} placeholder='1234' prefix={<UserOutlined />}/>
            </div>
        </Modal>
        </>
    )
}
