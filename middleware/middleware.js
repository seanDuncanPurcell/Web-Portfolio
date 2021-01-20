const db_url = (process.env.DB_URL || 'mongodb://localhost:27017');
const db_name = 'blogsystem';
const mongoose = require('mongoose');
const { RateLimiterMongo } = require('rate-limiter-flexible');
const mongoOpts = {
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 100, // Reconnect every 100ms
};
const mongoConn = mongoose.createConnection(`${db_url}/${db_name}`, mongoOpts);


//add session values to res.locals for view rendering
function sessionTwoLocal(req, res, next) {
  const {username, loggedin, admin} = req.session;
  if(!username){
    res.locals.username = 'Guest';
    res.locals.loggedin = false;
    res.locals.admin = false;
  }else{
    res.locals.username = username;
    res.locals.loggedin = loggedin;
    res.locals.admin = admin;
  }
  next();
}

//set basic limits to the number of reques that can be made by an IP
const rateLimiterMongo = new RateLimiterMongo({
  storeClient: mongoConn,
  points: 20, // Number of points
  duration: 4, // Per second(s)
});
const rateLimiterMiddleware = (req, res, next) => {
  rateLimiterMongo.consume(req.ip)
  .then(() => {
      next();
  })
  .catch(_ => {
      res.status(429)
      res.send('Too Many Requests');
  });
};

module.exports = {sessionTwoLocal, rateLimiterMiddleware};