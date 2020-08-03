import React, { useState, useEffect } from 'react';
import { HugeHeading, Flex, SubHeading } from '../../styles/globalStyles';
import { Card, Statistic, Descriptions, Tag, Button, notification } from 'antd';
import useWindowSize from '../../hooks/useWindowSize';
import data from '../../constants/lang';
import { useSelector } from 'react-redux';

import {
  PieChartOutlined,
  UserOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import MQTT from '../MQTT';
import req from '../../requests';
import { headers } from '../../requests/headers';

function Overview({ lang, orgId }) {
  const { token } = useSelector(state => {
    return { ...state.auth };
  });
  const size = useWindowSize();
  const [gridStyle, setGridStyle] = useState({
    width: `${(size.width * 0.8) / 3}`,
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    border: 'none',
  });
  const [status, setStatus] = useState(1);
  const [loadingPred, setLoadingPred] = useState(false);
  useEffect(() => {
    if (!('Notification' in window)) {
      console.log('This browser does not support desktop notification');
    } else {
      Notification.requestPermission();
    }
  }, []);
  useEffect(() => {
    // console.log('Hi', size);
    setGridStyle({
      ...gridStyle,
      width: `${size.width < 600 ? '100%' : (size.width * 0.8) / 3}`,
    });
  }, [size]);
  useEffect(() => {
    if (!status) {
      notification.error({
        message: <h2>Menu Doesnt match</h2>,
        description:
          'The image provided for the food does not match up with the menu provided. There might be some discrepancy in the food made, check out the history section for more details',
        placement: 'topLeft',
      });
      showNotifications('Menu Doesnt match');
    }
  }, [status]);

  const checkStatus = url => {
    const data = {
      image_url: url,
      school: orgId,
      category: 'LN',
    };
    setLoadingPred(true);
    console.log(token);
    req.FoodPrediction.foodPrediction(data, token)
      .then(json => {
        console.log(('prediction result:', json));
        if (!json.message) {
          showNotifications(
            `Menu is not Same, food expected: ${json.food_expected}, food recieved: ${json.food_provided}`,
          );
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoadingPred(false));
  };

  const showNotifications = string => {
    new Notification(string);
    fetch('https://kamikazey.shubhank.codes/api/food/mail/', {
      method: 'POST',
      body: JSON.stringify({
        message: string,
        email: 'saxena.shubhank.19@gmail.com',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(json => console.log(json));
  };

  return (
    <div style={{ margin: '10vh auto' }}>
      <Card
        style={{ width: '80vw', minHeight: '40vh' }}
        title={
          <HugeHeading style={{ marginBottom: '0' }}>
            {data[lang]['SCHOOL_PAGE']['HEADER']}
          </HugeHeading>
        }
      >
        <Card.Grid style={gridStyle}>
          {' '}
          <Statistic
            style={{ color: 'white' }}
            title={data[lang]['SCHOOL_PAGE']['CARDS']['OPTION1']}
            value={1128}
            suffix={' grams'}
            prefix={<PieChartOutlined />}
          />
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          {' '}
          <Statistic
            title={data[lang]['SCHOOL_PAGE']['CARDS']['OPTION2']}
            value={2}
            suffix={' males/females'}
            prefix={<UserOutlined />}
          />
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          {' '}
          <Statistic
            title={data[lang]['SCHOOL_PAGE']['CARDS']['OPTION3']}
            value={75}
            suffix={' % this week'}
            prefix={<ScheduleOutlined />}
          />
        </Card.Grid>
        <Card.Grid
          style={{
            ...gridStyle,
            width: '100%',
          }}
        >
          <Descriptions
            title="Todays Menu"
            bordered
            column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
          >
            <Descriptions.Item label={data[lang]['SCHOOL_PAGE']['MENU']['BF']}>
              Dhokla
            </Descriptions.Item>
            <Descriptions.Item label={data[lang]['SCHOOL_PAGE']['MENU']['BT']}>
              9:00 am
            </Descriptions.Item>
            <Descriptions.Item label={data[lang]['SCHOOL_PAGE']['MENU']['LF']}>
              Dhokla
            </Descriptions.Item>
            <Descriptions.Item label={data[lang]['SCHOOL_PAGE']['MENU']['LF']}>
              1:00 pm
            </Descriptions.Item>
            <Descriptions.Item
              label={data[lang]['SCHOOL_PAGE']['MENU']['OFFICIAL']}
            >
              Rajesh Kumar
            </Descriptions.Item>
            <Descriptions.Item
              label={data[lang]['SCHOOL_PAGE']['MENU']['STATUS']}
            >
              {status ? (
                <Tag color="green">Menu is Same</Tag>
              ) : (
                <Tag color="red">Menu is not the Same</Tag>
              )}
            </Descriptions.Item>
          </Descriptions>
        </Card.Grid>
        <Card.Grid
          style={{
            ...gridStyle,
            alignItems: 'flex-start',
            width: '100%',
          }}
        >
          <SubHeading style={{ fontSize: '32px', marginBottom: '20px' }}>
            Food Status Details
          </SubHeading>
          <Flex spaceBetween style={{ width: '80%', margin: 'auto' }}>
            <div>
              <div>
                <img
                  src="https://smedia2.intoday.in/aajtak/images/stories/012018/dhokla-pakwangali-520_010818080605.jpg?size=1200:675"
                  height="250px"
                  width="auto"
                  style={{ margin: 0, padding: 0 }}
                ></img>
              </div>
              <Button
                style={{ marginTop: '20px' }}
                type="primary"
                onClick={() => {
                  checkStatus(
                    'https://smedia2.intoday.in/aajtak/images/stories/012018/dhokla-pakwangali-520_010818080605.jpg?size=1200:675',
                  );
                }}
              >
                Click here to check the status
              </Button>
            </div>
            <div>
              <div>
                <img
                  src="https://www.indianhealthyrecipes.com/wp-content/uploads/2019/11/samosa-recipe.jpg"
                  height="250px"
                  width="auto"
                  style={{ margin: 0, padding: 0 }}
                ></img>
              </div>
              <Button
                style={{ marginTop: '20px' }}
                type="primary"
                onClick={() => {
                  setStatus(status => {
                    if (!status) {
                      notification.error({
                        message: <h2>Menu Doesnt match</h2>,
                        description:
                          'The image provided for the food does not match up with the menu provided. There might be some discrepancy in the food made, check out the history section for more details',
                        placement: 'topLeft',
                      });
                    }
                    return false;
                  });
                  checkStatus(
                    'https://www.indianhealthyrecipes.com/wp-content/uploads/2019/11/samosa-recipe.jpg',
                  );
                }}
              >
                Click here to check the status
              </Button>
            </div>
          </Flex>
          <p style={{ marginTop: '20px' }}>
            This will automatically trigger at the Mid Day meal timings
          </p>
        </Card.Grid>
        <Card.Grid
          style={{
            ...gridStyle,
            alignItems: 'flex-start',
            width: '100%',
          }}
        >
          <SubHeading style={{ fontSize: '32px', marginBottom: '20px' }}>
            Attendance Status Details
          </SubHeading>
          <Flex spaceBetween style={{ width: '80%', margin: 'auto' }}>
            <div>
              <div>
                <img
                  src="https://cdn.discordapp.com/attachments/734828835035676814/739776400210526208/2020-08-03-145616.jpg"
                  height="250px"
                  width="auto"
                  style={{ margin: 0, padding: 0 }}
                ></img>
              </div>
              <Button
                style={{ marginTop: '20px' }}
                type="primary"
                onClick={() => {
                  new Notification('Discrepancy detected in attendance');
                  notification.info({
                    message: <h2>error in attendance</h2>,
                    description:
                      'Error in student counting. Total student expected: 2, students detected: 1. Missing Student: Priyansh',
                    placement: 'topLeft',
                  });
                  showNotifications(
                    'Error in student counting. Total student expected: 2, students detected: 1. Missing Student: Priyansh',
                  );
                }}
              >
                Click here to check the status
              </Button>
            </div>
            <div>
              <div>
                <img
                  src="https://cdn.discordapp.com/attachments/734828835035676814/739776407999217776/2020-08-03-145631.jpg"
                  height="250px"
                  width="auto"
                  style={{ margin: 0, padding: 0 }}
                ></img>
              </div>
              <Button
                style={{ marginTop: '20px' }}
                type="primary"
                onClick={() => {
                  new Notification('All students present');
                  notification.info({
                    message: <h2>All students present</h2>,
                    placement: 'topLeft',
                  });
                }}
              >
                Click here to check the status
              </Button>
            </div>
          </Flex>
          <p style={{ marginTop: '20px' }}>
            This will automatically trigger at the attendance time
          </p>
        </Card.Grid>
      </Card>
      {/* <MQTT /> */}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    lang: state.gen.lang,
  };
};

export default connect(mapStateToProps)(Overview);
