import {createElement} from "../utils/createElement.js";
import {basketList, basketTotalPrice} from "./elementsSearcher.js";

export function createEmptyBasketBlock() {
    const emptyBasketBlock = createElement('li', "basket-list__empty", "В корзине пока ничего нет");

    basketList.appendChild(emptyBasketBlock);
    basketTotalPrice.innerText = '';
}