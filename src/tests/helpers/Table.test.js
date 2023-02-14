import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
import App from '../../App';

describe(('Testing table component'), () => {
  test('The page renders the Table correctly', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const description = screen.getByRole('columnheader', {
      name: /descrição/i,
    });
    const value = screen.getByRole('columnheader', {
      name: /valor convertido/i,
    });
    expect(description).toBeInTheDocument();
    expect(value).toBeInTheDocument();
  });
  test('Renders a component in the screen', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const value = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');
    const button = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    userEvent.type(value, '10');
    userEvent.type(description, 'comida');
    userEvent.click(button);
    const totalValue = screen.getByTestId('total-field');
    await waitFor(() => expect(totalValue.innerHTML).toBe('51.60'));
  });
});
