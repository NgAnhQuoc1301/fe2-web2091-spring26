import { Table, Tabs, Button, Popconfirm, Space, Empty } from "antd";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

interface Category {
    id: number;
    title: string;
    description: string;
    active?: boolean;
}

interface Story {
    id: number;
    title: string;
    author: string;
    image: string;
    description: string;
    categoryId?: number;
}

export default function List() {
    // Fetch categories
    const { data: categories = [], refetch: refetchCategories } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const response = await axios.get("http://localhost:3000/categories");
            return response.data;
        }
    });

    // Fetch stories
    const { data: stories = [], refetch: refetchStories } = useQuery({
        queryKey: ["stories"],
        queryFn: async () => {
            const response = await axios.get("http://localhost:3000/stories");
            return response.data;
        }
    });

    // Delete category mutation
    const deleteCategory = useMutation({
        mutationFn: async (id: number) => {
            await axios.delete(`http://localhost:3000/categories/${id}`);
        },
        onSuccess: () => {
            toast.success("Xóa danh mục thành công");
            refetchCategories();
        },
        onError: () => {
            toast.error("Xóa danh mục thất bại");
        }
    });

    // Delete story mutation
    const deleteStory = useMutation({
        mutationFn: async (id: number) => {
            await axios.delete(`http://localhost:3000/stories/${id}`);
        },
        onSuccess: () => {
            toast.success("Xóa truyện thành công");
            refetchStories();
        },
        onError: () => {
            toast.error("Xóa truyện thất bại");
        }
    });

    // Categories columns
    const categoryColumns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 60
        },
        {
            title: "Tên danh mục",
            dataIndex: "title",
            key: "title"
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
            ellipsis: true
        },
        {
            title: "Kích hoạt",
            dataIndex: "active",
            key: "active",
            render: (active: boolean) => active ? "✓ Có" : "✗ Không"
        },
        {
            title: "Thao tác",
            key: "action",
            width: 150,
            render: (_: any, record: Category) => (
                <Space>
                    <Popconfirm
                        title="Xóa danh mục?"
                        description="Bạn chắc chắn muốn xóa?"
                        onConfirm={() => deleteCategory.mutate(record.id)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Button danger size="small">Xóa</Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    // Stories columns
    const storyColumns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 60
        },
        {
            title: "Tên truyện",
            dataIndex: "title",
            key: "title"
        },
        {
            title: "Tác giả",
            dataIndex: "author",
            key: "author"
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
            ellipsis: true
        },
        {
            title: "Danh mục",
            dataIndex: "categoryId",
            key: "categoryId",
            render: (categoryId: number) => {
                const category = categories.find(c => c.id === categoryId);
                return category ? category.title : "N/A";
            }
        },
        {
            title: "Thao tác",
            key: "action",
            width: 150,
            render: (_: any, record: Story) => (
                <Space>
                    <Popconfirm
                        title="Xóa truyện?"
                        description="Bạn chắc chắn muốn xóa?"
                        onConfirm={() => deleteStory.mutate(record.id)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Button danger size="small">Xóa</Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <div style={{ padding: "20px" }}>
            <h1>Danh sách</h1>
            
            <Tabs
                defaultActiveKey="stories"
                items={[
                    {
                        key: "stories",
                        label: `Truyện (${stories.length})`,
                        children: stories.length > 0 ? (
                            <Table
                                columns={storyColumns}
                                dataSource={stories}
                                rowKey="id"
                                pagination={{ pageSize: 10 }}
                            />
                        ) : (
                            <Empty description="Chưa có truyện nào" />
                        )
                    },
                    {
                        key: "categories",
                        label: `Danh mục (${categories.length})`,
                        children: categories.length > 0 ? (
                            <Table
                                columns={categoryColumns}
                                dataSource={categories}
                                rowKey="id"
                                pagination={{ pageSize: 10 }}
                            />
                        ) : (
                            <Empty description="Chưa có danh mục nào" />
                        )
                    }
                ]}
            />
        </div>
    );
}
