const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
//const helmet = require('helmet');
const session = require('express-session');
const passport = require('passport');
const mongoTools  = require('./mongoFunctions');
const passportModule  = require('./passportModule');
const jwtModule  = require('./jwtModule');
const myFunctions  = require('./myFunctions');
//const LocalStrategy = require('passport-local').Strategy;
const path = require('path');
const app = express();
app.use(express.urlencoded({ extended: false })); 
const router = express.Router();
const port = 3000; 
dotenv.config();
// helmet
// app.use(helmet());
// app.use(helmet.contentSecurityPolicy({
//   directives: {
//     defaultSrc: ["'self'"],
//     scriptSrc: ["'self'"], // "https://trustedscripts.example.com"
//     objectSrc: ["'none'"],
//     upgradeInsecureRequests: true,
//   }
//  }));
//end helmet

const secretKey = process.env.SECRETKEY;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('pug', require('pug').__express);


app.use(session({
   secret: secretKey, 
   resave: false, 
   saveUninitialized: true, 
   cookie: { secure: false } 
 }));
app.use(passport.authenticate('session'));
app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(myFunctions.myLogger);
app.use(cookieParser());
app.use(myFunctions.sessionPageCounter);
app.use('/login',jwtModule.myJwtBuilder); 
app.use('/articles',jwtModule.myJwtChecker); 

router.get('/', (req, res) => {
  res.render('index.pug', { nameTitle: 'Main page' });     
});

router.post('/signin/password', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/signin'
}));

router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

router.get('/signin', function(req, res, next) {
  res.render('signin.ejs',{name: 'Sign in with Passport'});
});
router.get('/login', (req, res) => {
  res.render('login.pug', { nameTitle: 'Login page' });   
});

router.get('/users', passportModule.isPassportAuthenticated, (req, res) => {   
   const ss_name = myFunctions.getNamePageViews(req);
    res.render('users.pug', { nameTitle: 'Users page protected with Passport'
                            , viewCount: myFunctions.getPageViewsValue(ss_name,req.session.page_views) });
});

router.get('/users/:userId', passportModule.isPassportAuthenticated, (req, res) => {  
  const ss_name = myFunctions.getNamePageViews(req);
  res.render('user.pug', { nameTitle: `User ID ${req.params.userId}`
                        , userID: req.params.userId
                        , userName: 'Will Doe'
                        , viewCount: myFunctions.getPageViewsValue(ss_name,req.session.page_views) });  
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

router.get('/listcol', async (req, res) => {
    const collections = await mongoTools.listCollections(process.env.DEF_DB_NAME,false);
    const fields = { title: 1 };
    const doc = await mongoTools.findDocuments(process.env.DEF_DB_NAME,process.env.DEF_COLLECTION_NAME,{year:1990},fields,false);
    res.render('listcol.pug', {listCol: collections, films:doc})
});

router.get('/db', (req, res) => { 
  const data = {nameTitle: 'DB operations'};
  res.render('db.pug', data);
});

router.get('/db-crud/:type', async (req, res) => {
    const db_operation = req.params.type;
    const tempCollection  = 'temp';
    let updateFields  = {};
    let docs = [];
    let query = {};
    let query_result;
    switch (db_operation) {
        case 'insertOne':
            const newCustomer = {
              name: 'John Dire',
              email: 'john.dire@example.com',
              phone: '1212121212'
            };
            query_result  = await mongoTools.insertDocs(process.env.DEF_DB_NAME,tempCollection,newCustomer);
            if (Array.isArray(query_result)) {
              docs  = query_result;
              query_result  = 1;
              }             
            res.render('dboutput.pug', {db_operation: db_operation, db_result:query_result, data:docs})
            break;
        case 'insertMany':
            const newCustomers = [
              {
                name: 'John Doe',
                email: 'john.doe@example.com',
                phone: '123456789'
              },
              {
                name: 'Jane Smith',
                email: 'jane.smith@example.com',
                phone: '987654321'
              },
              {
                name: 'Bob Johnson',
                email: 'bob.johnson@example.com',
                phone: '456789012'
              },
              {
                name: 'Boby Tohmson',
                email: 'boby.tohmson@example.com',
                phone: '202051005'
              }              
            ];
            query_result  = await mongoTools.insertDocs(process.env.DEF_DB_NAME,tempCollection,newCustomers);
            if (Array.isArray(query_result)) {
              docs  = query_result;
              query_result  = 1;
              }             
            res.render('dboutput.pug', {db_operation: db_operation, db_result:query_result, data:docs})
            break;
        case 'updateOne':
            query = { email: 'john.doe@example.com' };
            updateFields = { phone: '987654321' };          
            query_result  = await mongoTools.updateOneDoc(process.env.DEF_DB_NAME,tempCollection,query,updateFields);
            res.render('dboutput.pug', {db_operation: db_operation, db_result:query_result, data:docs})
            break;
        case 'updateMany':
            query = { email: {$regex: 'john'} };
            updateFields = { phone: '9898989898' };          
            query_result  = await mongoTools.updateDocs(process.env.DEF_DB_NAME,tempCollection,query,updateFields);
            res.render('dboutput.pug', {db_operation: db_operation, db_result:query_result, data:docs})
            break;
        case 'replaceOne':
            query = { phone: '987654321' };
            newObj = {
                name: 'Lily Swanson',
                email: 'lily.swanson@example.com',
                phone: '777777777'
              };          
            query_result  = await mongoTools.replaceOneDoc(process.env.DEF_DB_NAME,tempCollection,query,newObj);
            res.render('dboutput.pug', {db_operation: db_operation, db_result:query_result, data:docs})
            break;
        case 'deleteOne':
            query = { phone : { $eq: '202051005' } };
            query_result  = await mongoTools.deleteDoc(process.env.DEF_DB_NAME,tempCollection,query);
            res.render('dboutput.pug', {db_operation: db_operation, db_result:query_result, data:docs})
            break;
        case 'deleteMany':
            query = { phone : { $eq: '9898989898' } };
            query_result  = await mongoTools.deleteSomeDocs(process.env.DEF_DB_NAME,tempCollection,query);
            res.render('dboutput.pug', {db_operation: db_operation, db_result:query_result, data:docs})
            break;
        case 'findWithProjection':
            const fields = { name: 1, email :1,phone: 1};
            query = {};
            docs = await mongoTools.findDocuments(process.env.DEF_DB_NAME,tempCollection,query,fields,false);
            query_result  = 1;
            res.render('dboutput.pug', {db_operation: db_operation, db_result:query_result, data:docs.map(user => `${user.name}, email :${user.email}, phone :${user.phone}`)})
            break;          
        case 'cursorFindFilmsGt1980':
            const fieldsCursor = { title: 1, released :1,runtime: 1};
            query = {year:{$gt:1980}};
            const sortOrder = {released :-1};
            docs = await mongoTools.cursorFindCustom(process.env.DEF_DB_NAME,"movies",query,fieldsCursor,sortOrder,10,20,false);
            query_result  = 1;
            res.render('dboutput.pug', {db_operation: db_operation, db_result:query_result, data:docs.map(movies => `${movies.title}, released :${movies.released.toLocaleDateString('uk-UA')}, runtime :${movies.runtime}`)})
            break;   
         case 'agregateFilms':
            docs = await mongoTools.agregateFilmsByYearGenreAndCountgt1980(process.env.DEF_DB_NAME,"movies",true);
            query_result  = 1;
            res.render('dboutput.pug', {db_operation: db_operation, db_result:query_result, data:docs})
            break;                        

        default:
          res.redirect('/');
    }
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