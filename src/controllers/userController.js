const { users } = require("../data/db");

function getProfile(req, res) {
  const user = users.find((u) => u.id === req.user.id);

  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  // agregamos ocultar contraseña por seguridad, usando los ... que nos dejan extraer solo la password y dejar el resto sin modificar en un objetio nuevo sin modificar el original
  const { password, ...userResponse } = user;

  return res.status(200).json({ user: userResponse }); ///cambiamos
}

function updateMe(req, res) {
  const userId = req.user.id; //dejamos solo la validada con el toen jwt (no anda la tecla de la letra que se lee "ca").
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  const { name } = req.body;
  //agregamos 
  if (!name) {
    return res.status(400).json({ message: "Proporcione el campo a actualizar" });
  }
  user.name = name;

  //agregamos para ocultar la password
  const { password, ...userResponse } = user;

  return res.status(200).json({ message: "Perfil actualizado", user: userResponse }); //agregamos userResponse
}

module.exports = {
  getProfile,
  updateMe
};
