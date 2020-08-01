/** @format */

import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_USER, RESET_STATE } from '../types';
import store from '../store';

// console.log(store.getState());
// const reduxState = store.getState();
//Login User
// export const loginUser = values => async dispatch => {
//   try {
//     dispatch({
//       type: SET_LOADING,
//     });
//     //* Connect to backend here for login.
//     var opts = {
//       email: values.email,
//       password: values.password,
//     };
//     var resp = await fetch(`${process.env.API_URL}/user/login`, {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(opts),
//       mode: 'cors',
//     });
//     var token = await resp.json();
//     var found = false;
//     console.log(resp, token);
//     if (resp.status === 200) {
//       found = true;
//       dispatch({
//         type: LOGIN_SUCCESS,
//         payload: token,
//       });
//     }
//     if (found === false) {
//       throw new Error('Sorry user not found');
//     }
//   } catch (err) {
//     console.log(err);
//     alert(err.message);
//     dispatch({
//       type: LOGIN_FAIL,
//       payload: err.response,
//     });
//   }
// };

// //Logout User
// export const logoutUser = token => {
//   return function(dispatch) {
//     //* Connect to backend here for logout.
//     var opts = {
//       token: token,
//     };
//     console.log('Logout', token);
//     fetch(`${process.env.API_URL}/user/logout`, {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(opts),
//       mode: 'cors',
//     })
//       .then(res => {
//         if (res.status === 200) {
//           return res.json();
//         } else {
//           throw new Error('Cant Logout');
//         }
//       })
//       .then(json => {
//         dispatch({
//           type: LOGOUT_USER,
//         });
//       })
//       .catch(err => alert(err));
//   };
// };

export const login = (token, userType) => {
  return {
    type: LOGIN_SUCCESS,
    payload: { token, userType },
  };
};

//Login Fail
export const loginFail = error => {
  return {
    type: LOGIN_FAIL,
    payload: error,
  };
};

//Reset State
export const resetState = () => {
  return {
    type: RESET_STATE,
  };
};
