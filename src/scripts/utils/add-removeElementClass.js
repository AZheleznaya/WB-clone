export {addElementClass, removeElementClass};

function addElementClass(elementForClassAdd, className) {
    elementForClassAdd.classList.add(className);
}

function removeElementClass(elementForClassRemove, className) {
    elementForClassRemove.classList.remove(className);
}