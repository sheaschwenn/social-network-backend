const router = require("express").Router();
const userRoutes = require("./userRoutes");
const itemRoutes = require("./thoughtRoutes");


router.use("/user", userRoutes);
router.use("/thoughts", itemRoutes);


module.exports = router;