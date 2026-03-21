import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button,Form, Input, Spin } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditStory(){
    const [form] = Form.useForm();
    const {id} = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {data, isLoading} = useQuery({
        queryKey: ['story'],
        queryFn: async() =>{
            const res = await axios.get("http://localhost:3000/stories/1");
            return res.data;
        },
    });
    //fil vào form
    useEffect(()=>{
        if(data){
            form.setFieldsValue(data);
        }
    },[data]);
    // cập nhập
    const mutation = useMutation({
        mutationFn: async(value: any)=>{
            return axios.put(`http://localhost:3000/stories/${id}`,values);
        },
        onSuccess: ()=>{
            // reload danh sách
            queryClient.invalidateQueries({querykey: ["stories"]});
            navigate("/");
                }
    });
    const onFinish = (values: any)=>{
        mutation.mutate(values);
    };
    if(isLoading) return <Spin/>
    return(
        <Form onFinish={onFinish}>
            <Form.Item label="Tên truyện" name="title">
                <Input/>
            </Form.Item>
            <Form.Item label="Tác Giả" name="author">
                <Input/>
            </Form.Item>
            <Form.Item label="image" name="Ảnh">
                <Input/>
            </Form.Item>
            <Form.Item label="description" name="Mô tả">
                <Input.TextArea/>
            </Form.Item>
            <Button htmlType="submit" type="primary" loading={mutation.isPending}>Cập nhập</Button>
        </Form>
    )
}