import { useState } from 'react';

const App = () => {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState('');

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      <p className="read-the-docs" data-testid="input-res">
        Input text: {value}
      </p>
      <input
        data-testid="inputTest"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </>
  );
};

export default App;
