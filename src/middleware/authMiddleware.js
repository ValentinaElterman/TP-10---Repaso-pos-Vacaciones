const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/token"); //agregamos

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"] || req.headers["x-access-token"];
  //agregamos verificaciones y mensajes, separando al auth y adnim en dos funciones diferentes para que cada funcion tenga una responsabilidad
  if (!authHeader) {
    return res.status(401).json({ message: "Acceso denegado: Token no proporcionado" });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token invalido o expirado" });
  }
}

function adminMiddleware(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Acceso denegado: Requiere permisos de administrador" });
  }
  next();
}

module.exports = authMiddleware;
module.exports.adminMiddleware = adminMiddleware; //agregamos