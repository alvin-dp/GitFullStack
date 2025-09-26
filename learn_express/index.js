const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const router = express.Router();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('pug', require('pug').__express);

const myLogger = (req, res, next) => {
  console.log('Logged url ', req.url ,  new Date().toISOString());
  next();
};

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(myLogger);

router.get('/', (req, res) => {
  res.send(`Learn Express is YES!`);
});

router.get('/users', (req, res) => {
    res.render('users.pug', { nameTitle: 'Users page' });
});

router.get('/users/:userId', (req, res) => {
   res.render('user.pug', { nameTitle: `User ID ${req.params.userId}`, userID: req.params.userId, userName: 'Will Doe'});  
});

const articles= [];
let i=0;
while (i<6){
  articles.push({id:i,
    name:'Article name '+i,
    content: 'some content'+i});
    i++;
}

router.get('/articles', (req, res) => {
  const data = { title: 'Contents', message: 'Hello, Visitor!', articles:articles };
  res.render('articles.ejs', data);  
});

router.get('/articles/:articleId', (req, res) => {
  const article = articles[req.params.articleId];
  res.render('article.ejs', article);    
});

app.use('/', router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})