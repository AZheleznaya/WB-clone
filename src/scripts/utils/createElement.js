export function createElement(tagName, className = "", contentHTML = "", attributes = []) {
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
