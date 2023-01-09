const { Router } = require("express");
const router = Router();
const usersCtrl = require("../controllers/usersController");

// CRUD Admin for Routes User
router.get("/get_users", usersCtrl.get_users);
router.post("/add_user", usersCtrl.add_user);
router.delete("/delete_user/:id", usersCtrl.delete_user);
router.get("/get_user/:id" ,usersCtrl.get_user);
router.put("/edit_user/:id" ,usersCtrl.edit_user);



module.exports = router;
