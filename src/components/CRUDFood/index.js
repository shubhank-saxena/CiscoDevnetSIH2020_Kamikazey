import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  List,
  Typography,
  Divider,
  InputNumber,
} from 'antd';
import { HugeHeading } from '../../styles/globalStyles';
import req from '../../requests';
import { useSelector } from 'react-redux';
import { DeleteOutlined, DeleteFilled } from '@ant-design/icons';

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

function CRUDFood() {
  const { token } = useSelector(state => {
    return { ...state.auth };
  });
  const [CreationLoading, setCreationLoading] = useState(false);
  const [ListLoading, setListLoading] = useState(true);
  const [foodList, setFoodList] = useState();

  useEffect(() => {
    getAllFoodItems();
  }, []);

  const onFinish = values => {
    setCreationLoading(true);
    req.School.registerFood(values, token).finally(() => {
      setCreationLoading(false);
      getAllFoodItems();
    });
  };

  const getAllFoodItems = () => {
    setListLoading(true);
    req.School.getFood(token)
      .then(json => {
        setFoodList(json);
      })
      .finally(() => setListLoading(false));
  };

  const DeleteFoodItem = id => {
    setListLoading(true);
    req.School.deleteFoodItem(id, token).finally(() => {
      setListLoading(false);
      getAllFoodItems();
    });
  };

  return (
    <div style={{ width: '80%', margin: 'auto', marginTop: '5vh' }}>
      <HugeHeading style={{ width: '100%' }}>Food Items</HugeHeading>
      <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
        <div style={{ width: '100%', height: '100%' }}>
          <Form
            {...layout}
            layout="vertical"
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Form.Item
              name={['food_item']}
              label="Food Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={['nutrition']}
              label="Calories per 100g"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              name={['wastage']}
              label="Wastage per Week in Kg"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
            <div
              style={{
                display: 'flex',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 0 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={CreationLoading}
                >
                  Submit
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
        <div style={{ width: '30%', height: '100%' }}>
          <List
            header={<h3>Food Items</h3>}
            bordered
            dataSource={foodList}
            loading={ListLoading}
            renderItem={item => (
              <List.Item>
                <Typography.Text>{item.food_item}</Typography.Text>
                <Typography.Text>{item.nutrition} cal/100g</Typography.Text>
                <DeleteOutlined
                  style={{ color: 'red' }}
                  onClick={() => DeleteFoodItem(item.id)}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default CRUDFood;
