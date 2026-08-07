const { users } = require("../data/db");

function listUsers(req, res) {
  // agregamos funcion para ocultar password, , usando los ... que nos dejan extraer solo la password y dejar el resto sin modificar en un objetio nuevo sin modificar el original
  const cleanUsers = users.map(({ password, ...userWithoutPassword }) => userWithoutPassword);

  return res.status(200).json({
    total: cleanUsers.length,
    users: cleanUsers
  });
}

module.exports = {
  listUsers
};
