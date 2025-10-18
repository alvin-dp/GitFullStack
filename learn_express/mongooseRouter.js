const dotenv = require('dotenv');
const express = require('express');
const mongooseFunc  = require('./mongooseFunctions');
const router = express.Router();
dotenv.config();
let User;
router.get('/', async (req, res) => { 
  const data = {nameTitle: 'DB operations with Mongoose'};
  if (User===undefined) {
    User = await mongooseFunc.CreateUserModel(process.env.DEF_DB_NAME);  
  }
  res.render('db_mongoose.pug', data);
});

router.get('/:type', async (req, res) => {
    const db_operation = req.params.type;
    let updateFields  = {};
    let docs = [];
    let query = {};
    let query_result;
    switch (db_operation) {
        case 'insertOne':
            const newCustomer = {
              name: 'John Dire',
              age: 25,
              gender: 'male',
              email: 'john.dire@example.com',
              phone: '1212121212'
            };
            query_result  = await mongooseFunc.insertDocs(User,newCustomer);
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
                age: 35,
                gender: 'male',                
                email: 'john.doe@example.com',
                phone: '123456789'
              },
              {
                name: 'Jane Smith',
                age: 33,
                gender: 'female',                
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
                gender: 'male',
                email: 'boby.tohmson@example.com',
                phone: '202051005'
              }              
            ];
            query_result  = await mongooseFunc.insertDocs(User,newCustomers);
            if (Array.isArray(query_result)) {
              docs  = query_result;
              query_result  = 1;
              }             
            res.render('dboutput.pug', {db_operation: db_operation, db_result:query_result, data:docs})
            break;
        case 'updateOne':
            query = { email: 'john.doe@example.com' };
            updateFields = { phone: '987654321' };          
            query_result  = await mongooseFunc.updateOneDoc(User,query,updateFields);
            res.render('dboutput.pug', {db_operation: db_operation, db_result:query_result, data:docs})
            break;
        case 'updateMany':
            query = { email: {$regex: 'john'} };
            updateFields = { phone: '9898989898' };          
            query_result  = await mongooseFunc.updateDocs(User,query,updateFields);
            res.render('dboutput.pug', {db_operation: db_operation, db_result:query_result, data:docs})
            break;
        case 'replaceOne':
            query = { phone: '987654321' };
            newObj = {
                name: 'Lily Swanson',
                age: 18,
                gender: 'female',                
                email: 'lily.swanson@example.com',
                phone: '777777777'
              };          
            query_result  = await mongooseFunc.replaceOneDoc(User,query,newObj);
            res.render('dboutput.pug', {db_operation: db_operation, db_result:query_result, data:docs})
            break;
        case 'deleteOne':
            query = { phone : { $eq: '202051005' } };
            query_result  = await mongooseFunc.deleteDoc(User,query);
            res.render('dboutput.pug', {db_operation: db_operation, db_result:query_result, data:docs})
            break;
        case 'deleteMany':
            query = { phone : { $eq: '9898989898' } };
            query_result  = await mongooseFunc.deleteSomeDocs(User,query);
            res.render('dboutput.pug', {db_operation: db_operation, db_result:query_result, data:docs})
            break;
        case 'findWithProjection':
            const fields = 'name age gender email phone';
            query = {};
            docs = await mongooseFunc.findDocuments(User,query,fields,false);            
            query_result  = docs.length;
            res.render('dboutput.pug', {db_operation: db_operation, db_result:query_result, data:docs.map(user => `${user.name}, 
              age: ${user.age}, 
              gender: ${user.gender},  
              email :${user.email}, 
              phone :${user.phone}`)})
            break;                                 
        default:
          res.redirect('/');
    }
});

module.exports = router;