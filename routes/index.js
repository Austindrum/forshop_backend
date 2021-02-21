const multer = require("multer");
const upload = multer({ dest: 'temp/' });


const adminController = require("../controllers/adminController");
const productsController = require("../controllers/productsControllers");
const orderController = require("../controllers/orderController");

const authorization = require("../config/authorization");
const checkIsLogin = (req, res, next) => {
    return authorization.checkIsLogin(req, res, next);
}

module.exports = (app) => {
    
    app.post("/login", adminController.signin);

    app.get("/products", productsController.getProducts);
    app.get("/product/:id", productsController.getProduct);
    app.get("/categoryies", productsController.getCategoryies);
    app.get("/category/:id", productsController.getCategory);
    app.get("/category/:id/products", productsController.getCategoryProducts);
    app.get("/category/:categoryId/subcategory/:subCategoryId/products", productsController.getSubCategory)
    app.get("/subcategory/:id/products", productsController.getSubCategoryProducts);

    app.get("/order/:id", productsController.getOrder);
    app.post("/order", productsController.postOrder);

    //管理介面
    app.use(checkIsLogin);
    app.get("/get_current_user", adminController.getCurrentUser);

    app.post("/admin/product", upload.single('image'), productsController.postProduct);
    app.put("/admin/product", upload.single('image'), productsController.putProduct);
    app.delete("/admin/product/:id", productsController.deleteProduct);

    app.get("/admin/category/:id", productsController.getCategory);
    app.post("/admin/category", productsController.postCategory);
    app.put("/admin/category", productsController.putCategory);

    app.get("/admin/orders", orderController.getOrders);
    app.put("/order", productsController.putOrder);
}