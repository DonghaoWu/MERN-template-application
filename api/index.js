//(*2.2)
const router = require("express").Router();

router.use("/users", require("./users"));
router.use("/auth", require("./auth"));
router.use("/profiles", require("./profiles"));

module.exports = router;