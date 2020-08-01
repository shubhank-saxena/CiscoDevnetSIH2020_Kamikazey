import { headers } from './headers';
const ENDPOINT = process.env.REACT_APP_BACKEND;
const SUB_ROUTE = 'rest-auth';

export const login = formData => {
  return fetch(`${ENDPOINT}/${SUB_ROUTE}/login/`, {
    method: 'POST',
    headers,
    body: JSON.stringify(formData),
  })
    .then(res => res.json())
    .then(json => Promise.resolve(json));
};

export default {
  login,
};
