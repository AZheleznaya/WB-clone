 export function getProductCard(id) {
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