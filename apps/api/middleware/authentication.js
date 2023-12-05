import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token non fourni" });
  }

  jwt.verify(token, process.env.SECRET_KEY_JWT, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        const refreshToken = jwt.sign(req.user, process.env.SECRET_KEY_JWT, {
          expiresIn: "1h",
        });

        if (!refreshToken) {
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
      next();
    }
  });
}

export function isAdmin(req, res, next) {
  const user = req.user;
  console.log(user);
  if (user.roles === "ADMIN") {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "You aren't access to this ressource" });
  }
}
