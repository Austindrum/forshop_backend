const db = require("../models");
const Category = db.Category;
const SubCategory = db.SubCategory;
const Product = db.Product;
const Order = db.Order;
const OrderItem = db.OrderItem;
const imgur = require("imgur-node-api");
const IMGUR_ID = process.env.IMGUR_ID;

const productsController = {
    getProducts: async (req, res) => {
        //==Fetch Categories==
        const tempCategories = await Category.findAll({
            raw: true,
            nest: true,
        });
        const tempSubCategories = await SubCategory.findAll({
            raw: true,
            nest: true
        })
        const categories = tempCategories.map(category=>{
            const subCategories = tempSubCategories.filter(subCategory => {
                if(category.id === subCategory.CategoryId){
                    return SubCategory;
                };
            });
            return {
                ...category,
                subCategories
            }
        })
        //==Fetch Categories==
        const products = await Product.findAll({
            raw: true,
            nest: true
        }).then(ps => {
            ps.forEach(p => {
                p.category = categories.filter(category=> p.category === category.id ? category : '' );
                p.sub_category = p.category[0].subCategories.filter(subCate=> subCate.id === p.sub_category ? subCate : '');
            });
            return ps;
        })
        return res.json({
            status: 'success',
            message: '資料蒐取成功',
            categories,
            products
        })
    },
    getProduct: async (req, res) => {
        const product = await Product.findByPk(req.params.id);
        res.json({
            status: 'success',
            message: '資料蒐取成功',
            product,
        })
    },
    getCategoryies: async (req, res) => {
        const categories = await Category.findAll({
            include: [
                SubCategory,
            ]
        });
        return res.json({
            status: 'success',
            message: '資料蒐取成功',
            categories,
        })
    },
    getCategory: async (req, res) => {
        const category = await Category.findByPk(req.params.id, {
            include: [
                SubCategory,
            ]
        })
        return res.json({
            status: 'success',
            message: '資料蒐取成功',
            category
        })
    },
    getCategoryProducts: async(req, res) => {
        const category = await Category.findByPk(req.params.id);
        const subCategories = await SubCategory.findAll({
            where: {
                CategoryId: req.params.id
            }
        })
        const categoryProducts = await Product.findAll({
            where: {
                category: req.params.id
            }
        });
        return res.json({
            status: 'success',
            message: '資料蒐取成功',
            category,
            categoryProducts,
            subCategories
        })
    },
    getSubCategory: async(req, res) => {
        const category = await Category.findByPk(req.params.categoryId);
        const subCategory = await SubCategory.findByPk(req.params.subCategoryId);
        return res.json({
            status: 'success',
            message: '資料蒐取成功',
            category,
            subCategory,
        })
    },
    getSubCategoryProducts: async(req, res) => {
        const products = await Product.findAll({
            where: {
                sub_category: req.params.id
            }
        });
        return res.json({
            status: 'success',
            message: '資料蒐取成功',
            products
        })
    },
    postCategory: async (req, res) => {
        const category = await Category.create({
            title: req.body.title
        });
        await req.body.subCategories.forEach(subCategory => {
            SubCategory.create({
                CategoryId: category.id,
                title: subCategory.title
            })
        })
        return res.json({
            status: 'success',
            message: '類別建立成功'
        })
    },
    putCategory: async(req, res) => {
        
        const categoryId = req.body.id;
        const categoryTitle = req.body.title;
        const subCategories = req.body.subCategories;

        await Category.findByPk(categoryId)
        .then(async category => {
            category.update({
                title: categoryTitle
            });
        });

        await SubCategory.findAll({
            where: {
                CategoryId: categoryId
            }
        }).then(subCates=>{
            subCates.forEach(async subCate => {
                await subCate.destroy();
            })
        })
        .then(()=>{
            subCategories.forEach(async subCate=>{
                if(subCate.id){
                    await SubCategory.create({
                        id: subCate.id,
                        title: subCate.title,
                        CategoryId: categoryId
                    })
                } else {
                    await SubCategory.create({
                        title: subCate.title,
                        CategoryId: categoryId
                    })
                }
            })    
        })
        return res.json({
            status: 'success',
            message: '編輯成功'
        });
    },
    postProduct: async(req, res) => {
        const { file } = req;
        const data = { ...req.body };
        imgur.setClientID(IMGUR_ID);
        imgur.upload(file.path, async (err, img)=>{
            if(err) {
                return res.json({
                    status: "error",
                    message: "Someting wrong",
                });
            } else {
                await Product.create({
                    title: data.title,
                    category: data.category,
                    sub_category: data.subCategory,
                    item_num: data.itemNum,
                    unit: data.unit,
                    origin_price: data.origin_price,
                    price: data.price,
                    color: data.colors,
                    size_s: data.sizeS ? true : false,
                    size_m: data.sizeM ? true : false,
                    size_l: data.sizeL ? true : false,
                    size_xl: data.sizeXL ? true : false,
                    content: data.content,
                    description: data.description,
                    enabled: data.isEnable === '1' ? true : false,
                    image1: file ? img.data.link : "",
                    image2: data.img0,
                    image3: data.img1,  
                    image4: data.img2,
                });
                return res.json({
                    status: "success",
                    message: "商品建立成功"
                })
            }
        })
    },
    putProduct: async (req, res) => {
        const product = await Product.findByPk(req.body.product_id);
        const prop = { ...req.body };
        const { file } = req;
        if(!file) {
            await product.update({
                title: prop.title,
                category: prop.category,
                sub_category: prop.subCategory,
                item_num: prop.itemNum,
                unit: prop.unit,
                origin_price: prop.origin_price,
                price: prop.price,
                color: prop.colors,
                size_s: prop.sizeS[0] === 'on' ? true : false,
                size_m: prop.sizeM[0] === 'on' ? true : false,
                size_l: prop.sizeL[0] === 'on' ? true : false,
                size_xl: prop.sizeXL[0] === 'on' ? true : false,
                content: prop.content,
                description: prop.description,
                enabled: prop.isEnable === '1' || prop.isEnable === 'true' ? true : false,
                image2: prop.img0,
                image3: prop.img1,
                image4: prop.img2,
            })
        } else {
            imgur.setClientID(IMGUR_ID);
            imgur.upload(file.path, async (err, img)=>{
                if(err) {
                    return res.json({
                        status: "error",
                        message: "Someting wrong",
                    });
                }else{
                    await product.update({
                        title: prop.title,
                        category: prop.category,
                        sub_category: prop.subCategory,
                        item_num: prop.itemNum,
                        unit: prop.unit,
                        origin_price: prop.origin_price,
                        price: prop.price,
                        color: prop.colors,
                        size_s: prop.sizeS[0] === 'on' ? true : false,
                        size_m: prop.sizeM[0] === 'on' ? true : false,
                        size_l: prop.sizeL[0] === 'on' ? true : false,
                        size_xl: prop.sizeXL[0] === 'on' ? true : false,
                        content: prop.content,
                        description: prop.description,
                        enabled: prop.isEnable === '1' || prop.isEnable === 'true' ? true : false,
                        image1: file ? img.data.link : "",
                        image2: prop.img0,
                        image3: prop.img1,
                        image4: prop.img2,
                    })
                }
            }); 
        }
        return res.json({
            status: 'success',
            message: '成功'
        })
    },
    deleteProduct: async (req, res) => {
        Product.findByPk(req.params.id)
        .then(async product => {
            await product.destroy();
            return res.json({
                status: 'success',
                message: '刪除成功'
            });
        })
    },
    getOrder: async (req, res) => {
        const order = await Order.findByPk(req.params.id, {
            include: [
                { model: Product, as: 'Products' }
            ]
        });
        res.json({
            status: 'success',
            message: '資料蒐取成功',
            order,
        })
    },
    postOrder: async (req, res) => {
        const order = await Order.create({
            name: req.body.user.name,
            email: req.body.user.email,
            tel: req.body.user.tel,
            address: req.body.user.address,
            payment: req.body.user.payment,
            message: req.body.user.message,
            status: false
        });
        req.body.items.forEach(async item => {
            console.log(item);
            await OrderItem.create({
                OrderId: order.id,
                ProductId: item.id,
                num: item.num,
                color: item.color,
                size: item.size,
                amount: item.total,
            })
        });
        res.json({
            status: 'success',
            message: '訂單建立成功',
            order: order.id,
        })
    },
    putOrder: async (req, res) => {
        const order = await Order.findByPk(req.body.productId);
        await order.update({
            status: !req.body.status,
        });
        res.json({
            status: 'success',
            message: '付費完成'
        })
    },
};

module.exports = productsController;