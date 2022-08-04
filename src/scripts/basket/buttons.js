import {basketList, clearBasketButton, basketButtonBlock, basketButton, basket} from "./elementsCreator.js";
import {addElementClass, removeElementClass} from "../utils/add-removeElementClass.js";
import {createEmptyBasketBlock} from "./emptyBasket.js";
import {products, setProductsBasket} from "./localStorage.js";
import {CLICK_EVENT} from "../constants/constants.js";

function clearBasketList() {
    while (basketList.firstChild) {
        basketList.removeChild(basketList.firstChild)
    }
}

clearBasketButton.addEventListener(CLICK_EVENT, () => {
    clearBasketList();
    addElementClass(basketButtonBlock, "inactive");
    createEmptyBasketBlock();

    products.length = 0;
    setProductsBasket();
});

basketButton.addEventListener(CLICK_EVENT, () => {
    basket.classList.toggle('active');
});

window.addEventListener(CLICK_EVENT, e => {
    const target = e.target;

    if (!target.closest('.product-card__button_add-basket') && !target.closest('.header__basket')) {
        removeElementClass(basket, "active")
    }
});