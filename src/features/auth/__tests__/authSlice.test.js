import authReducer, { login, loginSuccess, loginFailure } from '../authSlice';

describe('auth reducer', () => {
  const initialState = {
    loading: false,
    user: null,
    token: null,
    error: null,
  };

  it('should handle login', () => {
    const nextState = authReducer(initialState, login());
    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('should handle loginSuccess', () => {
    const user = { id: 1, name: 'Admin' };
    const token = 'fake-token';
    const nextState = authReducer(initialState, loginSuccess({ user, token }));
    expect(nextState.loading).toBe(false);
    expect(nextState.user).toEqual(user);
    expect(nextState.token).toBe(token);
  });

  it('should handle loginFailure', () => {
    const error = 'Invalid credentials';
    const nextState = authReducer(initialState, loginFailure(error));
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe(error);
  });
});
