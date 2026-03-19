import { Table, Button, Popconfirm, Space, Input, Empty, message } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

interface Story {
    id: number;
    title: string;
    author: string;
    image: string;
    description: string;
    categoryId?: number;
    createdAt?: string;
}

interface Category {
    id: number;
    title: string;
    description: string;
    active?: boolean;
}

export default function Lab5() {
    const queryClient = useQueryClient();
    const [searchKeyword, setSearchKeyword] = useState("");

    // Fetch categories
    const { data: categories = [] } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const response = await axios.get("http://localhost:3000/categories");
            return response.data;
        }
    });

    // Fetch stories
    const { data: stories = [] } = useQuery({
        queryKey: ["stories"],
        queryFn: async () => {
            const response = await axios.get("http://localhost:3000/stories");
            console.log("Stories fetched:", response.data);
            return response.data;
        }
    });

    // Delete story mutation
    const deleteStory = useMutation({
        mutationFn: async (id: number) => {
            await axios.delete(`http://localhost:3000/stories/${id}`);
        },
        onSuccess: () => {
            toast.success("Xóa truyện thành công");
            // Bài 4: Reload danh sách sau khi xóa
            queryClient.invalidateQueries({ queryKey: ["stories"] });
        },
        onError: () => {
            toast.error("Xóa truyện thất bại");
        }
    });

    // Bài 5: Lọc danh sách theo keyword
    const filteredStories = stories.filter((story: Story) =>
        story.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    // Bài 1 & 2: Định nghĩa cột
    const columns = [
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
                const category = categories.find((c: Category) => c.id === categoryId);
                return category ? category.title : "N/A";
            }
        },
        // Bài 1: Hiển thị cột Created At
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (date: string) => {
                if (!date) return "N/A";
                return new Date(date).toLocaleDateString("vi-VN");
            }
        },
        // Bài 2: Thêm cột Action (Xóa)
        {
            title: "Action",
            key: "action",
            width: 150,
            render: (_: any, record: Story) => (
                <Space>
                    <Popconfirm
                        title="Xóa truyện?"
                        description="Bạn chắc chắn muốn xóa truyện này?"
                        onConfirm={() => deleteStory.mutate(record.id)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Button danger size="small" loading={deleteStory.isPending}>
                            Xóa
                        </Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <div style={{ padding: "20px" }}>
            <h1>Danh sách truyện</h1>

            {/* Bài 5: Tìm kiếm truyện */}
            <div style={{ marginBottom: "20px" }}>
                <Input
                    placeholder="Tìm kiếm theo tên truyện..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    style={{ maxWidth: "300px" }}
                />
            </div>

            {filteredStories.length > 0 ? (
                <Table
                    columns={columns}
                    dataSource={filteredStories}
                    rowKey="id"
                    // Bài 3: Thêm phân trang
                    pagination={{ pageSize: 5, showTotal: (total) => `Tổng ${total} truyện` }}
                />
            ) : (
                <Empty description="Không tìm thấy truyện nào" />
            )}
        </div>
    );
}
