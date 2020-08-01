import React, { useState } from 'react';
import { Form, Input, Button, Select, InputNumber } from 'antd';
import { HugeHeading } from '../../styles/globalStyles';
import req from '../../requests';
import { useSelector } from 'react-redux';

const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not validate email!',
    number: '${label} is not a validate number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

function CRUDSchool() {
  const { token } = useSelector(state => {
    return { ...state.auth };
  });
  const [Loading, setLoading] = useState(false);
  const [supervisors, setSupervisors] = useState([
    {
      id: 1,
      name: 'user1',
    },
    {
      id: 2,
      name: 'user2',
    },
    {
      id: 3,
      name: 'user3',
    },
  ]);

  const onFinish = values => {
    setLoading(true);
    req.School.registerSchool(values, token).finally(() => setLoading(false));
  };

  const optionMapper = () => {
    return supervisors.map(element => {
      return <Option key={element.id.toString()}>{element.name}</Option>;
    });
  };

  return (
    <div style={{ width: '80%', margin: 'auto', marginTop: '5vh' }}>
      <HugeHeading style={{ width: '100%' }}>Register a School</HugeHeading>
      <Form
        {...layout}
        layout="vertical"
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={['name']}
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['principal']}
          label="Principal's Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['workers_count']}
          label="Number of Workers"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name={['students_count']}
          label="number of Students"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name={['organisation_id']}
          label="Organization ID"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['api_key']}
          label="API Key"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['district']}
          label="Zilla"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['email']}
          label="Email"
          rules={[
            {
              required: true,
              type: 'email',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['contact_no']}
          label="Contact Number"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name={['URL']}
          label="URL"
          rules={[
            {
              required: true,
              type: 'url',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['supervisor']}
          label="Supervisor"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select placeholder="Select a supervisor">{optionMapper()}</Select>
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit" loading={Loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CRUDSchool;
