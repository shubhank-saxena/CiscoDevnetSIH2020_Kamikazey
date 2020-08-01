import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { Container, SubContainer, Text } from './styles';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

function Login() {
  const [Loading, setLoading] = useState(false);

  const onFinish = values => {
    console.log('finished');
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Container>
      <SubContainer>
        <Text>
          <h1>LOGIN</h1>
          <h2>Welcome to Cisco</h2>
        </Text>

        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="EMAIL"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
              {
                type: 'email',
                message: 'Please Enter valid email id',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="PASSWORD"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" loading={Loading}>
              LOGIN
            </Button>
          </Form.Item>
        </Form>
      </SubContainer>
    </Container>
  );
}

export default Login;
