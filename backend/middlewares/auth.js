module.exports.isUserAuthenticated = (req, res, next) => {    
  // console.log(`Session user Checker: ${req.user}`);
  // console.log(req.session);
  if (req.user || req.session.user) {
      // console.log(`Found User Session`);
      next();
  } else {
      console.log(`No User Session Found`);
      res.status(401).send("You must login first!");
  }
};