import { routerRedux } from 'dva/router';
import { fakeAccountLogin, qqLogin } from '../services/api';
import { message } from 'antd'

export default {
  namespace: 'login',

  state: {
    status: undefined,
    userName: '',
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        status: payload.status,
        userName: payload.userName,
      };
    },
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      console.log(response)
      if (response.isSuccess === true) {
        // yield put({
        //   type: 'changeLoginStatus',
        //   payload: {
        //     status: true,
        //     userName: response.data.user_name,
        //   },
        // });
        // sessionStorage.setItem('userId', response.data.user_id);
        // sessionStorage.setItem('userName', response.data.user_name);
        message.success(response.message)
        yield put(routerRedux.push('/problem'));
      } else {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
          },
        });
      }
    },

    *QQLogin(_, { call }){
      const response = yield call(qqLogin);
      if (response.code === 0) {
        window.location.href = response.data;
      }
    },

    *logout(_, { put }) {
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('userName');
      yield put(routerRedux.push('/user/login'));
    },
  },

};
