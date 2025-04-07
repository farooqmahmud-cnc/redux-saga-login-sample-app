import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import LoginForm from '../LoginForm';
import { login } from '../authSlice';

const mockStore = configureStore([]);

describe('LoginForm', () => {
  it('dispatches login action on form submit', () => {
    const store = mockStore({ auth: { loading: false, error: null } });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: 'admin' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'secret' },
    });
    fireEvent.click(screen.getByText(/Login/i));

    expect(store.dispatch).toHaveBeenCalledWith(
      login({ username: 'admin', password: 'secret' })
    );
  });
});
