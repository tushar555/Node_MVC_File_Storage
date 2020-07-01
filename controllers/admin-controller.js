const Product = require('../model/product-model');

exports.getAddProducts = (req, res, next) => {
    res.render('admin/edit-product', {
        docTitle: 'Add Product', path: '/add-product', editing: false
    })
}


exports.postAddProducts = (req, res, next) => {

    const product = new Product(null, req.body.title, req.body.imgUrl, req.body.description, req.body.price)
    product.save();
    res.redirect('/');
}

exports.getEditProduct = (req, res, next) => {
    const edit = req.query.edit
    const id = req.params.productId
    Product.fetchProductDetails(id, product => {
        //  console.log(product)
        res.render('admin/edit-product', {
            docTitle: 'Add Product', path: '/edit-product',
            editing: edit,
            product: product
        })
    })

}


exports.showAllAdminProducts = (req, res, next) => {
    const products = Product.fetchAll(pro => {
        res.render('admin/all-products', {
            docTitle: 'All Admin Products',
            path: '/admin-all-products',
            products: pro,
            isProductavailable: pro.length > 0,

        })
    });
}


exports.postEditProductsDetails = (req, res, next) => {

    const pr = new Product(req.body.id, req.body.title, req.body.imgUrl, req.body.description, req.body.price);
    pr.save();
    res.redirect('/admin-all-products')
}

exports.postdeleteProductsDetails = (req, res, next) => {
    const productId = req.params.productId;
    Product.deleteProduct(productId.trim())
    res.redirect('/admin-all-products')
}
