export {createElement, addElementClass, removeElementClass};


function createElement(tagName, className = "", contentHTML = "", attributes = []) {
    const element = document.createElement(tagName);

    if (className.length) {
        element.className = className;
    }

    if (contentHTML.length) {
        element.innerHTML = contentHTML;
    }

    for (let attribute of attributes) {
        element.setAttribute(attribute.name, attribute.value);
    }

    return element
}




// function createElementWithClass(tagName, className) {
//     const element = document.createElement(tagName);
//     element.className = className;
//
//     return element;
// }
//
// function createElementWithClassContent(tagName, className, contentHTML) {
//     const element = document.createElement(tagName);
//     element.className = className;
//     element.innerHTML = contentHTML;
//
//     return element;
// }
//
// function createElementWithClassAttributes(tagName, className, attributes = []) {
//     const element = document.createElement(tagName);
//     element.className = className;
//     for (let attribute of attributes) {
//         element.setAttribute(attribute.name, attribute.value);
//     }
//
//     return element;
// }
//
// function createElementWithClassContentAttributes(tagName, className, contentHTML, attributes = []) {
//     const element = document.createElement(tagName);
//     element.className = className;
//     element.innerHTML = contentHTML;
//     for (let attribute of attributes) {
//         element.setAttribute(attribute.name, attribute.value);
//     }
//
//     return element;
// }

function addElementClass(elementForClassAdd, className) {
    elementForClassAdd.classList.add(className);
}


function removeElementClass(elementForClassRemove, className) {
    elementForClassRemove.classList.remove(className);
}



