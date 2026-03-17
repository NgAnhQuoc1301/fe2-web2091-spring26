import { Toaster } from "react-hot-toast";
import { Link, Routes, Route } from "react-router-dom";
import { Button, Form, Input } from "antd";
import Layout, { Content, Footer, Header } from "antd/es/layout/layout";
import Dashboard from "./dashboard";
import Lab4 from "./pages/lab4";

function App() {
  const onFinish = (values: any) =>{
    console.log(values);
    
  }
  return (
    <>
      <nav className="bg-blue-600 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold">
            <strong>WEB2091 App</strong>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-gray-200">
              Trang chủ
            </Link>
            <Link to="/list" className="hover:text-gray-200">
              Danh sách
            </Link>
            <Link to="/add" className="hover:text-gray-200">
              Thêm mới
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="#" className="hover:text-gray-200">
              Đăng nhập
            </Link>
            <Link to="#" className="hover:text-gray-200">
              Đăng ký
            </Link>
            <Link to="/dashboard" className="hover:text-gray-200">
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={
          <div className="max-w-6xl mx-auto mt-10 px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Chào mừng đến với WEB2091</h1>
            <Button type="primary">Click me</Button>
            <Button type="default">Click me</Button>
            <Button type="dashed">Click me</Button>
            <Button type="text">Click me</Button>
            <Button type="link">Click me</Button>
            <Layout>
              <Header style={{color: "white"}}>Header</Header>
              <Content style={{color:"black", padding:20}}>Content</Content>
              <Footer style={{color: "green", margin: 10}}>Footer</Footer>
            </Layout>
            <Form onFinish={onFinish}>
              <Form.Item name="email" label="Email" 
              rules={[{ required: true, message: "Nhập email"}]}>
                <Input type="email" placeholder="Email" />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" type="primary">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
        } />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<Lab4 />} />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
