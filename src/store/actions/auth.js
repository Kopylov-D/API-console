import sendsey from '../../sendsay/sendsay';
import sendsay from '../../sendsay/sendsay';
import {
  AUTH_SUCCESS,
  AUTH_START,
  AUTH_ERROR,
  AUTH_LOGOUT,
  // AUTH_RESTORE_SESSION,
} from './actionTypes';

// async function getAuthData() {
//   let authData = {};
//   sendsay
//     .request({
//       action: 'sys.settings.get',
//       list: ['about.id', 'about.owner.email', 'about.user'],
//     })
//     .then(function (res) {
//       authData = {
//         session: sendsay.session,
//         email: res.list['about.owner.email'][0],
//         sublogin: res.list['about.id'],
//       };
//           document.cookie = `sendsay_session=${authData.session}`;
//     });
//   return authData;
// }

export function auth(login, sublogin, password) {
  return async dispatch => {
    dispatch(authStart());
    sendsay
      .login({
        login,
        sublogin,
        password,
      })
      .then(() => {
        sendsay
          .request({
            action: 'sys.settings.get',
            list: ['about.id', 'about.owner.email', 'about.user'],
          })
          .then(res => {
            const authData = {
              session: sendsay.session,
              email: res.list['about.owner.email'][0],
              // sublogin: res.list['about.id'],
              sublogin,
            };
            document.cookie = `sendsay_session=${authData.session}; max-age=3600`;
            document.cookie = `sendsay_email=${authData.email}; max-age=3600`;
            document.cookie = `sendsay_sublogin=${authData.sublogin}; max-age=3600`;
            dispatch(authSuccess(authData));
          });

        // sendsay
        //   .request({
        //     action: 'pong',
        //   })
        //   .then(res => {
        //     console.log(res);
        //     console.log(sendsay.getUsername());
        //     // console.log(res.list['about.id']);
        //   });
      })
      .catch(error => {
        const responseError = {id: error.id, explain: error.explain};
        dispatch(authError(responseError));
      });
  };
}

export function authStart() {
  return {
    type: AUTH_START,
  };
}

export function authSuccess(authData) {
  return {
    type: AUTH_SUCCESS,
    authData,
  };
}
// export function authRestoreSession(session) {
//   return {
//     type: AUTH_RESTORE_SESSION,
//     session,
//   };
// }

export function authError(responseError) {
  return {
    type: AUTH_ERROR,
    responseError,
  };
}

export function autoLogin() {
  return async dispatch => {
    sendsay.setSessionFromCookie();
    const session = sendsey.session;
    const email = (document.cookie.match(`(^|; )sendsay_email=([^;]*)`) || 0)[2];
    const sublogin = (document.cookie.match(`(^|; )sendsay_sublogin=([^;]*)`) || 0)[2];

    if (session) {
      const authData = {
        session,
        email,
        sublogin,
      };
      dispatch(authSuccess(authData));
    } else {
      dispatch(logout());
    }
  };
}

export function logout() {
  document.cookie = `sendsay_session=; max-age=-1`;
  return {
    type: AUTH_LOGOUT,
  };
}
