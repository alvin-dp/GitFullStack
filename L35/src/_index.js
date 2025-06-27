import Post from './post.js'
import "./style.css"
import "./new_scss.scss"
import func1 from './example.ts';
import testImg from './assets/icon-square-big.png';
import Data from './assets/data.xml';
import Notes from './assets/data.csv';

const post = new Post('Webpack Post Title')
console.log('image - ',testImg);
console.log('xml Data - ',Data);
console.log('json Data - ',Notes);

console.log('Post to string:', post.toString())

func1("Dany");