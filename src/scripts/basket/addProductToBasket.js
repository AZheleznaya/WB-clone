import {saveProductCard} from "./localStorage.js";
import {removeElementClass} from "../utils/add-removeElementClass.js";
import {basketButtonBlock} from "./elementsSearcher.js";
import {createBasketListItem} from "./createBasketItem.js";
import { setProductCount, calcTotalPrice, setBasketCount} from "./price-productCounters.js";

export function addProductCardToBasket(id) {
    let productCard = saveProductCard(id);
    let emptyBasketBlock = document.querySelector(".basket-list__empty");
    let basketListItem = document.querySelector(`#product_${productCard.id}`);

    if (emptyBasketBlock !== null) {
        emptyBasketBlock.remove();
        removeElementClass(basketButtonBlock, "inactive");
    }

    if (basketListItem === null) {
        createBasketListItem(productCard);
    } else {
        setProductCount(basketListItem, productCard.count);
    }

    calcTotalPrice();
    setBasketCount();
}