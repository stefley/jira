import React from "react";
import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "unauthenticated-app";

export const RegisterScreen = () => {
  const { register } = useAuth();
  // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const username = (event.currentTarget.elements[0] as HTMLInputElement)
  //     .value;
  //   const password = (event.currentTarget.elements[1] as HTMLInputElement)
  //     .value;
  //   register({ username, password });
  // };
  const handleSubmit = (values: { username: string; password: string }) => {
    register(values);
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input type="text" id="username" placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input type="password" id="password" placeholder="密码" />
      </Form.Item>
      <Form.Item>
        <LongButton type="primary" htmlType="submit">
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
