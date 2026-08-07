# Registro de Errores

Completar una fila por cada error detectado.

| N | Archivo | Problema encontrado | Como lo detectaron | Solucion aplicada |
|---|---------|---------------------|--------------------|-------------------|
| 1 | src/app.js | la ruta estaba como /api/loginn | los endpoints de auth quedaban inaccesibles con la ruta "normal" || lo cambiamos a /api/auth |
| 2 | src/controllers/authController.js | falta return tras res.status(400) cuando faltan datos --> sigue ejecutando y termina llamando res.status(201) de nuevo | node lanza ERR_HTTP_HEADERS_SENT al probar registro sin body completo || agregamos return |
| 3 | src/controllers/authController.js | falta return tras res.status(200) cuando el usuario no existe --> sigue y llama bcrypt.compare(user.password, ...) con user undefined | login con email inexistente tira TypeError: Cannot read properties of undefine | agregamos return |
| 4 | src/controllers/authController.js | argumentos invertidos en bcrypt.compare(user.password, password). La firma correcta es compare(textoPlano, hash) | con credenciales correctas el login siempre fallaba (bcrypt nunca matcheaba) | lo invertios a bcrypt.compare(password, user.password) |
| 5 | src/controllers/authController.js | falta return tras res.status(401) cuando la contraseña no matchea --> igual sigue y nos da token válido | con password incorrecta el server intentaba responder dos veces (y emitía token igual) | agregamos return |
| 6 | src/controllers/authController.js | devuelve el objeto user completo (incluye el hash de la contraseña) en register y login | cuando revisamos el JSON de respuesta se veía el campo password con el hash bcrypt | se arma un safeUser sin el campo password antes de responder |
| 7 | src/utils/token.js | module.export = {...} (falta la "s") --> el módulo no exporta nada | signToken llegaba como undefined en authController, tirando TypeError: signToken is not a function | corregimos a module.exports |
| 8 | src/utils/token.js | el payload del JWT solo lleva { role }, sin id del usuario | req.user.id era undefined en userController, rompiendo /me | agregamos id: user.id al payload |
| 9 | src/utils/token.js | lee process.env.JWT_SECRETT (typo, doble T) en vez de JWT_SECRET | Comparamos contra el .env, que define JWT_SECRET | corregimos el nombre de la variable |
| 10 | src/utils/token.js | expiresIn: "2s" — el token expira en 2 segundos | cualquier request 2s después del login devolvía 403 por token expirado | cambiamos a "2h" |
| 11 | src/middleware/authMiddleware.js | usa jwt.decode() en vez de jwt.verify() --> no valida la firma, cualquiera puede forjar un token con el payload que quiera | armamos un JWT manual con role: "admin" sin firmar correctamente y el middleware lo aceptó igual | usamos jwt.verify() dentro de un try/catch |
| 12 | src/middleware/authMiddleware.js | lógica invertida: if (!token || decoded) { ... return next(); } deja pasar como invitado cuando NO hay token, en rutas que deberían exigirlo, y nunca rechaza correctamente | pegándole a /api/users/me sin header Authorization igual entraba como {id:"guest"} | reescribimos: sin token --> 401; token inválido/expirado --> 403; token válido --> req.user = decoded |
| 13 | src/routes/userRoutes.js | router.get("/me", getProfile, authMiddleware) — el orden de middlewares está invertido, getProfile corre antes de autenticar | req.user era undefined dentro de getProfile, tirando error | invertimos el orden: authMiddleware primero, luego getProfile |
| 14 | src/controllers/userController.js | const userId = req.body.userId || req.user.id — permite que cualquier usuario autenticado edite el perfil de otro usuario mandando userId en el body (IDOR) | logueado como usuario normal, mandando userId: "1" en el body, modificaba al admin | usamos siempre req.user.id (del token), ignorando cualquier userId del body |


## Guia de calidad para el informe

No alcanza con escribir "habia un error y lo arreglamos".

En cada caso expliquen:

1. Que ocurria.
2. Por que ocurria.
3. Como se soluciono.
4. Como validaron que quedo funcionando.
