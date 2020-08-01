import { headers } from './headers';
const ENDPOINT = process.env.REACT_APP_BACKEND;
const SUB_ROUTE = 'school';

const registerSchool = (values, token) => {
  return fetch(`${ENDPOINT}/${SUB_ROUTE}/school/`, {
    method: 'POST',
    headers: { ...headers, Authorization: token },
    body: JSON.stringify(values),
  })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error(err));
};

const registerFood = (values, token) => {
  return fetch(`${ENDPOINT}/${SUB_ROUTE}/food_item/`, {
    method: 'POST',
    headers: { ...headers, Authorization: token },
    body: JSON.stringify(values),
  })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error(err));
};

const getFood = token => {
  return fetch(`${ENDPOINT}/${SUB_ROUTE}/food_item/`, {
    method: 'GET',
    headers: { ...headers, Authorization: token },
  })
    .then(res => res.json())
    .then(json => Promise.resolve(json))
    .catch(err => console.error(err));
};

const deleteFoodItem = (id, token) => {
  return fetch(`${ENDPOINT}/${SUB_ROUTE}/food_item/${id}/`, {
    method: 'DELETE',
    headers: { ...headers, Authorization: token },
  })
    .then(res => {
      if (res.status === 204) return Promise.resolve();
      else return Promise.reject();
    })
    .catch(err => console.error(err));
};

const getAllSchools = token => {
  return fetch(`${ENDPOINT}/${SUB_ROUTE}/school/`, {
    method: 'GET',
    headers: { ...headers, Authorization: token },
  })
    .then(res => res.json())
    .then(json => Promise.resolve(json))
    .catch(err => console.error(err));
};

export default {
  registerSchool,
  registerFood,
  getFood,
  deleteFoodItem,
  getAllSchools,
};
