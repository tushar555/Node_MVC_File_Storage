const Product = require('../model/product-model');
const Cart = require('../model/cart-model');

exports.viewProducts = (req, res, next) => {
    const products = Product.fetchAll(pro => {
        res.render('shop/show-product', {
            docTitle: 'Show Products',
            path: '/',
            products: pro,
            isProductavailable: pro.length > 0,

        })
    });

}

exports.viewProductsDetails = (req, res, next) => {
    const productId = req.params.productId;
    const products = Product.fetchProductDetails(productId, pr => {

        res.render('shop/product-details', {
            docTitle: 'Product details',
            path: '/product-details',
            product: pr
        })
    })
}

exports.getIndex = (req, res, next) => {
    const products = Product.fetchAll(pro => {
        res.render('shop/index', {
            docTitle: 'Show Products',
            path: '/',
            products: pro,
            isProductavailable: pro.length > 0,

        })
    });

}

exports.showCartProducts = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(pro => {
            let newCart = [];
            pro.forEach((obj) => {
                const findObj = cart.products.find(inner => inner.id.trim() === obj.id.trim())
                if (findObj) {
                    newCart.push({ productData: obj, qty: findObj.qty })
                }

            })
            console.log(newCart)
            res.render('shop/cart', { docTitle: 'Your Cart', path: '/cart', cart: newCart })
        })

    })

}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', { docTitle: 'Checkout', path: '/checkout' })
}

exports.getOrder = (req, res, next) => {
    res.render('shop/order', { docTitle: 'My Orders', path: '/order' })
}

exports.addToCart = (req, res, next) => {

    const productId = req.body.productId;

    Product.fetchProductDetails(productId, (pro) => {

        Cart.addProduct(productId, parseInt(pro.price))
    })

    res.redirect('/cart')
}


exports.deleteCartItem = (req, res, next) => {
    const productId = req.body.id;
    Cart.deleteFromCart(productId);
    res.redirect('/cart')
}



