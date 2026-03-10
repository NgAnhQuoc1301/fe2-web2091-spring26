# Hướng dẫn học Ant Design (AntD) với React + TypeScript

## 1. Ant Design là gì?

Ant Design (AntD) là thư viện UI component phổ biến cho React.\
Nó cung cấp nhiều component có sẵn như **Button, Form, Table, Modal,
Layout** giúp xây dựng dashboard và hệ thống admin nhanh chóng.

**Ưu điểm** - UI đẹp và đồng bộ - Nhiều component dựng sẵn - Hỗ trợ
TypeScript tốt - Tài liệu đầy đủ

Website: https://ant.design

---

## 2. Cài đặt Ant Design với React + TypeScript

Cài Ant Design:

```bash
npm install antd
```

Import CSS trong `main.tsx`:

```ts
import "antd/dist/reset.css";
```

---

## 3. Button

### Lý thuyết

Button dùng để trigger action.

### Ví dụ

```tsx
import { Button } from "antd";

export default function DemoButton() {
  return <Button type="primary">Click me</Button>;
}
```

### Các type phổ biến

- primary
- default
- dashed
- link
- text

---

## 4. Layout cơ bản

AntD có hệ thống layout sẵn cho dashboard.

```tsx
import { Layout } from "antd";

const { Header, Content, Footer } = Layout;

export default function Page() {
  return (
    <Layout>
      <Header style={{ color: "white" }}>Header</Header>
      <Content style={{ padding: 20 }}>Content</Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}
```

---

## 5. Form cơ bản

AntD Form hỗ trợ validation mạnh.

```tsx
import { Form, Input, Button } from "antd";

export default function LoginForm() {
  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Nhập email" }]}
      >
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" type="primary">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}
```

---

## 6. Table hiển thị dữ liệu

Table rất phổ biến trong dashboard admin.

```tsx
import { Table } from "antd";

const columns = [
  { title: "Name", dataIndex: "name" },
  { title: "Age", dataIndex: "age" },
];

const data = [
  { key: 1, name: "John", age: 25 },
  { key: 2, name: "Anna", age: 30 },
];

export default function DemoTable() {
  return <Table columns={columns} dataSource={data} />;
}
```

---

## 7. Modal Popup

```tsx
import { Modal, Button } from "antd";
import { useState } from "react";

export default function DemoModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => setOpen(false)}
      >
        Nội dung modal
      </Modal>
    </>
  );
}
```

---

## 8. Bài tập thực hành

### Bài 1

Tạo trang dashboard gồm:

- Header
- Sidebar
- Content

### Bài 2

Tạo form đăng ký:

- Name
- Email
- Password
- Button submit

### Bài 3

Tạo bảng danh sách user:

- Name
- Email
- Role

### Bài 4

Click nút **Add User** mở modal chứa form thêm user.

---
