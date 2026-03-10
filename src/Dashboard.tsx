import Layout, { Content, Header } from "antd/es/layout/layout"
import Sider from "antd/es/layout/Sider"
import { Button, Form, Input, Modal, Table } from "antd";
import { useState } from "react";


function Dashboard() {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [users, setUsers] = useState([
        { key: 1, Name: "Nguyễn Anh Quốc", Email: "nguyenanhquoc@gmail.com", Role: "Quản trị viên" },
        { key: 2, Name: "Nguyễn Anh Quốc13", Email: "nguyenanhquoc13@gmail.com", Role: "Người dùng" }
    ]);
    const onFinishSignup = (values: any) => {
        console.log("Đăng ký:", values);
    }
    const onFinishAddUser = (values: any) => {
        const newUser = {
            key: users.length + 1,
            Name: values.name,
            Email: values.email,
            Role: "Người dùng"
        };
        setUsers([...users, newUser]);
        form.resetFields();
        setOpen(false);
        console.log("Người dùng được thêm:", newUser);
    }
    const columns = [
        {
            title: "Tên",
            dataIndex: "Name",
            key: "Name",
        },
        {
            title: "Email",
            dataIndex: "Email",
            key: "Email",
        },
        {
            title: "Vai trò",
            dataIndex: "Role",
            key: "Role",
        }
    ];

    return (
        <div>
            {/* Bài 1: Dashboard với Header, Sidebar, Content */}
            <Layout style={{ minHeight: "100vh" }}>
                <Header style={{ color: "white" }}>
                    Bảng điều khiển WEB2091
                </Header>
                <Layout>
                    <Sider style={{ background: "#f0f2f5" }}>
                        <div style={{ padding: "20px", color: "#000" }}>
                            <h3>Menu</h3>
                        </div>
                    </Sider>
                    <Content style={{ padding: "24px", background: "#fff" }}>
                        {/* Bài 2: Form đăng ký */}
                        <div style={{ marginBottom: "40px" }}>
                            <h2>Đăng ký tài khoản</h2>
                            <Form
                                layout="vertical"
                                onFinish={onFinishSignup}
                                style={{ maxWidth: "400px" }}
                            >
                                <Form.Item
                                    name="name"
                                    label="Tên"
                                    rules={[{ required: true, message: "Vui lòng nhập tên" }]}
                                >
                                    <Input placeholder="Nhập tên của bạn" />
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[
                                        { required: true, message: "Vui lòng nhập email" },
                                        { type: "email", message: "Email không hợp lệ" }
                                    ]}
                                >
                                    <Input type="email" placeholder="Nhập email" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    label="Mật khẩu"
                                    rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
                                >
                                    <Input type="password" placeholder="Nhập mật khẩu" />
                                </Form.Item>
                                <Form.Item>
                                    <Button htmlType="submit" type="primary" block>
                                        Gửi
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>

                        {/* Bài 3: Bảng danh sách người dùng */}
                        <div style={{ marginBottom: "20px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                                <h2>Danh sách người dùng</h2>
                                {/* Bài 4: Nút Thêm người dùng */}
                                <Button type="primary" onClick={() => setOpen(true)}>
                                    Thêm người dùng
                                </Button>
                            </div>
                            <Table columns={columns} dataSource={users} />
                        </div>
                    </Content>
                </Layout>
            </Layout>

            {/* Bài 4: Modal chứa form thêm người dùng */}
            <Modal
                title="Thêm người dùng mới"
                open={open}
                onCancel={() => {
                    setOpen(false);
                    form.resetFields();
                }}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinishAddUser}
                >
                    <Form.Item
                        name="name"
                        label="Tên"
                        rules={[{ required: true, message: "Vui lòng nhập tên" }]}
                    >
                        <Input placeholder="Nhập tên" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: "Vui lòng nhập email" },
                            { type: "email", message: "Email không hợp lệ" }
                        ]}
                    >
                        <Input type="email" placeholder="Nhập email" />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary" block>
                            Thêm
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default Dashboard;