import { snapshotHeaders } from './headers';
const ENDPOINT = process.env.REACT_APP_BACKEND;
const SUB_ROUTE = 'food';
const getSnapshot = (networkId, deviceId) => {
  return fetch(`${ENDPOINT}/${SUB_ROUTE}/snapshot/`, {})
    .then(res => res.json())
    .then(json => Promise.resolve(json))
    .catch(err => console.error(err));
};

export default {
  getSnapshot,
};
