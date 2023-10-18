const express = require("express")
const loginWithGoogleApi = require("./loginWithGoogle");
const userApi = require("./user");

const router = express.Router();

router.use(loginWithGoogleApi);
router.use(userApi);

module.exports = router;