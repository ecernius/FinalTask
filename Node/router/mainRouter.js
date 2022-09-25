const express = require("express");
const router = express.Router();

const {
  register,
  login,
  autoLogin,
  logout,
  updatePic,
  otherUsers,
  likedUsers,
  getlikedUsers,
} = require("../controllers/mainController");

router.post("/likedUsers", likedUsers);
router.post("/updatePic", updatePic);
router.post("/register", register);
router.post("/login", login);
router.get("/autologin", autoLogin);
router.get("/logout", logout);
router.get("/otherUsers", otherUsers);
router.get("/getlikedUsers", getlikedUsers);

module.exports = router;
