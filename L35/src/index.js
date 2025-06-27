import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './app';
import('lodash').then(({ default: _ }) => {
  // Припустимо, ми хочемо отримати унікальні числа з масиву
  const numbers = [1, 5, 5, 5, 8, 10, 1, 1, 1, 5, 15, 42, 5];
  const uniqNumbers = _.uniq(numbers);

  console.log('Lodash uniq:', uniqNumbers);
  // Додатково використовуємо функцію random для демонстрації
  console.log('Lodash random:', _.random(0, 100, true));
});
//ReactDOM.render(<App />, document.getElementById('root'));
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <App />
);