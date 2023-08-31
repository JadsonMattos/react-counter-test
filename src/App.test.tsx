import { combineReducers, legacy_createStore as createStore } from 'redux';
import App, { RootState } from './App';
import counterReducer from './redux/reducer/counterReducer';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

function renderWithRedux(
  component: JSX.Element,
  state: RootState | {} = {},
  store = createStore(combineReducers({ counterReducer }), state)
) {
  const user = userEvent.setup();
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
    user,
  };
}

describe('Testa o clique dos botões', () => {
  test('Com o valor padrão do reducer, os botões devem incrementar os valores corretamente', async () => {
    const user = userEvent.setup();
    renderWithRedux(<App />);

    const incrementOne = screen.getByRole('button', { name: /incrementa 1/i });
    const incrementFive = screen.getByRole('button', { name: /incrementa 5/i });
    expect(screen.getByText('0')).ToBeInTheDocument();

    await user.click(incrementOne);
    expect(screen.getByText('1')).ToBeInTheDocument();
    await user.click(incrementFive);
    expect(screen.getByText('6')).ToBeInTheDocument();
  })

  test('Iniciando o estado global com um valor personalizado, os botões devem incrementar os valores corretamente', async () => {
    const state = {
      counterReducer: {
        count: 5,
      },
    };
    const user = userEvent.setup();
    renderWithRedux(<App />, state);

    const incrementOne = screen.getByRole('button', { name: /incrementa 1/i });
    const incrementFive = screen.getByRole('button', { name: /incrementa 5/i });
    expect(screen.getByText('5')).ToBeInTheDocument();

    await user.click(incrementOne);
    expect(screen.getByText('6')).ToBeInTheDocument();
    await user.click(incrementFive);
    expect(screen.getByText('11')).ToBeInTheDocument();
  }),
});
