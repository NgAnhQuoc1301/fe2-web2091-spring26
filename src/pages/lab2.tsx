import { Table, Tag } from "antd";

const lab2 = () => {
  const column = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Major",
      dataIndex: "major",
    },
  ];

  const data = [
    {
      key: 1,
      id: 1,
      name: "van huy",
      age: 20,
      major: "IT",
    },
    {
      key: 2,
      id: 2,
      name: "Linh",
      age: 21,
      major: "Business",
    },
    {
      key: 3,
      id: 3,
      name: "Hà",
      age: 24,
      major: "Design",
    },
  ];

  const column2 = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => {
        return (
          <span style={{ color: status === "active" ? "green" : "red" }}>
            {status}
          </span>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: () => (
        <>
          <Tag color={"blue"}>Edit</Tag>
          <Tag color={"red"}>Delete</Tag>
        </>
      ),
    },
  ];

  const data2 = [
    {
      key: 1,
      id: 1,
      name: "bao toan",
      email: "toan123@gmail.com",
      status: "active",
    },

    {
      key: 2,
      id: 2,
      name: "tuan anh",
      email: "tuananh@gmail.com",
      status: "inactive",
    },
    {
      key: 3,
      id: 3,
      name: "van quang",
      email: "quang555@gmail.com",
      status: "active",
    },
  ];

  return (
    <div>
      <h2 className="text-4xl font-bold mb-4">bai 1</h2>
      <Table columns={column} dataSource={data} />
      <h2 className="text-4xl font-bold mb-4">bai 3</h2>

      <Table
        columns={column2}
        dataSource={data2}
        pagination={{ pageSize: 2 }}
      />
    </div>
  );
};

export default lab2;