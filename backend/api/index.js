const express = require("express")
const customLoginApi = require("./customLogin");
const loginWithGoogleApi = require("./loginWithGoogle");
const userApi = require("./user");
const serviceApi = require("./service");
const router = express.Router();


router.use(customLoginApi);
router.use(loginWithGoogleApi);
router.use(userApi);
router.use(serviceApi);

module.exports = router;