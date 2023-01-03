const { Router } = require("express");
const router = Router();
const ordersCtrl = require("../../src/controllers/ordersController");

// CRUD Admin for Routes Products
router.get("/get_orders", ordersCtrl.get_orders);
router.post("/add_order", ordersCtrl.add_order);
router.delete("/delete_order/:id", ordersCtrl.delete_order);
router.get("/get_order/:id" ,ordersCtrl.get_order);
router.put("/edit_order/:id" ,ordersCtrl.edit_order);

module.exports = router;