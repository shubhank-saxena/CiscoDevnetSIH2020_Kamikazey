import React, { useState, useEffect } from 'react';
import { HugeHeading } from '../../styles/globalStyles';
import { Table, Modal, Form, Input, Button } from 'antd';
import { useSelector } from 'react-redux';
import req from '../../requests';

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

function ScheduleTimeTable() {
  const [Visible, setVisible] = useState(false);
  const [ScheduleForm] = Form.useForm();
  const { token } = useSelector(state => {
    return { ...state.auth };
  });

  useEffect(() => {
    req.School.getSchedule(token);
  }, []);

  const onFinish = values => {
    console.log(values);
  };
  const onOk = () => {
    console.log('ok');
    ScheduleForm.validateFields()
      .then(values => {
        console.log(values);
        req.School.creatSchedule({ ...values, category: 'LN' }, token);
        ScheduleForm.resetFields();
      })
      .catch(err => console.error(err));
    setVisible(false);
  };

  const onCancel = () => {
    console.log('cancel');
    setVisible(false);
  };

  return (
    <div style={{ width: '80%', marginTop: '5vh' }}>
      <HugeHeading style={{ width: '100%' }}>Mid Day Meals Timing</HugeHeading>
      <div>
        <Table />
        <Modal
          title="Create Schedule"
          visible={Visible}
          onOk={() => onOk()}
          onCancel={() => onCancel()}
        >
          <Form
            layout="vertical"
            name="create-schedule"
            onFinish={onFinish}
            validateMessages={validateMessages}
            form={ScheduleForm}
          >
            <Form.Item
              name={['school']}
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
              name={['time']}
              label="Time"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="HH:MM" />
            </Form.Item>
          </Form>
        </Modal>
        <div style={{ marginTop: '2%' }}>
          <Button onClick={() => setVisible(!Visible)} type="primary">
            Create New Schedule
          </Button>
          <Button
            onClick={() => setVisible(!Visible)}
            type="primary"
            style={{ marginLeft: '1%' }}
          >
            Create new Mapping
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ScheduleTimeTable;
