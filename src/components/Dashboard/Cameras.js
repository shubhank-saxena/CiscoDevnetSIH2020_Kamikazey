import React, { useState, useEffect } from 'react';
import { HugeHeading, Flex } from '../../styles/globalStyles';
import {
  Card,
  Statistic,
  Descriptions,
  Tag,
  Result,
  Button,
  Modal,
} from 'antd';
import useWindowSize from '../../hooks/useWindowSize';
import data from '../../constants/lang';
import req from '../../requests';
import {
  PieChartOutlined,
  UserOutlined,
  ScheduleOutlined,
  CameraOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';

function Camera({ lang }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [snap, setSnap] = useState(null);
  const [snap2, setSnap2] = useState(null);
  const [snapLoading, setSnapLoading] = useState(true);
  const [errSnap, setErrSnap] = useState(null);
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
  const handleOk = () => {
    setModalVisible(false);
  };
  useEffect(() => {
    console.log('Hi', size);
    setGridStyle({
      ...gridStyle,
      width: `${size.width < 600 ? '100%' : (size.width * 0.8) / 3}`,
    });
  }, [size]);

  const handleSnapshot = () => {
    setModalVisible(true);
    const networkId = 'N_711005791171205780';
    const deviceId = 'Q2JV-BY67-ABC8';
    getSnapshot(networkId, deviceId);
  };
  const getSnapshot = (networkId, deviceId) => {
    setSnapLoading(true);
    req.Snapshot.getSnapshot(networkId, deviceId)
      .then(json => {
        console.log(json);
        setSnap(json);
        setSnap2(json);
        setErrSnap(null);
      })
      .catch(err => setErrSnap(err))
      .finally(() => setSnapLoading(false));
  };

  useEffect(() => {
    setSnap(snap2);
  }, [snap]);

  const reloadSnap = () => {
    setSnap({ url: '' });
  };

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
              <Button
                type="primary"
                key="console"
                onClick={() => {
                  handleSnapshot();
                }}
              >
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
      <Modal
        title="List Of Absentees"
        centered
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleOk}
      >
        {snapLoading ? (
          <h1>Loading</h1>
        ) : !errSnap ? (
          <img
            src={snap.url}
            style={{ width: '100%', height: '100%' }}
            onError={() => reloadSnap()}
          ></img>
        ) : (
          <h1>Error</h1>
        )}
      </Modal>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    lang: state.gen.lang,
  };
};

export default connect(mapStateToProps)(Camera);
