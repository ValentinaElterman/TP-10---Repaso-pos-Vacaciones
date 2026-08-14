const express = require("express");
const authMiddleware = require("../middleware/authMiddleware"); //agregamos
const { adminMiddleware } = require("../middleware/authMiddleware"); //agregamos
const { listUsers } = require("../controllers/adminController");

const router = express.Router();

router.get("/all", authMiddleware, adminMiddleware, listUsers); //agregamos esto protegido

module.exports = router;
