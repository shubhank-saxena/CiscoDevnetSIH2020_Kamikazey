import React, { useState } from 'react';
import { Flex } from '../../styles/globalStyles';
import Sidebar from '../../components/Sidebar/PrincipalSidebar';
import Timetable from '../../components/Principal/Timetable';
import FoodImage from '../../components/Principal/FoodImage';
import DataStudentParent from '../../components/Principal/DataStudentParent';
import Student from '../../components/Principal/Student';

function School() {
  const [selectedKey, setSelectedKey] = useState(1);
  return (
    <Flex noCenter style={{ overflow: 'hidden' }}>
      <Sidebar selectedKey={selectedKey} setSelectedKey={setSelectedKey} />
      <div
        style={{
          height: '100vh',
          overflow: 'hidden',
          overflowY: 'scroll',
          width: '100%',
          marginLeft: '5vw',
        }}
      >
        {(function() {
          switch (selectedKey) {
            case 1:
              return <Timetable />;
              break;
            case 2:
              return <FoodImage />;
              break;
            case 3:
              return <DataStudentParent />;
              break;
            case 4:
              return <Student />;
              break;
            default:
              break;
          }
        })()}
      </div>
    </Flex>
  );
}

export default School;
