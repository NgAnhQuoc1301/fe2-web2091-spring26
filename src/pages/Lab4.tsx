import { Input, Form, Button, Checkbox, Select, Spin } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useRef, useState } from "react";

// Types/Interfaces for Exercise 2
interface CategoryData {
    title: string;
    description: string;
    active?: boolean;
    id?: number;
}

interface StoryData {
    title: string;
    author: string;
    image: string;
    description: string;
    categoryId?: number;
    id?: number;
}

interface Category {
    id: number;
    title: string;
    description: string;
    active?: boolean;
}

export default function Lab4() {
    const storiesFormRef = useRef<any>(null);
    const categoriesFormRef = useRef<any>(null);

    // Exercise 4: Fetch categories list
    const { data: categoriesData, isLoading: isCategoriesLoading, error: categoriesError } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            try {
                const response = await axios.get("http://localhost:3000/categories");
                console.log("Categories fetched:", response.data);
                return response.data;
            } catch (error) {
                console.error("Error fetching categories:", error);
                throw error;
            }
        }
    });

    // Mutation cho Stories
    const { mutate: mutateStories, isPending: isStoriesPending, isSuccess: isStoriesSuccess } = useMutation({
        mutationFn: async (data: StoryData) =>{
            await axios.post("http://localhost:3000/stories", data)
        },
        onSuccess: () =>{
            toast.success("Thêm truyện thành công");
            storiesFormRef.current?.resetFields();
        },
        onError: () =>{
            toast.error("Thêm truyện thất bại")
        }
    });
    
    // categories
    const { mutate: mutateCategories, isPending: isCategoriesPending, isSuccess: isCategoriesSuccess } = useMutation({
        mutationFn: async (data: CategoryData) =>{
            await axios.post("http://localhost:3000/categories", data)
        },
        onSuccess: () =>{
            toast.success("Thêm danh mục thành công");
            categoriesFormRef.current?.resetFields();
        },
        onError: () =>{
            toast.error("Thêm danh mục thất bại")
        }
    });

    const onFinishStories = (values: StoryData) =>{
        console.log("Stories data:", values);
        mutateStories(values)
    }

    const onFinishCategories = (values: CategoryData) =>{
        // Loại bỏ giá trị undefined từ active
        const dataToSend = {
            title: values.title,
            description: values.description,
            ...(values.active && { active: values.active })
        };
        console.log("Categories data:", dataToSend);
        mutateCategories(dataToSend as CategoryData)
    }

    // Exercise 4: Prepare category options for Select
    const categoryOptions = (categoriesData || []).map((category: Category) => ({
        value: category.id,
        label: category.title
    })); 

    return (
        <div style={{display: "flex", gap: "40px", padding: "20px"}}>
            {/* Stories Form */}
            <Form ref={storiesFormRef} layout="vertical" onFinish={onFinishStories} style={{maxWidth: 500}}>
                <h1>Thêm danh sách truyện</h1>
                <Form.Item label="Tên truyện" name="title"
                    rules={[{ required: true, message: "Nhập tên truyện"}]}>
                    <Input placeholder="title" disabled={isStoriesPending}/>
                </Form.Item>
                <Form.Item label="Tác giả" name="author">
                    <Input placeholder="author" disabled={isStoriesPending}/>
                </Form.Item>
                <Form.Item label="Hình ảnh" name="image">
                    <Input placeholder="image" disabled={isStoriesPending}/>
                </Form.Item>
                <Form.Item label="Mô tả" name="description">
                    <Input.TextArea rows={4} disabled={isStoriesPending}/>
                </Form.Item>
                
                {/* Exercise 4: Category Select */}
                <Form.Item label="Danh mục" name="categoryId">
                    <Select 
                        placeholder="Chọn danh mục" 
                        options={categoryOptions}
                        disabled={isStoriesPending}
                        loading={isCategoriesLoading}
                    />
                </Form.Item>

                {/* Exercise 3: Loading state with isPending */}
                <Button type="primary" htmlType="submit" loading={isStoriesPending} block>
                    {isStoriesPending ? "Đang thêm..." : isStoriesSuccess ? "Thành công" : "Thêm truyện"}
                </Button>
            </Form>

            {/* Categories Form */}
            <Form ref={categoriesFormRef} layout="vertical" onFinish={onFinishCategories} style={{maxWidth: 500}}>
                <h1>Thêm danh mục</h1>
                <Form.Item label="Tên danh mục" name="title"
                    rules={[{ required: true, message: "Nhập tên danh mục"}]}>
                    <Input placeholder="title" disabled={isCategoriesPending}/>
                </Form.Item>
                <Form.Item label="Mô tả" name="description">
                    <Input.TextArea rows={4} disabled={isCategoriesPending}/>
                </Form.Item>
                
                {/* Exercise 1: Active Checkbox - Optional field */}
                <Form.Item label="Kích hoạt" name="active" valuePropName="checked" initialValue={false}>
                    <Checkbox disabled={isCategoriesPending}/>
                </Form.Item>

                {/* Exercise 3: Loading state with isPending */}
                <Button type="primary" htmlType="submit" loading={isCategoriesPending} block>
                    {isCategoriesPending ? "Đang thêm..." : isCategoriesSuccess ? "Thành công" : "Thêm danh mục"}
                </Button>
            </Form>
        </div>
    )
}
