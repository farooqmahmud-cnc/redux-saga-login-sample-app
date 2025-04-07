import { call, put, takeLatest } from 'redux-saga/effects';
import { login, loginSuccess, loginFailure } from './authSlice';
import { loginApi } from '../../services/authService';

function* handleLogin(action) {
  try {
    const { username, password } = action.payload;
    const response = yield call(loginApi, username, password);
    yield put(loginSuccess(response));
  } catch (error) {
    yield put(loginFailure('Invalid username or password'));
  }
}

export default function* authSaga() {
  yield takeLatest(login.type, handleLogin);
}
