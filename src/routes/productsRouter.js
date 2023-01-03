const { Router } = require("express");
const router = Router();
const productosCtrl = require("../../src/controllers/productsController");

// CRUD Admin for Routes Products
router.get("/get_products", productosCtrl.get_products);
router.post("/add_product", productosCtrl.add_product);
router.delete("/delete_product/:id", productosCtrl.delete_product);
router.get("/get_product/:id" ,productosCtrl.get_product);
router.put("/edit_product/:id" ,productosCtrl.edit_product);

module.exports = router;
