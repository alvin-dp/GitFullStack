import Post from './post'
import "./style.css"
import testImg from './assets/icon-square-big.png';
import Data from './assets/data.xml';
import Notes from './assets/data.csv';

const post = new Post('Webpack Post Title')
console.log('image - ',testImg);
console.log('xml Data - ',Data);
console.log('json Data - ',Notes);

console.log('Post to string:', post.toString())