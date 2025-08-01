const jwt = require("jsonwebtoken");

module.exports.Auth = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token);
  try {
    const decodetoken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodetoken.userId;
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
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodetoken) => {
      if (err) {
        console.log("erreur", err);

        res.status(403).json({
          message: err.message,
          soource: "Token Non Valable",
        });
      } else {
        // console.log(decodetoken.userId);
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
