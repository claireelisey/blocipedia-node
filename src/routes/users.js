const express = require("express");
const router = express.Router();
const validation = require("./validation");
const userController = require("../controllers/userController");



router.get("/users/signup", userController.signUp);
router.post("/users", validation.validateUsers, userController.create);

router.get("/users/signin", userController.signInForm);
router.post("/users/signin", validation.validateUsersSignIn, userController.signIn);
router.get("/users/signout", userController.signOut);

router.get("/users/:id", userController.show);

router.post('/users/:id/upgrade', userController.payment);
router.post('/users/:id/downgrade', userController.downgrade);
router.get("/users/:id/collaborations", userController.showCollaborations);



module.exports = router;