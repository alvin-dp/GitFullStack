// loger url middleware
const myLogger = (req, res, next) => {
  console.log('Logged url ', req.url ,  new Date().toISOString());
  next();
};

// middleware for PageCounters in session
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

const sessionPageCounter = (req,res, next) => { 
  const ss_name = getNamePageViews(req);
  if (ss_name===undefined) {
    next();
  }
 
  if (req.session.page_views) {
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
    const page_views = new Map(); 
    page_views.set(ss_name,1);
    req.session.page_views  = Object.fromEntries(page_views);
  }  
  next();
}

module.exports = {myLogger,getNamePageViews,getPageViewsValue,sessionPageCounter}