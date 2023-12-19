import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
  const queryParams = req.query.params;

  if (!token && !req.originalUrl.startsWith('/articles')) {
    return res.status(401).json({ message: "Token non fourni" });
  }

  if(!token && req.originalUrl.startsWith('/articles')) {
    req.user = null;
    req.params = null;
    return next();
  }

  jwt.verify(token, process.env.SECRET_KEY_JWT, (err, user) => {

    if (err) {
      if (err.name === "TokenExpiredError") {
        const refreshToken = jwt.sign(req.user, process.env.SECRET_KEY_JWT, {
          expiresIn: "1h",
        });

        if (!refreshToken && !req.originalUrl.startsWith('/articles')) {
          return res.status(401).json({ message: "RefreshToken expiré" });
        }

        jwt.verify(
          refreshToken,
          process.env.SECRET_KEY_JWT,
          (refreshErr, refreshedUser) => {
            if (refreshErr) {
              return res
                .status(403)
                .json({ message: "RefreshToken non valide" });
            }

            const newToken = jwt.sign(
              refreshedUser,
              process.env.SECRET_KEY_JWT,
              { expiresIn: "1h" }
            );

            res.setHeader("Authorization", `Bearer ${newToken}`);

            req.user = refreshedUser;
            req.params = queryParams;
            
            
            next();
          }
        );
      } else {
        return res.status(403).json({
          token: token,
          error: err,
          message: "Token non valide",
        });
      }
    } else {
        req.user = user;
        req.params = queryParams;
        next();
     
    }
  });
}

export function isAdmin(req, res, next) {
  const user = req.user;
  if (user.roles === "ADMIN") {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "You aren't access to this ressource" });
  }
}
