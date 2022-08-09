import {CLICK_EVENT} from "../constants/constants.js";
import {page, createProductsCards} from "./createProductCard.js";

const showMoreButton = document.querySelector(".products__show-button");

showMoreButton.addEventListener(CLICK_EVENT, () => {
    page.number += 1;
    createProductsCards(page);
});
