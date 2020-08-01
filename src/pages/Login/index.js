import React, { useState } from 'react';
import { Form, Input, Button, Collapse } from 'antd';
import { Container, SubContainer, Text } from './styles';
import { connect, useDispatch } from 'react-redux';
import { login } from '../../redux/actions';

import data from '../../constants/lang';
import req from '../../requests';
import ImgLogin from '../../assets/undraw_authentication_fsn5.svg';
import { HugeHeading, SubHeading } from '../../styles/globalStyles';
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
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);

  const onFinish = values => {
    setLoading(true);
    req.Auth.login(values)
      .then(json => {
        if (json.key && json.groups)
          dispatch(login('Token ' + json.key, json.groups));
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Container>
      <SubContainer>
        <Text>
          <img src={ImgLogin} alt="image"></img>
        </Text>
        <Form
          className="form"
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <HugeHeading style={{ textAlign: 'center', marginBottom: '1vh' }}>
            {data[lang]['LOGIN_SUBHEADER']}
          </HugeHeading>
          <SubHeading style={{ textAlign: 'center', marginBottom: '5vh' }}>
            {data[lang]['LOGIN_HEADER']}
          </SubHeading>
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
              {data[lang]['LOGIN_BTN']}
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
