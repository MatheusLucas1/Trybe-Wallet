import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
import App from '../../App';

describe(('Login page tests'), () => {
  test('tests email, password and enter button fields.', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByRole('textbox', {
      name: /email:/i,
    });
    const password = screen.getByLabelText(/password:/i);
    const login = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(login).toBeInTheDocument();
  });

  test('Check login button', () => {
    renderWithRouterAndRedux(<App />);
    const login = screen.getByRole('button', {
      name: /entrar/i,
    });
    const email = screen.getByLabelText(/email/i);
    const password = screen.getByLabelText(/password:/i);

    userEvent.type(email, 'test@test.com');
    userEvent.type(password, '123456');
    expect(login).not.toBeDisabled();
  });
});
