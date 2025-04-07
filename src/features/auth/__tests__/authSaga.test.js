import { runSaga } from 'redux-saga';
import * as api from '../../../services/authService';
import { login, loginSuccess, loginFailure } from '../authSlice';
import { handleLogin } from '../authSaga';

describe('authSaga', () => {
  it('should dispatch loginSuccess on successful login', async () => {
    const dispatched = [];
    const fakeUser = { id: 1, name: 'Admin' };
    const fakeToken = 'test-token';

    jest.spyOn(api, 'loginApi').mockResolvedValue({ user: fakeUser, token: fakeToken });

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      handleLogin,
      login({ username: 'admin', password: 'secret' })
    ).toPromise();

    expect(dispatched).toContainEqual(loginSuccess({ user: fakeUser, token: fakeToken }));
  });

  it('should dispatch loginFailure on failed login', async () => {
    const dispatched = [];

    jest.spyOn(api, 'loginApi').mockRejectedValue(new Error('Unauthorized'));

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      handleLogin,
      login({ username: 'wrong', password: 'credentials' })
    ).toPromise();

    expect(dispatched).toContainEqual(loginFailure('Invalid username or password'));
  });
});
