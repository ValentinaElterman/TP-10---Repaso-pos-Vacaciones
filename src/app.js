require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middlewares globales
app.use(morgan("dev"));
app.use(express.json()); // agregamos este que permite pasar las cosas en JSON

app.use("/api/auth", authRoutes);//cambiamos la ruta porque estaba mal
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Operacion Rescate II"
  });
});

app.use(errorHandler);

module.exports = app;