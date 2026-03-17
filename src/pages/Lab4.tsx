import { Input, Form, Button } from "antd";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useRef } from "react";

export default function Lab4() {
    const storiesFormRef = useRef<any>(null);
    const categoriesFormRef = useRef<any>(null);

    // Mutation cho Stories
    const { mutate: mutateStories, isPending: isStoriesPending, isSuccess: isStoriesSuccess } = useMutation({
        mutationFn: async (data: any) =>{
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
        mutationFn: async (data: any) =>{
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

    const onFinishStories = (values: any) =>{
        mutateStories(values)
    }

    const onFinishCategories = (values: any) =>{
        mutateCategories(values)
    } 

    return (
        <div>
        <Form ref={storiesFormRef} layout="vertical" onFinish={onFinishStories} style={{maxWidth: 500}}>
            <h1>Thêm danh sách truyện</h1>
            <Form.Item label="Tên truyện" name="title"
                rules={[{ required: true, message: "Nhập tên truyện"}]}>
                <Input placeholder="title"/>
            </Form.Item>
            <Form.Item label="Tác giả" name="author">
                <Input placeholder="author"/>
            </Form.Item>
            <Form.Item label="Hình ảnh" name="image">
                <Input placeholder="image"/>
            </Form.Item>
            <Form.Item label="Mô tả" name="description">
                <Input.TextArea rows={4}/>
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={isStoriesPending}>
                {isStoriesSuccess ? "Thành công" : "Thêm truyện"}
            </Button>
        </Form>

        <Form ref={categoriesFormRef} layout="vertical" onFinish={onFinishCategories} style={{maxWidth: 500, marginLeft: "auto"}}>
            <h1>Thêm danh mục</h1>
            <Form.Item label="Tên danh mục" name="title"
                rules={[{ required: true, message: "Nhập tên danh mục"}]}>
                <Input placeholder="title"/>
            </Form.Item>
            <Form.Item label="Mô tả" name="description">
                <Input.TextArea rows={4}/>
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={isCategoriesPending}>
                {isCategoriesSuccess ? "Thành công" : "Thêm danh mục"}
            </Button>
        </Form>
        </div>
    )
}
