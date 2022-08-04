const searchProduct = document.querySelector("#searchInput");

export function searchProducts(event) {
    let searchValue = event.target.value.toLowerCase();

    let productsValue = document.querySelectorAll(".product-info__name");

    for (let value of productsValue) {
        let productValue = value.textContent;
        if (productValue.toLowerCase().includes(searchValue)) {
            value.closest(".product-item").style.display = "";
        } else {
            value.closest(".product-item").style.display = "none";
        }
    }
}

searchProduct.addEventListener('input', searchProducts);
