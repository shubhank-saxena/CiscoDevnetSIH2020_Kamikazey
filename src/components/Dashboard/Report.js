import React, { useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { HugeHeading } from '../../styles/globalStyles';
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

function Report() {
  const [schools, setSchools] = useState([
    {
      id: 1,
      name: 'school1',
    },
    {
      id: 2,
      name: 'school2',
    },
    {
      id: 3,
      name: 'school3',
    },
  ]);
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'cat1',
    },
    {
      id: 2,
      name: 'cat2',
    },
    {
      id: 3,
      name: 'cat3',
    },
  ]);

  const onFinish = values => {
    console.log(values);
  };

  const schoolMapper = () => {
    return schools.map(element => {
      return <Option key={element.id.toString()}>{element.name}</Option>;
    });
  };
  const categoryMapper = () => {
    return schools.map(element => {
      return <Option key={element.id.toString()}>{element.name}</Option>;
    });
  };

  return (
    <div style={{ width: '80%', margin: 'auto', marginTop: '5vh' }}>
      <HugeHeading style={{ width: '100%' }}>Report An Issue</HugeHeading>
      <Form
        {...layout}
        layout="vertical"
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={['school']}
          label="School"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select placeholder="Select a school">{schoolMapper()}</Select>
        </Form.Item>
        <Form.Item
          name={['category']}
          label="Category"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select placeholder="Select a category">{categoryMapper()}</Select>
        </Form.Item>
        <Form.Item
          name={['information']}
          label="Additional Info"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Report;
