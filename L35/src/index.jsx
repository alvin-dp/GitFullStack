import Post from './post.js'
import "./style.css";
import "./new_scss.scss";
import func1 from './example.ts';
import testImg from './assets/icon-square-big.png';
import Data from './assets/data.xml';
import Notes from './assets/data.csv';
import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './app.js';
import('lodash').then(({ default: _ }) => {
  // Припустимо, ми хочемо отримати унікальні числа з масиву
  const numbers = [1, 5, 5, 5, 8, 10, 1, 1, 1, 5, 15, 42, 5];
  const uniqNumbers = _.uniq(numbers);

  console.log('Lodash uniq:', uniqNumbers);
  // Додатково використовуємо функцію random для демонстрації
  console.log('Lodash random:', _.random(0, 100, true));
});

const post = new Post('Webpack Post Title')
console.log('image - ',testImg);
console.log('xml Data - ',Data);
console.log('json Data - ',Notes);

console.log('Post to string:', post.toString())

func1("Dany");

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <App />
);