export {getProductsCards, Page};

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
