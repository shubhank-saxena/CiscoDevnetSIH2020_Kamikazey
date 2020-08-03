import { headers } from './headers';
const ENDPOINT = process.env.REACT_APP_BACKEND;
const SUB_ROUTE = 'food';

export const foodPrediction = (data, token) => {
  return fetch(`${ENDPOINT}/${SUB_ROUTE}/predict/`, {
    method: 'POST',
    headers: { ...headers, Authorization: token },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(json => Promise.resolve(json));
};

export default {
  foodPrediction,
};
