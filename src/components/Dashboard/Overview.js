import React, { useState, useEffect } from 'react';
import { HugeHeading, Flex, SubHeading } from '../../styles/globalStyles';
import { Card, Statistic, Descriptions, Tag, Button, notification } from 'antd';
import useWindowSize from '../../hooks/useWindowSize';
import data from '../../constants/lang';
import {
  PieChartOutlined,
  UserOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import MQTT from '../MQTT';

function Overview({ lang }) {
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
  useEffect(() => {
    console.log('Hi', size);
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
    }
  }, [status]);
  return (
    <div style={{ margin: '10vh auto' }}>
      {console.log((size.width * 0.8) / 3)}
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
              Aaloo Paratha
            </Descriptions.Item>
            <Descriptions.Item label={data[lang]['SCHOOL_PAGE']['MENU']['BT']}>
              9:00 am
            </Descriptions.Item>
            <Descriptions.Item label={data[lang]['SCHOOL_PAGE']['MENU']['LF']}>
              Mixed Veg
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
          <div>
            <img
              src="https://source.unsplash.com/random"
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
                return !status;
              });
            }}
          >
            Click here to check the status
          </Button>
          <p style={{ marginTop: '20px' }}>
            This will automatically trigger at the Mid Day meal timings
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
