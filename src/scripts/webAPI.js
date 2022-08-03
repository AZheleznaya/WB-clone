import {addProductCardToBasket} from './basket/basket.js';
import {showItemPreview} from "./popupOverlay.js";
import {createElement} from "./utils/createElementFunc.js";

const requestURL = "https://62e03995fa8ed271c480af0e.mockapi.io/goods";
const productsList = document.querySelector(".products__list");
const showMoreButton = document.querySelector(".products__show-button");
const page = new Page(1, 9);

async function getProductsCards(url, page) {

    const response = await fetch(url + `?page=${page.number}&limit=${page.size}`);

    if (!response.ok) {
        throw new Error(`Enable to fetch data from ${url}: error status ${response.status}`)
    }

    let productsData = await response.json();
    return await productsData.map(e => new ProductsCard(e.id, e.name, e.oldPrice, e.discount, e.image));
}

function ProductsCard(id, name, oldPrice, discount, imageUrl) {
    this.id = id;
    this.name = name;
    this.oldPrice = oldPrice;
    this.discount = discount;
    this.imageUrl = imageUrl;
    this.currentPrice = (oldPrice - oldPrice / 100 * discount).toFixed(2);
}

function Page(number, size) {
    this.number = number;
    this.size = size;
}

function createProductsCards(page) {
    getProductsCards(requestURL, page).then(productsCards => {
        return productsCards.map(e => {
            //Общий блок
            const productItem = createElement("div", "product-item", "",[{name: "id", value: `cardProduct_${e.id}`}]);
            //Блок карточки (картинка, скидка, кнопки)
            const productCardBlock = createElement("div", "product-card");

            const productImage = createElement("img", "image lazy-image", "", [{name: "data-src", value: e.imageUrl + `?${e.id}`}]);
            const productCardImage = createElement("div", "product-card__image");

            const productCardPreview = createElement("div", "product-card__preview");
            const productPreviewButton = createElement("button", "product-card__preview_button", "Быстрый просмотр", [{name: "id", value: `preview_${e.id}`}]);

            const productDiscountValue = createElement("span", "discount", `-${e.discount}%`);
            const productDiscount = createElement("div", "product-card__discount");

            const productCardAdd = createElement("div", "product-card__button");
            const productAddButton = createElement("button", "product-card__button_add-basket", "Добавить в корзину", [{name: "id", value: `addProduct_${e.id}`}]);

            //Блок инфо о товаре (цены и описание)
            const productInfoBlock = createElement("div", "product-info");

            const productPriceBlock = createElement("div", "product-info__price");
            const productCurrentPrice = createElement("span", "product-info__price_current", e.currentPrice + " р.");
            const productOldPrice = createElement("del", "product-info__price_old", e.oldPrice + " р.");

            const productName = createElement("div", "product-info__name", e.name);

            productCardImage.appendChild(productImage);
            productCardPreview.appendChild(productPreviewButton);
            productDiscount.appendChild(productDiscountValue);
            productCardAdd.appendChild(productAddButton);

            productCardBlock.innerHTML += productCardImage.outerHTML + productCardPreview.outerHTML + productDiscount.outerHTML + productCardAdd.outerHTML;

            productPriceBlock.innerHTML += productCurrentPrice.outerHTML + productOldPrice.outerHTML;
            productInfoBlock.innerHTML += productPriceBlock.outerHTML + productName.outerHTML;

            productItem.innerHTML += productCardBlock.outerHTML + productInfoBlock.outerHTML;
            return productItem;
        });

    }).then(products => {
        products.forEach(e => productsList.appendChild(e))
        document.querySelectorAll("img.lazy-image").forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove("lazy-image");
            img.removeAttribute("data-src");
        });
        
        document.querySelectorAll(".product-card__button_add-basket").forEach(btn => {
            let id = btn.id.split('_')[1];
            btn.addEventListener('click', () => addProductCardToBasket(id));
        });

        document.querySelectorAll(".product-card__preview_button").forEach(btn => {
            let id = btn.id.split('_')[1];
            btn.addEventListener('click', () => showItemPreview(id));
        });

    })
}

showMoreButton.addEventListener('click', () => {
    page.number += 1;
    createProductsCards(page);
});

createProductsCards(page);

