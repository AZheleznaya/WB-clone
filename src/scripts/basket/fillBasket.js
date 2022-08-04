import {addElementClass, removeElementClass} from "../utils/add-removeElementClass.js";
import {products} from "./localStorage.js";
import {basketButtonBlock} from "./elementsCreator"
import {createBasketListItem} from "./createBasketItem.js";
import {calcTotalPrice} from "./price-productCounters.js";
import {createEmptyBasketBlock} from "./emptyBasket.js";

export function fillBasket(products) {
    if (products.length) {
        removeElementClass(basketButtonBlock, "inactive");

        for (let product of products) {
            createBasketListItem(product);
        }

        calcTotalPrice();

    } else {
        addElementClass(basketButtonBlock, "inactive");
        createEmptyBasketBlock();
    }
}

fillBasket(products);















