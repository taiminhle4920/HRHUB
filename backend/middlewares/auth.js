// module.exports.isUserAuthenticated = (req, res, next) => {
//     if (req.user) {
//       next();
//     } else {
//       console.log("unauthorized access to api")
//       res.status(401).send("You must login first!");
//     }
//   };

module.exports.isUserAuthenticated = (req, res, next) => {    
  // console.log(`Session user Checker: ${req.user}`);
  // console.log(req.session);
  if (req.user) {
      // console.log(`Found User Session`);
      next();
  } else {
      // console.log(`No User Session Found`);
      res.status(401).send("You must login first!");
  }
};