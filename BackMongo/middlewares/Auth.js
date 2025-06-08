const jwt = require("jsonwebtoken");

module.exports.Auth = (req, res, next) => {
  console.log(req.cookies);

  try {
    const token = req.cookies.jwt;
    const decodetoken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodetoken.userId;
    console.log("connecté " + userId);
    req.auth = { userId: userId };
    res.status(200);
    next();
  } catch (err) {
    return res.status(501).json({
      message: err.message,
      soource: "Pas De Token",
    });
  }
};
module.exports.RequireAuth = async (req, res, next) => {
  const token = req.cookies.jwt;
  console.log("token : " + token);

  // console.log(token);
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodetoken) => {
      if (err) {
        console.log("erreur", err);
        console.log(decodetoken.userId);

        res.status(403).json({
          message: err.message,
          soource: "Token Non Valable",
        });
      } else {
        console.log(decodetoken.userId);
        res.locals.userId = decodetoken.userId;
        //req.auth = decodetoken.userId;
        next();
      }
    });
  } else {
    // console.log("Pas De Token !");
    // return res.status(401).json({ message: "Pas de token fourni" }); // ✅
  }
};
