import React, { useState, useEffect } from 'react';
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
import { headers } from '../../requests/headers';
import useInterval from '../../hooks/useInterval';
function History() {
  const [merakiDataFetch, setMerakiDataFetch] = useState(null);
  const [merakiLiveGraphData, setMerakiLiveGraphData] = useState([]);

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

  //MQTT DATA - {ts: 1596444580545, objects: Array(2)}
  const merakiLiveData = [
    {
      x: `${new Date(1382086394000).getHours()}:${new Date(
        1382086394000,
      ).getMinutes()}:${new Date(1382086394000).getSeconds()}`,
      y: 0,
    },
    {
      x: `${new Date(1382086394000).getHours()}:${new Date(
        1382086394000,
      ).getMinutes()}:${new Date(1382086394000).getSeconds()}`,
      y: 1,
    },
    {
      x: `${new Date(1382086394000).getHours()}:${new Date(
        1382086394000,
      ).getMinutes()}:${new Date(1382086394000).getSeconds()}`,
      y: 1,
    },
    {
      x: `${new Date(1382086394000).getHours()}:${new Date(
        1382086394000,
      ).getMinutes()}:${new Date(1382086394000).getSeconds()}`,
      y: 0,
    },
    {
      x: `${new Date(1382086394000).getHours()}:${new Date(
        1382086394000,
      ).getMinutes()}:${new Date(1382086394000).getSeconds()}`,
      y: 2,
    },
    {
      x: `${new Date(1382086394000).getHours()}:${new Date(
        1382086394000,
      ).getMinutes()}:${new Date(1382086394000).getSeconds()}`,
      y: 0,
    },
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

  const dataSource2 = [
    {
      key: '1',
      day: 'Monday',
      studentsReported: '2',
      studentsRecognized: '1',
      missingStudents: 'Priyansh',
      alertTriggered: 'Yes',
      time: '1pm',
    },
    {
      key: '2',
      day: 'Wednesday',
      studentsReported: '2',
      studentsRecognized: '1',
      alertTriggered: 'Yes',
      missingStudents: 'Priyansh',
      time: '1pm',
    },
  ];
  const columns2 = [
    {
      title: 'Day',
      dataIndex: 'day',
      key: 'day',
    },
    {
      title: 'Student Reported',
      dataIndex: 'studentsReported',
      key: 'studentsReported',
    },
    {
      title: 'Student Recognized',
      dataIndex: 'studentsRecognized',
      key: 'studentsRecognized',
    },
    {
      title: 'Missing Students',
      dataIndex: 'missingStudents',
      key: 'missingStudents',
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
  useEffect(() => {
    getMerakiData();
  }, []);
  useEffect(() => {
    if (merakiDataFetch) {
      if (merakiLiveGraphData.length > 5) {
        merakiLiveGraphData.splice(0, 1);
      }

      merakiLiveGraphData.push({
        x: `${new Date(merakiDataFetch.ts).getHours()}:${new Date(
          merakiDataFetch.ts,
        ).getMinutes()}:${new Date(merakiDataFetch.ts).getSeconds()}`,
        y: merakiDataFetch.objects.length || 0,
      });
    }
  }, [merakiDataFetch]);
  useInterval(() => {
    console.log('calling mqtt data');
    getMerakiData();
  }, 2000);
  const getMerakiData = async () => {
    fetch('https://kamikazey.shubhank.codes/api/school/statistics/mqtt', {
      headers: { ...headers },
    })
      .then(res => res.json())
      .then(json => JSON.parse(json))
      .then(parseJson => {
        console.log(parseJson);
        setMerakiDataFetch(parseJson);
      })
      .catch(err => console.error(err));
  };
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
        {/* Alerts triggered analysis */}
        <Flex spaceBetween style={{ paddingBottom: '50px' }}>
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
              width={400}
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
          <div>
            <SubHeading
              style={{
                textAlign: 'center',
                marginTop: '50px',
                marginBottom: '20px',
                fontWeight: '600',
              }}
            >
              Live Analytics from Meraki Cam
            </SubHeading>
            <ScatterChart
              width={600}
              height={300}
              data={merakiLiveGraphData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid />
              <XAxis dataKey="x" name="Time" />
              <YAxis
                type="number"
                dataKey="y"
                name="Number of objects"
                unit=""
              />
              <Tooltip cursor={{ strokeDasharray: '5 5' }} />
              <Scatter
                name="Number of objects"
                data={merakiLiveGraphData}
                fill="#1DA57A"
              />
            </ScatterChart>
          </div>
        </Flex>
        <hr />
        <SubHeading
          style={{ marginTop: '50px', marginBottom: '20px', fontWeight: '600' }}
        >
          List of all food related alerts this week
        </SubHeading>
        <Table
          dataSource={dataSource}
          columns={columns}
          style={{ marginTop: '50px' }}
        ></Table>

        <SubHeading
          style={{ marginTop: '50px', marginBottom: '20px', fontWeight: '600' }}
        >
          List of all attendance related alerts this week
        </SubHeading>
        <Table
          dataSource={dataSource2}
          columns={columns2}
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
