import {createElement} from "../utils/createElement.js";
import {basketList} from "./elementsSearcher.js";

export function createBasketListItem(product) {
    const basketListItem = createElement("li", "basket-list__item", "" ,[{name: "id", value: `product_${product.id}`}]);
    const imageItem = createElement("img", "basket-list__item_image", "", [{name: "src", value: product.img}]);
    const nameItem = createElement("p", "basket-list__item_name", product.name);
    const countItem = createElement("span", "basket-list__item_count", `${product.count} шт.`);
    const priceItemBlock = createElement("div", "basket-list__item_price");
    const currentPriceItem = createElement("span", "basket-list__item_price-current", product.currentPrice);
    const oldPriceItem = createElement("del", "", product.oldPrice);

    priceItemBlock.innerHTML += currentPriceItem.outerHTML + oldPriceItem.outerHTML;
    basketListItem.innerHTML += imageItem.outerHTML + nameItem.outerHTML + countItem.outerHTML + priceItemBlock.outerHTML;

    basketList.appendChild(basketListItem);
}
