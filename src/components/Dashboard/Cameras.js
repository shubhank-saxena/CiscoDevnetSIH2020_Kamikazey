import React, { useState, useEffect } from 'react';
import { HugeHeading, Flex } from '../../styles/globalStyles';
import { Card, Statistic, Descriptions, Tag, Result, Button } from 'antd';
import useWindowSize from '../../hooks/useWindowSize';
import data from '../../constants/lang';
import {
  PieChartOutlined,
  UserOutlined,
  ScheduleOutlined,
  CameraOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';

function Camera({ lang }) {
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
        title={<HugeHeading style={{ marginBottom: '0' }}>Cameras</HugeHeading>}
      >
        <Card.Grid style={gridStyle}>
          {' '}
          <Result
            icon={<CameraOutlined />}
            title="Camera 1"
            extra={[
              <Button type="primary" key="console">
                Snapshot
              </Button>,
              <Button key="buy">Live Stream</Button>,
            ]}
          />
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          {' '}
          <Result
            icon={<CameraOutlined />}
            title="Camera 2"
            extra={[
              <Button type="primary" key="console">
                Snapshot
              </Button>,
              <Button key="buy">Live Stream</Button>,
            ]}
          />
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          {' '}
          <Result
            icon={<CameraOutlined />}
            title="Camera 3"
            extra={[
              <Button type="primary" key="console">
                Snapshot
              </Button>,
              <Button key="buy">Live Stream</Button>,
            ]}
          />
        </Card.Grid>
        {/* <Card.Grid
          style={{
            ...gridStyle,
            width: '100%',
          }}
        ></Card.Grid> */}
      </Card>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    lang: state.gen.lang,
  };
};

export default connect(mapStateToProps)(Camera);
