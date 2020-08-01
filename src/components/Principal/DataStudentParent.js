import React from 'react';
import {
  Flex,
  Heading,
  HugeHeading,
  SubHeading,
  Paragraph,
} from '../../styles/globalStyles';
import { Table, Popover } from 'antd';
import data from '../../constants/lang';

const Data = [
  {
    id: 1,
    name: 'jaskeerat',
    age: 20,
    class: 6,
    roll: 20,
    gender: 'M',
    DOB: new Date(),
    image:
      'https://avatars0.githubusercontent.com/u/29003047?s=400&u=04ff776732caaeb46e34b480827e668b447486de&v=4',
  },
  {
    id: 2,
    name: 'Jay',
    age: 20,
    class: 6,
    roll: 20,
    gender: 'M',
    DOB: new Date(),
    image:
      'https://avatars0.githubusercontent.com/u/29003047?s=400&u=04ff776732caaeb46e34b480827e668b447486de&v=4',
  },
  {
    id: 3,
    name: 'Shubhank',
    age: 20,
    class: 6,
    roll: 20,
    gender: 'G',
    DOB: new Date(),
    image:
      'https://avatars0.githubusercontent.com/u/29003047?s=400&u=04ff776732caaeb46e34b480827e668b447486de&v=4',
  },
];

function DataStudentParent({ lang }) {
  const columns = [
    {
      title: 'Roll Number',
      dataIndex: ['roll'],
      key: 'roll',
      width: 150,
    },
    {
      title: 'Name',
      dataIndex: ['name'],
      key: 'name',
      render: (_, rec) => (
        <Popover
          title="Student's Picture"
          trigger="hover"
          content={<img src={rec.image} style={{ width: 150 }}></img>}
        >
          {rec.name}
        </Popover>
      ),
    },
    {
      title: 'Age',
      dataIndex: ['age'],
      key: 'age',
    },
    {
      title: 'Class',
      dataIndex: ['class'],
      key: 'class',
    },
    {
      title: 'Gender',
      dataIndex: ['gender'],
      key: 'gender',
    },
  ];

  return (
    <div style={{ width: '80%', marginTop: '5vh' }}>
      <HugeHeading style={{ width: '100%' }}>
        {/* {data[lang]['DASHBOARD']['HEADER']} */}
        List of Students
      </HugeHeading>
      <Table dataSource={Data} columns={columns} />
    </div>
  );
}

export default DataStudentParent;
