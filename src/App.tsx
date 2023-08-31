import { useDispatch, useSelector } from 'react-redux';
import { actionCreator } from './redux/actions';
import './App.css';

export type RootState = {
  counterReducer: {
    count: number;
  };
};

function App() {
  const rootState = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  return (
    <main>
      <div className="counter-container">
        <h1>Contador</h1>
        <h2>{rootState.counterReducer.count}</h2>
      </div>
      <div className="button-container">
        <button onClick={() => dispatch(actionCreator())}>Incrementa 1</button>
        <button onClick={() => dispatch(actionCreator(5))}>Incrementa 5</button>
      </div>
    </main>
  );
}

export default App;
