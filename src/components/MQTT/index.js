import React from 'react';
import { Card } from 'antd';
import { subscribe } from 'mqtt-react';
function MQTT(props) {
  return (
    <div>
      {console.log('Heyyyyyyyyyyyyyyyyyyyyy', props)}
      <h1>Live Data</h1>
      <ul>
        {props.data.map(message => (
          <li>{message}</li>
        ))}
      </ul>
    </div>
  );
}

export default subscribe({
  topic: '/merakimv/Q2JV-BY67-ABC8/raw_detections',
})(MQTT);
