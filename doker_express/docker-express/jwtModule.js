const jwt = require('jsonwebtoken');

const myJwtBuilder = (req, res, next) => {
  try {
  const payload = {
    userId: 123,
    username: 'John_Doe'
  };
  const token = jwt.sign(payload, process.env.SECRETKEY, { expiresIn: '1h' });  
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
  jwt.verify(token,process.env.SECRETKEY);
  const decodedPayload = jwt.decode(token);
  console.log(`Usr name - ${decodedPayload.username}  loged in.`);  
  next();
}
catch (error){
  next(error);
}
};

module.exports = {myJwtBuilder,myJwtChecker}