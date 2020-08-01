import React, { useState } from 'react';
import CRUDSchool from '../../components/CRUDSchool';
import CRUDFood from '../../components/CRUDFood';
import SidebarAlt from '../../components/Sidebar-alt';
import { Flex } from '../../styles/globalStyles';

function CisAdmin() {
  const [selectedKey, setSelectedKey] = useState(1);

  return (
    <Flex noCenter>
      <SidebarAlt selectedKey={selectedKey} setSelectedKey={setSelectedKey} />
      {(function() {
        switch (selectedKey) {
          case 1:
            return <CRUDSchool />;
            break;
          case 2:
            return <CRUDFood />;
            break;
        }
      })()}
    </Flex>
  );
}

export default CisAdmin;
