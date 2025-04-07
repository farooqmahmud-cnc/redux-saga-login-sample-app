export const loginApi = async (username, password) => {
  if (username === 'admin' && password === 'secret') {
    return {
      user: { id: 1, name: 'Admin' },
      token: 'fake-jwt-token'
    };
  } else {
    throw new Error('Unauthorized');
  }
};
