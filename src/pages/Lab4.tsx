import { Input, Form, Button } from "antd";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
export default function Lab4() {
    const { mutate, isPending, isSuccess} = useMutation({
        mutationFn: async (data: any) =>{
            await axios.post("http://localhost:3000/stories",data)
        },
        onSuccess: () =>{
            toast.success("Thêm truyện thành công")
        },
        onError: () =>{
            toast.error("Thêm truyện thất bại")
        }
    });     
    const onFinish = (values: any)=>{
        mutate(values)
} 

    return (
        
        <Form layout="vertical" onFinish={onFinish} style={{maxWidth: 500}}>
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
            <Button type="primary" htmlType="submit" loading={isPending}>
                {isSuccess ? "Thành công" : "Thêm truyện"}
            </Button>
        </Form>
    )
}
