const path = require('path');
const fs = require('fs');
const Cart = require('../model/cart-model');
const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json')
const getFileContent = (cb) => {
    fs.readFile(p, (error, content) => {
        if (error) {
            return cb([]);
        }
        return cb(JSON.parse(content));
    })
}

module.exports = class Products {

    constructor(id, title, imgUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imgUrl = imgUrl;
        this.description = description;
        this.price = price;
    }

    save() {

        getFileContent(pr => {
            if (this.id) {
                const Indexid = pr.findIndex(obj => obj.id == this.id.trim());
                const updatedProduct = [...pr];
                updatedProduct[Indexid] = this;
                fs.writeFile(p, JSON.stringify(updatedProduct), (error) => {
                    console.log(error)
                });
            } else {
                this.id = Math.random().toString();
                pr.push(this);
                fs.writeFile(p, JSON.stringify(pr), (error) => {
                    console.log(error)
                });
            }

        })

    }

    static fetchAll(cb) {
        getFileContent(cb)
    }

    static fetchProductDetails(id, cb) {
        getFileContent(pro => {
            let singleProduct = pro.find(obj => obj.id === id);
            cb(singleProduct);
        });
    }


    static deleteProduct(id) {
        Products.fetchAll((products) => {
            const updatedProducts = products.filter(obj => obj.id.trim() !== id);
            fs.writeFile(p, JSON.stringify(updatedProducts), (error) => {
                if (!error) {
                    Cart.deleteFromCart(id)
                }
            });
        })
    }
}