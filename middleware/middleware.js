const {MongoClient} = require('mongodb');
const db_url = `mongodb+srv://${process.env.DB_LOGIN}@cluster0.c3kth.mongodb.net/admin?retryWrites=true&w=majority`;
const mongoOps = { useNewUrlParser: true, useUnifiedTopology: true };
const mongoConn = MongoClient.connect(db_url, mongoOps);
const { RateLimiterMongo } = require('rate-limiter-flexible');

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