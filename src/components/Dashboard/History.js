import React from 'react';
import styled from 'styled-components';
import { HugeHeading, Flex, SubHeading } from '../../styles/globalStyles';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
} from 'recharts';
import { Table, Tag } from 'antd';
function History() {
  const consumptionData = [
    {
      day: 'Monday',
      avgConsumption: 4000,
    },
    {
      day: 'Tuesday',
      avgConsumption: 3000,
    },
    {
      day: 'Wednesday',
      avgConsumption: 2000,
    },
    {
      day: 'Thursday',
      avgConsumption: 2780,
    },
    {
      day: 'Friday',
      avgConsumption: 1890,
    },
    {
      day: 'Saturday',
      avgConsumption: 2390,
    },
  ];
  const attendanceData = [
    {
      day: 'Mon',
      attendance: 70,
    },
    {
      day: 'Tue',
      attendance: 90,
    },
    {
      day: 'Wed',
      attendance: 100,
    },
    {
      day: 'Thu',
      attendance: 30,
    },
    {
      day: 'Fri',
      attendance: 60,
    },
    {
      day: 'Sat',
      attendance: 70,
    },
  ];
  const alertData = [
    { x: 'Mon', y: 0 },
    { x: 'Tue', y: 1 },
    { x: 'Wed', y: 1 },
    { x: 'Thu', y: 0 },
    { x: 'Fri', y: 2 },
    { x: 'Sat', y: 0 },
  ];

  const dataSource = [
    {
      key: '1',
      day: 'Tuesday',
      foodReported: 'Dhokla',
      foodRecognized: 'Idli',
      alertTriggered: 'Yes',
      time: '1pm',
    },
    {
      key: '2',
      day: 'Wednesday',
      foodReported: 'Rajma',
      foodRecognized: 'Aaloo',
      alertTriggered: 'Yes',
      time: '1pm',
    },

    {
      key: '3',
      day: 'Friday',
      foodReported: 'Dhokla',
      foodRecognized: 'Dosa',
      alertTriggered: 'Yes',
      time: '9am',
    },
    {
      key: '4',
      day: 'Friday',
      foodReported: 'Dhokla',
      foodRecognized: 'Dosa',
      alertTriggered: 'Yes',
      time: '1pm',
    },
  ];

  const columns = [
    {
      title: 'Day',
      dataIndex: 'day',
      key: 'day',
    },
    {
      title: 'Food Reported',
      dataIndex: 'foodReported',
      key: 'foodReported',
    },
    {
      title: 'Food Recognized',
      dataIndex: 'foodRecognized',
      key: 'foodRecognized',
    },
    {
      title: 'Alert triggered',
      dataIndex: 'alertTriggered',
      key: 'alertTriggered',
      render: tag => <Tag color="red">{tag}</Tag>,
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
  ];
  return (
    <div>
      <Container
        style={{
          paddingLeft: '50px',
          paddingBottom: '50px',
          paddingRight: '50px',
        }}
      >
        <HugeHeading
          style={{ margin: '50px', marginLeft: '0', paddingTop: '30px' }}
        >
          View Analytics per Week
        </HugeHeading>
        <Flex style={{ paddingBottom: '50px' }}>
          <div>
            <SubHeading style={{ marginBottom: '30px' }}>
              Avg Nutritional Consumption
            </SubHeading>
            <AreaChart
              width={500}
              height={400}
              data={consumptionData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="avgConsumption"
                stroke="#1DA57A"
                fill="#1DA57A"
              />
            </AreaChart>
          </div>
          <div>
            <SubHeading style={{ marginBottom: '30px' }}>
              Attendance this week
            </SubHeading>
            <BarChart
              width={500}
              height={400}
              data={attendanceData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="attendance" fill="#1DA57A" />
            </BarChart>
          </div>
        </Flex>
        <hr />
        <Flex centered>
          <div>
            <SubHeading
              style={{
                textAlign: 'center',
                marginTop: '50px',
                marginBottom: '20px',
                fontWeight: '600',
              }}
            >
              Alerts Triggered Analysis
            </SubHeading>
            <ScatterChart
              width={600}
              height={500}
              margin={{
                top: 20,
                bottom: 20,
              }}
              style={{
                margin: 'auto',
                width: '50% !important',
              }}
            >
              <CartesianGrid />
              <XAxis dataKey="x" name="Day" />
              <YAxis
                type="number"
                dataKey="y"
                name="Alerts triggered"
                unit=""
              />
              <Tooltip cursor={{ strokeDasharray: '5 5' }} />
              <Scatter
                name="Alerts Triggered"
                data={alertData}
                fill="#1DA57A"
              />
            </ScatterChart>
          </div>
        </Flex>
        <hr />
        <SubHeading
          style={{ marginTop: '50px', marginBottom: '20px', fontWeight: '600' }}
        >
          List of all alerts this week
        </SubHeading>
        <Table
          dataSource={dataSource}
          columns={columns}
          style={{ marginTop: '50px' }}
        ></Table>
      </Container>
    </div>
  );
}

export default History;

const Container = styled.div`
  background: white;
  width: 90%;
  margin: auto;
  margin-top: 10vh;
  box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16),
    0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
`;
