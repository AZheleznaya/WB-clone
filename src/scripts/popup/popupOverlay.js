export {showItemPreview};
import {addElementClass, removeElementClass} from "../utils/add-removeElementClass.js";

const popupOverlay = document.querySelector(".overlay");

popupOverlay.addEventListener('click', (e) => {
    e.stopPropagation();
    e.stopImmediatePropagation();
    removeElementClass(popupOverlay, "active");
})

function showItemPreview(id) {
    let parent = document.querySelector(`#cardProduct_${id}`);
    let path = parent.querySelector("img").getAttribute("src");
    let image = document.querySelector(".overlay__popup_image");

    image.setAttribute("src", path);

    addElementClass(popupOverlay, "active")
}

