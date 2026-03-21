import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Spin, message } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Lab6(){
    const [form] = Form.useForm();
    const {id} = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {data, isLoading} = useQuery({
        queryKey: ['story', id],
        queryFn: async() =>{
            const res = await axios.get(`http://localhost:3000/stories/${id}`);
            return res.data;
        },
    });
    //fil vào form
    useEffect(()=>{
        if(data){
            form.setFieldsValue(data);
        }
    },[data, form]);
    const mutation = useMutation({
        mutationFn: async(values: any)=>{
            return axios.patch(`http://localhost:3000/stories/${id}`, {
                title: values.title,
            });
        },
        onSuccess: ()=>{
            message.success("Cập nhập thành công");
            // reload danh sách
            queryClient.invalidateQueries({queryKey: ["stories"]});
            navigate("/");
        }
    });
    
    const onFinish = (values: any)=>{
        mutation.mutate(values);
    };
    
    if(isLoading) return <Spin/>
    return(
        <Form form={form} onFinish={onFinish} disabled={isLoading}>
            <Form.Item label="Tên truyện" name="title">
                <Input/>
            </Form.Item>
            <Form.Item label="Tác Giả" name="author">
                <Input/>
            </Form.Item>
            <Form.Item label="image" name="image">
                <Input/>
            </Form.Item>
            <Form.Item label="description" name="description">
                <Input.TextArea/>
            </Form.Item>
            <Button htmlType="submit" type="primary" loading={mutation.isPending}>Cập nhập (PATCH)</Button>
        </Form>
    )
}
