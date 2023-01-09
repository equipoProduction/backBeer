const { Router } = require("express");
const router = Router();
const clientsCtrl = require("../controllers/clientsController");

// CRUD Admin for Routes Client
router.get("/get_clients", clientsCtrl.get_clients);
router.post("/add_client", clientsCtrl.add_client);
router.delete("/delete_client/:id", clientsCtrl.delete_client);
router.get("/get_client/:id" ,clientsCtrl.get_client);
router.put("/edit_client/:id" ,clientsCtrl.edit_client);

module.exports = router;