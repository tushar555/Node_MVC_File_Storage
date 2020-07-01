const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');

//fetch previous cart
// fetchFileContent = (cb) => {
//     fs.readFile(p, (error, cartContent) => {
//         if (!error) {
//             cb([]);
//         } else {
//             cb(JSON.parse(cartContent));
//         }
//     })
// }

module.exports = class Cart {

    // static getCartContent(cb) {
    //     fetchFileContent(cartContent => {
    //         cb(cartContent);
    //     })
    // }

    static addProduct(id, price) {
        let cart = { products: [], totalPrice: 0 };
        fs.readFile(p, (error, fileContent) => {
            //  console.log(JSON.parse(fileContent), JSON.parse(fileContent).products.length)
            if (JSON.parse(fileContent).products && JSON.parse(fileContent).products.length > 0) {
                cart = JSON.parse(fileContent);
            }

            const index = cart.products.findIndex(obj => obj.id === id);

            const alreadyExists = cart.products[index];
            // console.log(alreadyExists)
            // console.log(index)
            // console.log(cart.products)

            let updatedProduct;
            if (alreadyExists) {
                updatedProduct = { ...alreadyExists };

                updatedProduct.qty = updatedProduct.qty + 1
                cart.products[index] = { ...updatedProduct };

            } else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];

            }
            cart.totalPrice = cart.totalPrice + price;
            fs.writeFile(p, JSON.stringify(cart), (err) => { })
        })
    }


    static deleteFromCart(id) {
        fs.readFile(p, (error, fileContent) => {
            const allCart = JSON.parse(fileContent);
            const products = allCart.products.filter(obj => obj.id.trim() !== id);
            let updatedProducts = {};
            updatedProducts.products = products
            updatedProducts.totalPrice = 0;
            console.log(updatedProducts)
            fs.writeFile(p, JSON.stringify(updatedProducts), (error) => {
                if (!error) {

                }
            });
        })
    }

    static getCart(cb) {
        fs.readFile(p, (error, fileContent) => {
            const cartItems = { ...JSON.parse(fileContent) };
            cb(cartItems);
        })
    }

}