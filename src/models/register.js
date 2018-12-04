import { fakeRegister, checkEmail } from '../services/api';
import { message } from 'antd'

export default {
  namespace: 'register',

  state: {
    status: undefined,
    userId: '',
    isExist: false,
    error: '',
  },

    reducers: {
    registerHandle(state, { payload }) {
      return {
        ...state,
        ...payload,
        status: payload.status,
        userId: payload.userId,
        error: payload.error,
      };
    },

    checkEmail(state, { payload }) {
      return {
        ...state,
        isExist: payload,
      };
    },
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(fakeRegister, payload);
      console.log(response)
      if (response. isSuccess== true) {
        yield put({
          type: 'registerHandle',
          payload: {
            userId: response.data,
            status: true,
          },
        });
         message.success(`${response.message}，请登录！`);
      } else {
        yield put({
          type: 'registerHandle',
          payload: {
            status: false,
            error: response.message,
          },
        });
         message.error(response.message);
      }
    },

    *checkEmailExist({ payload }, { call, put }) {
      const response = yield call(checkEmail, payload);
      if (response.code === 0) {
        yield put({
          type: 'checkEmail',
          payload: response.data,
        });
      }
    },
  },

};
