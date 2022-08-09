import {addElementClass, removeElementClass} from "../utils/add-removeElementClass.js";
import {products} from "./localStorage.js";
import {basketButtonBlock} from "./elementsSearcher"
import {createBasketListItem} from "./createBasketItem.js";
import {calcTotalPrice, setBasketCount} from "./price-productCounters.js";
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
    
    setBasketCount();
}

fillBasket(products);















