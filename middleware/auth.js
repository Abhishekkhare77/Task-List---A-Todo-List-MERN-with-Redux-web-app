const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  if(!token){
    res.status(401).json({msg: 'No token. Could not authenicate user'});
  }
  else {
    try {
      const decoded_token = jwt.verify(token,'jwtSecret');
      req.user = decoded_token;
      next();
    } catch (error) {
      res.status(400).json({msg: "Invalid token."})
    }
  }

}

module.exports = auth;
