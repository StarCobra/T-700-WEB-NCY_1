import jwt from "jsonwebtoken";
import { createDatabase } from "../database/create.js";
import { getRefreshToken } from "../utils/getRefreshToken.js";

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

  jwt.verify(token, process.env.SECRET_KEY_JWT, async (err, user) => {

    if (err) {

      if (err.name === "TokenExpiredError") {

        const data = await getRefreshToken(token)
  
        if (!req.originalUrl.startsWith('/articles')) {
          return res.status(401).json({ message: "RefreshToken expiré" });
        }

        res.setHeader("Authorization", `Bearer ${data.refreshToken}`);

        req.user = data.user;
        req.params = queryParams;

        req.token = data.refreshToken

        next();
   
       
      } else {

        return res.status(403).json({
          token: token,
          error: err,
          message: "Token non valide",
        });

      }

    } else {

      req.user = user;

      if(req.originalUrl.startsWith('/articles')) {
        req.params = queryParams;
      }

      req.token = token
      
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
