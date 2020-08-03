import React from 'react';
import { Tabs, Descriptions, Button } from 'antd';
import { HugeHeading, SubHeading } from '../../styles/globalStyles';
const { TabPane } = Tabs;

function Admin() {
  const menu = [
    {
      day: 'Monday',
      breakfast: 'Aaloo Paratha',
      lunch: 'Chawal Daal',
    },
    {
      day: 'Tuesday',
      breakfast: 'Gobi Paratha',
      lunch: 'Poori Sabzi',
    },
    {
      day: 'Wednesday',
      breakfast: 'Salad',
      lunch: 'Chawal Daal',
    },
    {
      day: 'Thursday',
      breakfast: 'Aaloo poori',
      lunch: 'Chawal Daal',
    },
    {
      day: 'Friday',
      breakfast: 'Idli ',
      lunch: 'Chawal Daal',
    },
    {
      day: 'Saturday',
      breakfast: 'Aaloo Paratha',
      lunch: 'Chawal Daal',
    },
  ];

  return (
    <div style={{ width: '100%', marginTop: '10vh', marginLeft: '5vw' }}>
      <HugeHeading style={{ marginBottom: '2vh' }}>
        Menu of the week
      </HugeHeading>
      <Tabs defaultActiveKey="1" tabPosition={`top`} style={{ width: '50%' }}>
        {menu.map((item, i) => (
          <TabPane tab={`${item.day}`} key={i}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Descriptions
                title={`Menu for ${item.day}`}
                bordered
                column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
              >
                <Descriptions.Item label="Breakfast Menu">
                  {item.breakfast}
                </Descriptions.Item>
                <Descriptions.Item label="Breakfast Time">
                  9:00 am
                </Descriptions.Item>
                <Descriptions.Item label="Lunch Menu">
                  {item.lunch}
                </Descriptions.Item>
                <Descriptions.Item label="Lunch Time">
                  1:00 pm
                </Descriptions.Item>
              </Descriptions>
              {/* <Button
                type="primary"
                style={{ marginTop: '2em', alignSelf: 'flex-end' }}
              >
                Contractor Details
              </Button> */}
            </div>
          </TabPane>
        ))}
      </Tabs>
      <Descriptions
        title={`Contractor Details`}
        bordered
        column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
        style={{ width: '60%', marginTop: '50px' }}
      >
        <Descriptions.Item label="Name">Rajesh Kumar</Descriptions.Item>
        <Descriptions.Item label="Age">49</Descriptions.Item>
        <Descriptions.Item label="Aadhaar Number">
          xxxxx-xxxx-xxx
        </Descriptions.Item>
        <Descriptions.Item label="Mobile Number">99999999</Descriptions.Item>
      </Descriptions>
    </div>
  );
}

export default Admin;
