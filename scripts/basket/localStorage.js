import {getProductCard} from "./getProductInfo.js";

export {products, getProductsBasket, setProductsBasket, saveProductCard};

let products = [];

function getProductsBasket() {
    return !localStorage.products ? [] : JSON.parse(localStorage.getItem('products'));
}

products = getProductsBasket();

function setProductsBasket() {
    localStorage.setItem('products', JSON.stringify(products));
}

function saveProductCard(id) {
    for (let product of products) {
        if (id === product.id) {
            product.count++;
            setProductsBasket();

            return product;
        }
    }

    const productCard = getProductCard(id);
    products.push(productCard);
    setProductsBasket();

    return productCard;
}