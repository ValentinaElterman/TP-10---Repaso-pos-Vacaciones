const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { getProfile, updateMe } = require("../controllers/userController");

const router = express.Router();

// authMiddleware antes de controllers
router.put("/me", authMiddleware, updateMe);
router.get("/me", authMiddleware, getProfile);

router.get("/orders", authMiddleware, (req, res) => { //agregamos authMiddleware
  return res.status(200).json({
    orders: [
      { id: "A1", total: 1250 },
      { id: "A2", total: 4900 }
    ]
  });
});

module.exports = router;
