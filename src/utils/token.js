const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "secret_key_default"; //cambiado afuera de la funcion

function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },  //agregamos mas ademas de user.role
    JWT_SECRET,
    { expiresIn: "24h" }  //cambiado de 2s a 24h
  );
}

module.exports = {
  signToken,
  JWT_SECRET  //agregamos
};