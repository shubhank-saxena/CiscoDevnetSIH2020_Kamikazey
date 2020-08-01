import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { Container, SubContainer, Text } from './styles';
import data from '../../constants/lang';
import { connect } from 'react-redux';

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

function Login({ lang }) {
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
          <h1>{data[lang]['LOGIN_HEADER']}</h1>
          <h2>{data[lang]['LOGIN_SUBHEADER']}</h2>
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
            label={data[lang]['EMAIL']}
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
            label={data[lang]['PASSWORD']}
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

const mapStateToProps = state => {
  return {
    lang: state.gen.lang,
  };
};

export default connect(mapStateToProps)(Login);
