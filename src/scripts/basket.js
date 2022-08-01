'use strict'

const basket = document.querySelector('#basketBtn');
const clearBasket = document.querySelector('#clearBasket');
const basketList = document.querySelector('.basket_list');
const basketBlock = document.querySelector('.basket')
const clearBtnBlock = document.querySelector('.basket_btn');
const basketTotal = document.querySelector('.basket_total span');
const countBlockToBasket = document.querySelector('.total_basket')
const popupOverlay = document.querySelector('.overlay');

const basketEmptyClass = 'basket_list__empty';
const basletCountClass = 'basket_list__item_count';

let products = getProduct();


document.addEventListener('click', () => {
  
    window.addEventListener('click', e => {
      const target = e.target;

      if (!target.closest('.goods-card__button_add-basket') && !target.closest('.header__basket')) { 
        basketBlock.style.display = 'none';
      }

    });
  });

if (products.length) {
    showBtnBlock(true);

    for (let product of products) {
        createBasketBlock(product);        
    }

    getTotalSum();

} else {
    showBtnBlock(false);
    createEmptyBasket();    
}

popupOverlay.addEventListener('click', (e) => {
    e.stopPropagation();
    e.stopImmediatePropagation();
    showPopup(false);
})

clearBasket.addEventListener('click', () => {
    clearBasketItems();
    showBtnBlock(false);
    createEmptyBasket();

    products = [];
    setProduct();    
});

basket.addEventListener('click', () => {
    basketBlock.classList.toggle('active');
    showBasket();
});

basketBlock.addEventListener('click', e => {
    e.stopPropagation();
  });

function createEmptyBasket() {
    const text = 'В корзине пока ничего нет.';
    const listElement = createElement('li', basketEmptyClass, text);

    basketList.appendChild(listElement);
    basketTotal.innerText = '';    
}

function totalBasketItems() {
    let count = document.querySelector('.basket_list__item')

    countBlockToBasket.innerText = `${count}`;
}

function clearBasketItems() {
    let deleteBasketAll = document.querySelectorAll('.basket_list__item');
    
    for (let i = 0; i < deleteBasketAll.length; i++) {
        deleteBasketAll[i].remove();
    }
}

function showBtnBlock(show) {
    show ? clearBtnBlock.style.display = '' : clearBtnBlock.style.display = 'none';
}

function createElement(tag, classList = '', text = '', attributes = []) {
    const element = document.createElement(tag);

    if (classList.length) {
        element.classList.add(classList);
    }
 
    if (text.length) {
        element.innerText = text;
    }

    for (let attr of attributes) {
        element.setAttribute(attr.name, attr.value);
    }
    
    return element;
}

function createBasketBlock(product) {
    const imgItem = createElement('img', 'basket_list__item_img', '', [{name: 'src', value: product.img}]);
    const nameItem = createElement('p', 'basket_list__item_name', product.name);
    const pricesBlock = createElement('div', 'basket_list__item_info');
    const currentPriceItem = createElement('span', 'basket_list__item_info_price', product.currentPrice);
    const oldPriceItem = createElement('del', '', product.oldPrice);
    const coutnItem = createElement('span', basletCountClass, `${product.count} шт.`);
    const basketBlock = createElement('li', 'basket_list__item', '', [{name: 'id', value: `product_${product.id}`}]);

    pricesBlock.appendChild(currentPriceItem);
    pricesBlock.appendChild(oldPriceItem);

    basketBlock.appendChild(imgItem);
    basketBlock.appendChild(nameItem);
    basketBlock.appendChild(coutnItem);
    basketBlock.appendChild(pricesBlock);

    basketList.appendChild(basketBlock);
}

function addItemToBasket(id) {
    let product = setProductInfo(id);
    
    let emptyBlock = document.querySelector(`.${basketEmptyClass}`);
    let basketItem = document.querySelector(`#product_${product.id}`);

    if (emptyBlock !== null) {
        emptyBlock.remove();
        showBtnBlock(true);
    }

    if (basketItem === null) {
        createBasketBlock(product);

    } else {
        setProductCount(basketItem, product.count);
    }
    getTotalSum();
}

function getTotalSum() {
    let total = 0;

    for(let product of products) {
        total += product.count * product.currentPrice.split(' ')[0];
    }

    basketTotal.innerText = `Итого: ${total.toFixed(2)}`;
}

function setProductCount(basketElement, count) {
    let element = basketElement.querySelector(`.${basletCountClass}`);
    
    element.innerText = count + `шт.`; 
}

function setProductInfo(id) {
    let parent = document.querySelector(`#cardProduct_${id}`);
    let key;

    for (let i in products) {
        if (id === products[i].id) {
            key = i;
            break;
        }
    }

    if (key === undefined) {
        products.push({
            img: parent.querySelector('img').getAttribute('src'),
            currentPrice: parent.querySelector('.goods-info__price_now').innerText,
            oldPrice: parent.querySelector('.goods-info__price_last').innerText,
            name: parent.querySelector('.goods-info__description').innerText,
            id: id,
            count: 1
        });

        key = -1;

    } else {
        products[key].count++;
    }

    setProduct();

    return products.slice(key)[0];
}

function showBasket() {
    let display = basketBlock.style.display;

    display === 'block' ? basketBlock.style.display = 'none' : basketBlock.style.display = 'block';
}

function setProduct() {
    localStorage.setItem('products', JSON.stringify(products));
}

function getProduct() {
    let result = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
    
    return result;
}

function showItemPreview(id) {
    let parent = document.querySelector(`#cardProduct_${id}`);
    let path = parent.querySelector('img').getAttribute('src');
    let img = document.querySelector('.overlay_popup__img');

    img.setAttribute('src', path);

    showPopup(true);
}

function showPopup(show) {
    show ? popupOverlay.style.display = 'block' : popupOverlay.style.display = 'none';
}

export { addItemToBasket, showItemPreview };