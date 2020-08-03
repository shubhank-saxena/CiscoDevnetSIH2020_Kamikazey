import React, { useState } from 'react';
import { Flex } from '../../styles/globalStyles';
import Sidebar from '../../components/Sidebar';
import Overview from '../../components/Dashboard/Overview';
import Students from '../../components/Dashboard/Students';
import Cameras from '../../components/Dashboard/Cameras';
import Admin from '../../components/Dashboard/Admin';
import Report from '../../components/Dashboard/Report';
import History from '../../components/Dashboard/History';

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
              return <Overview />;
              break;
            case 2:
              return <Cameras />;
              break;
            case 3:
              return <Students />;
              break;
            case 4:
              return <Admin />;
              break;
            case 5:
              return <History />;
              break;
            case 6:
              return <Report />;
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
