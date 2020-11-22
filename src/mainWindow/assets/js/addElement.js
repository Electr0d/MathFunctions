function addElement(div, attributes, text, parent) {
  let element = document.createElement(div);
  let type = div == 'input' ? 'value' : 'textContent';
  for(let attribute in attributes) {
    element.setAttribute(attribute, attributes[attribute]);
  }
  element[type] = text;
  parent.appendChild(element);
  return element;
}