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

module.exports.sessionTwoLocal = sessionTwoLocal;