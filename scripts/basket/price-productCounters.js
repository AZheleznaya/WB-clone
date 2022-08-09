import {products} from "./localStorage.js";
import {basketTotalPrice, basketCount} from "./elementsSearcher.js";

export function setProductCount(productItem, count) {
    const product = productItem.querySelector(".basket-list__item_count");

    product.innerHTML = count + `&nbsp;шт.`;
}

export function calcTotalPrice() {
    let totalPrice = 0;

    for (let product of products) {
        totalPrice += product.count * product.currentPrice.split(' ')[0];
    }

    basketTotalPrice.innerHTML = `Итого:&nbsp; ${totalPrice.toFixed(2)} р.`;
}

export function setBasketCount() {
    let count = 0;
    
    for (let product of products) {
        count += product.count;
    }
    
    basketCount.innerText = count;
    count > 0 ? basketCount.classList.add('active'): basketCount.classList.remove('active');
}