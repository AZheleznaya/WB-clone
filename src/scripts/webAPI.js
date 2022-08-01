"use strict";

import { addItemToBasket, showItemPreview } from './basket';

const requestURL = "https://62e03995fa8ed271c480af0e.mockapi.io/goods";
const goodsList = document.querySelector(".goods__list");
const showMoreButton = document.querySelector(".goods__show-button");
const page = new Page(1, 9);

async function getGoodsCards(url, page) {

    const response = await fetch(url + `?page=${page.number}&limit=${page.size}`);

    if (!response.ok) {
        throw new Error(`Enable to fetch data from ${url}: error status ${response.status}`)
    }

    let goodsData = await response.json();
    return await goodsData.map(e => new GoodsCard(e.id, e.name, e.priceLast, e.discount, e.image));
}

function GoodsCard(id, name, priceLast, discount, imageUrl) {
    this.id = id;
    this.name = name;
    this.priceLast = priceLast;
    this.discount = discount;
    this.imageUrl = imageUrl;
    this.priceNow = (priceLast - priceLast / 100 * discount).toFixed(2);
}

function Page(number, size) {
    this.number = number;
    this.size = size;
}

function createElement(tagName, className, contentHTML) {
    const element = document.createElement(tagName);
    element.className = className;
    element.innerHTML = contentHTML;

    return element;
}

function createGoodsCards(page) {
    getGoodsCards(requestURL, page).then(goodsCards => {
        return goodsCards.map(e => {
            //Общий блок
            const goodsItem = createElement("div", "goods-item", "");
            //Блок карточки (картинка, скидка, кнопки)
            const goodsCardBlock = createElement("div", "goods-card", "");

            const goodsImage = createElement("img", "image lazy-image", "");
            const goodsCardImage = createElement("div", "goods-card__image", "");

            const goodsCardPreview = createElement("div", "goods-card__preview", "");
            const goodsPreviewButton = createElement("button", "goods-card__preview_button", "Быстрый просмотр");

            const goodsDiscountValue = createElement("span", "discount", e.discount);
            const goodsDiscount = createElement("div", "goods-card__discount", "");

            const goodsCardAdd = createElement("div", "goods-card__button", "");
            const goodsAddButton = createElement("button", "goods-card__button_add-basket", "Добавить в корзину");

            //Блок инфо о товаре (цены и описание)
            const goodsInfoBlock = createElement("div", "goods-info", "");

            const goodsPriceBlock = createElement("div", "goods-info__price", "");
            const goodsPriceNow = createElement("span", "goods-info__price_now", e.priceNow + " р.");
            const goodsPriceLast = createElement("del", "goods-info__price_last", e.priceLast + " р.");

            const goodsDescription = createElement("div", "goods-info__description", e.name);

            //Создание блока карточки
            goodsItem.setAttribute("id",`cardProduct_${e.id}`);
            goodsAddButton.setAttribute("id",`addProduct_${e.id}`);
            goodsImage.setAttribute("data-src", e.imageUrl + `?${e.id}`);
            goodsPreviewButton.setAttribute("id", `preview_${e.id}`);
            goodsCardImage.appendChild(goodsImage);
            goodsCardPreview.appendChild(goodsPreviewButton);
            goodsDiscount.innerHTML += "-" + goodsDiscountValue.outerHTML + "%";
            goodsCardAdd.appendChild(goodsAddButton);

            goodsCardBlock.innerHTML += goodsCardImage.outerHTML + goodsCardPreview.outerHTML + goodsDiscount.outerHTML + goodsCardAdd.outerHTML;

            //Создание блока инфо
            goodsPriceBlock.innerHTML += goodsPriceNow.outerHTML + goodsPriceLast.outerHTML;
            goodsInfoBlock.innerHTML += goodsPriceBlock.outerHTML + goodsDescription.outerHTML;

            goodsItem.innerHTML += goodsCardBlock.outerHTML + goodsInfoBlock.outerHTML;
            return goodsItem;
        });

    }).then(goods => {
        goods.forEach(e => goodsList.appendChild(e))
        document.querySelectorAll("img.lazy-image").forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove("lazy-image");
            img.removeAttribute("data-src");
        });
        
        document.querySelectorAll(".goods-card__button_add-basket").forEach(btn => {
            let id = btn.id.split('_')[1];
            btn.addEventListener('click', () => addItemToBasket(id));
        });

        document.querySelectorAll(".goods-card__preview_button").forEach(btn => {
            let id = btn.id.split('_')[1];
            btn.addEventListener('click', () => showItemPreview(id));
        });

    })
}

showMoreButton.addEventListener('click', () => {
    page.number += 1;
    createGoodsCards(page);
});

createGoodsCards(page);

