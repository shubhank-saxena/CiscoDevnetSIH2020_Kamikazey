import { snapshotHeaders } from './headers';
const ENDPOINT = 'https://api.meraki.com/api';

const getSnapshot = (networkId, deviceId) => {
  const SUB_ROUTE = `v0/networks/${networkId}/cameras/${deviceId}`;
  return fetch(`${ENDPOINT}/${SUB_ROUTE}/snapshot`, {
    method: 'POST',
    headers: { ...snapshotHeaders },
  })
    .then(res => res.json())
    .then(json => Promise.resolve(json))
    .catch(err => console.error(err));
};

export default {
  getSnapshot,
};
