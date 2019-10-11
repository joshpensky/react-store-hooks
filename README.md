# react-store-hooks

## Example Setup

```jsx
// src/index.js

import React from 'react';
import { render } from 'react-dom';
import { createStore, Provider } from 'react-store-hooks';
import modules from './modules';
import Main from './Main';

const App = () => {
  const store = createStore(modules);
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

render(<App />, document.querySelector('#root'));
```

```js
// src/modules.js

const counterModule = {
  name: 'counter',
  initialState: {
    value: 0,
  },
  actions: {
    add(state, action) {
      return {
        ...state,
        value: state.value + action.payload,
      };
    },
  },
};

export default [counterModule];
```

```jsx
// src/Main.js

import React from 'react';
import { useStore } from 'react-store-hooks';

const Main = () => {
  const [store, dispatch] = useStore('counter');

  const [value, setValue] = useState(0);

  const updateValue = evt => {
    setValue(evt.target.value);
  };

  const addValue = () => {
    dispatch({
      type: 'add',
      payload: value,
    });
    setValue(0);
  };

  return (
    <div>
      <p>Current value: {store.counter.value}</p>

      <input type="number" min={0} value={value} onChange={updateValue} />
      <button type="button" onClick={addValue}>
        Add
      </button>
    </div>
  );
};

export default Main;
```
