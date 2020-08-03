import React, { useState, useEffect } from 'react';
import { HugeHeading, SubHeading, Flex } from '../../styles/globalStyles';
import { Card, Carousel, Statistic, Button, Modal } from 'antd';
import useWindowSize from '../../hooks/useWindowSize';

import '../../styles/students.css';

function Students() {
  const size = useWindowSize();
  const [modalVisible, setModalVisible] = useState(false);
  const [gridStyle, setGridStyle] = useState({
    width: `${(size.width * 0.8) / 3}`,
    minHeight: '200px',
    height: '40vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    border: 'none',
    marginLeft: '50px',
  });
  useEffect(() => {
    setGridStyle({
      ...gridStyle,
      width: `${size.width < 600 ? '100%' : '40%'}`,
    });
  }, [size]);
  const handleOk = () => {
    setModalVisible(false);
  };

  return (
    <div style={{ marginTop: '10vh' }}>
      <HugeHeading>Student Details</HugeHeading>
      <Card style={{ border: 'none', width: '100%' }}>
        <Card.Grid style={gridStyle}>
          <Carousel
            autoplay
            autoplaySpeed={4000}
            dotPosition={'bottom'}
            style={{ height: '100%', marginTop: '2em', paddingTop: '3em' }}
          >
            <div>
              <HugeHeading
                style={{
                  fontWeight: '600',
                  marginBottom: '0.5em',
                  fontSize: '1.5em',
                }}
              >
                Avg Nutrition Consumption per Student Today
              </HugeHeading>
              <Statistic value={1128} suffix="grams/day" />
            </div>
            <div>
              <HugeHeading
                style={{
                  fontWeight: '600',
                  marginBottom: '0.5em',
                  fontSize: '1.5em',
                }}
              >
                Avg Nutrition Consumption per Student this Week
              </HugeHeading>
              <Statistic value={1000} suffix="grams/week" />
            </div>
          </Carousel>
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <div
            style={{
              height: '40vh',
              marginLeft: '20px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <HugeHeading
              style={{
                fontWeight: '600',
                marginBottom: '2px',
                fontSize: '1.5em',
              }}
            >
              Attendance
            </HugeHeading>
            <Statistic style={{ margin: 0 }} value={75} suffix="% today" />
            <Button
              style={{ width: '50%', alignSelf: 'center', marginTop: '20px' }}
              onClick={() => {
                setModalVisible(true);
              }}
            >
              List of Absentees
            </Button>
          </div>
        </Card.Grid>
      </Card>
      <Modal
        title="List Of Absentees"
        centered
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleOk}
      >
        <ul>
          <li>Rajesh Kumar</li>
          <li>Jay Parmani</li>
          <li>Parth Shah</li>
        </ul>
      </Modal>
    </div>
  );
}

export default Students;
