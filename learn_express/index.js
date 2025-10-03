const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const path = require('path');
const app = express();
const router = express.Router();
const port = 3000; 
dotenv.config();

const secretKey = process.env.SECRETKEY;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('pug', require('pug').__express);

const myLogger = (req, res, next) => {
  console.log('Logged url ', req.url ,  new Date().toISOString());
  next();
};

app.use(session({
   secret: secretKey, 
   resave: false, 
   saveUninitialized: true, 
   cookie: { secure: false } 
 }));


const myJwtBuilder = (req, res, next) => {
  try {
  const payload = {
    userId: 123,
    username: 'John_Doe'
  };
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });  
  res.cookie('jwtTkn', token, { maxAge: 900000, httpOnly: true });  
  console.log('jwtTkn created');
  next();
}
catch (error){
  next(error);
}
};


const myJwtChecker = (req, res, next) => {
  try {
  const token = req.cookies.jwtTkn;
  jwt.verify(token,secretKey);
  const decodedPayload = jwt.decode(token);
  console.log(`Usr name - ${decodedPayload.username}  loged in.`);  
  next();
}
catch (error){
  next(error);
}
};

function getNamePageViews(req) {
  if (toString(req.url).charAt(1)==='.'){
    return undefined;
  }
  let ss_name= req.url + '_views';
  if (req.url==='/') {
    ss_name = ss_name.replaceAll('/','root')
    }
  else{
    ss_name = ss_name.substring(1);
  }
  return ss_name;
}

function getPageViewsValue(name,ssData){
    const convertArray = Object.entries(ssData);
    const page_views = new Map(convertArray); 
    return page_views.get(name); 
}
// midlleware for PageCounters in session
const sessionPageCounter = (req,res, next) => { 
  const ss_name = getNamePageViews(req);
  if (ss_name===undefined) {
    next();
  }
  //console.log('Session info - name ',ss_name);  
  if (req.session.page_views) {
    //console.log('Session info - ',req.session);
    const convertArray = Object.entries(req.session.page_views);
    const page_views = new Map(convertArray);    
    if (page_views.has(ss_name)) {
      let count= page_views.get(ss_name); 
      page_views.delete(ss_name);
      page_views.set(ss_name,++count); 
      req.session.page_views  = Object.fromEntries(page_views);
    }
    else {
        page_views.set(ss_name,1);
        req.session.page_views  = Object.fromEntries(page_views);        
    } 
  } else {
    //console.log('Session info - page_views map created');
    const page_views = new Map(); 
    page_views.set(ss_name,1);
    req.session.page_views  = Object.fromEntries(page_views);
   // console.log('Session info - page_views'. req.session.page_views);    
  }  
  next();
}

// Middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(myLogger);
app.use(cookieParser());
app.use(sessionPageCounter);

router.get('/', (req, res) => {
  //res.send(`Learn Express is YES!`);
  res.render('index.pug', { nameTitle: 'Login page' });     
});

router.get('/login', (req, res) => {
  res.render('login.pug', { nameTitle: 'Login page' });   
});

app.use('/login',myJwtBuilder); 
app.use('/articles',myJwtChecker); 

router.get('/users', (req, res) => {   
   const ss_name = getNamePageViews(req);
    res.render('users.pug', { nameTitle: 'Users page'
                            , viewCount: getPageViewsValue(ss_name,req.session.page_views) });
});

router.get('/users/:userId', (req, res) => {  
  const ss_name = getNamePageViews(req);
  res.render('user.pug', { nameTitle: `User ID ${req.params.userId}`
                        , userID: req.params.userId
                        , userName: 'Will Doe'
                        , viewCount: getPageViewsValue(ss_name,req.session.page_views) });  
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

router.get('/async-err', async (req, res, next) => {
  try {
    await Promise.reject(new Error("Can't get the async data"));
  } catch (err) {
    next(err);
  }
});

router.get('/set-theme', (req, res) => {
  res.cookie('favtheme', 'dark', { maxAge: 900000, httpOnly: true });
  res.send('Cookie favtheme встановлено');
});

router.get('/get-theme', (req, res) => {
  const cookieValue = req.cookies.favtheme;
  res.send(`Значення cookie: ${cookieValue}`);
});

app.use('/', router);

// Error Middleware
app.use(function(err, req, res, next) {
  res.status(err.status || 500).send({message:err.message||"Internal server error"});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled rejection at:', promise, 'reason:', reason);
});