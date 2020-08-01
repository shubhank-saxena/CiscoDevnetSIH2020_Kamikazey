import React, { useState, useEffect } from 'react';
import { HugeHeading, Flex } from '../../styles/globalStyles';
import { Card, Statistic, Descriptions, Tag } from 'antd';
import useWindowSize from '../../hooks/useWindowSize';
import data from '../../constants/lang';
import {
  PieChartOutlined,
  UserOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';

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
  useEffect(() => {
    console.log('Hi', size);
    setGridStyle({
      ...gridStyle,
      width: `${size.width < 600 ? '100%' : (size.width * 0.8) / 3}`,
    });
  }, [size]);
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
              <Tag color="green">Menu is Same</Tag>
            </Descriptions.Item>
          </Descriptions>
        </Card.Grid>
      </Card>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    lang: state.gen.lang,
  };
};

export default connect(mapStateToProps)(Overview);