import {
    createElement,
    removeElementClass,
    addElementClass
} from "../utils/createElementFunc.js";

export {addProductCardToBasket};

const basketButton = document.querySelector('#basketButton');
const basket = document.querySelector('.basket');
const basketButtonBlock = document.querySelector('.basket-button');
const clearBasketButton = document.querySelector('#clearBasket');
const basketList = document.querySelector('.basket-list');
const basketTotalPrice = document.querySelector('.basket-total .basket-total__amount');

let products = [];

//функция для проверки наличия значений по ключу в localStorage, если такого ключа нет, то возвращает пустой массив
function getProductsBasket() {
    return !localStorage.products ? [] : JSON.parse(localStorage.getItem('products'));
}

//если в корзине есть товары , то создаются блоки товаров и общая сумма (если нет , то будет текст , что ничего нет, и всё скрывается)
function fillBasket(products) {
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

products = getProductsBasket();
fillBasket(products);

//функция для создания ключа products, в котором будет хранится массив с данными товаров, добавленных в корзину
function setProductsBasket() {
    localStorage.setItem('products', JSON.stringify(products));
}

//Функция, получающая данные о товаре по id
function getProductCard(id) {
    let parent = document.querySelector(`#cardProduct_${id}`);
    return {
        img: parent.querySelector("img").getAttribute("src"),
        currentPrice: parent.querySelector('.product-info__price_current').innerText,
        oldPrice: parent.querySelector('.product-info__price_old').innerText,
        name: parent.querySelector('.product-info__name').innerText,
        id: id,
        count: 1
    };
}

//Функция добавляющая объекты (в виде товара, добавленного в корзину) в массив localStorage
function saveProductCard(id) {
    //Перебираем все объекты-товары в массиве localStorage
    for (let product of products) {
        //если объект-товар с заданным id уже хранится в localStorage
        if (id === product.id) {
            //То обновляем в объекте-товаре свойство count (количество такого товара), не добавляя этот объект-товар ещё раз в массив
            product.count++;
            //Сохраняем обновлённые данные в localStorage
            setProductsBasket();
            return product;
        }
    }

    //Если объекта-товара с заданным id нет в localStorage, то создаём переменную и передаём в неё все данные о товаре по id
    const productCard = getProductCard(id);
    //добавляем полученный объект в localStorage
    products.push(productCard);
    //сохраняем объект в localStorage
    setProductsBasket();
    return productCard;
}

//Функция, создающая блок товара в корзине на странице
function createBasketListItem(product) {
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

//Функция, изменяющая количество товара в корзине
function setProductCount(productItem, count) {
    const product = productItem.querySelector(".basket-list__item_count");

    product.innerHTML = count + `&nbsp;шт.`;
}

//Функция, считающая общую сумму товаров в корзине
function calcTotalPrice() {
    let totalPrice = 0;

    for (let product of products) {
        totalPrice += product.count * product.currentPrice.split(' ')[0];
    }

    basketTotalPrice.innerHTML = `Итого:&nbsp; ${totalPrice.toFixed(2)} р.`;
}

//Функция, создающая блок, когда корзина пустая
function createEmptyBasketBlock() {
    const emptyBasketBlock = createElement('li', "basket-list__empty", "В корзине пока ничего нет");

    basketList.appendChild(emptyBasketBlock);
    basketTotalPrice.innerText = '';
}

//Функция, удаляющая всё из корзины
function clearBasketList() {
    while (basketList.firstChild) {
        basketList.removeChild(basketList.firstChild)
    }
}

//Обработчик на удалить из корзины
clearBasketButton.addEventListener('click', () => {
    clearBasketList();
    addElementClass(basketButtonBlock, "inactive");
    createEmptyBasketBlock();

    products = [];
    setProductsBasket();
});

//Обработчик для открытия корзины по нажатию на кнопку
basketButton.addEventListener('click', () => {
    basket.classList.toggle('active');
});

//Обработчик для того, чтобы корзина закрывалась при нажатии на любую область страницы кроме кнопки добавить в корзину и саму кнопку корзина
window.addEventListener('click', e => {
    const target = e.target;

    if (!target.closest('.product-card__button_add-basket') && !target.closest('.header__basket')) {
        removeElementClass(basket, "active")
    }
});

//Функция, добавляющая товар из localStorage в корзину на странице
function addProductCardToBasket(id) {
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
}
















