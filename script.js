'use strict';

let catalog = {
  'id1': {name: "ELLERY X M'O CAPSULE 1", img: 'fi-1.png', price: 51, balance: 2, description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.'},
  'id8': {name: "ELLERY X M'O CAPSULE 8", img: 'fi-8.png', price: 52, balance: 3, description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.'},
  'id3': {name: "ELLERY X M'O CAPSULE 3", img: 'fi-3.png', price: 53, balance: 4, description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.'},
  'id4': {name: "ELLERY X M'O CAPSULE 4", img: 'fi-4.png', price: 54, balance: 5, description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.'},
  'id9': {name: "ELLERY X M'O CAPSULE 9", img: 'fi-9.png', price: 55, balance: 6, description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.'},
  'id11': {name: "ELLERY X M'O CAPSULE 11", img: 'fi-11.png', price: 56, balance: 7, description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.'},
  'id7': {name: "ELLERY X M'O CAPSULE 7", img: 'fi-7.png', price: 57, balance: 2, description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.'},
  'id2': {name: "ELLERY X M'O CAPSULE 2", img: 'fi-2.png', price: 58, balance: 3, description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.'},
  'id12': {name: "ELLERY X M'O CAPSULE 12", img: 'fi-12.png', price: 59, balance: 4, description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.'},
  'id5': {name: "ELLERY X M'O CAPSULE 5", img: 'fi-5.png', price: 60, balance: 5, description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.'},
  'id6': {name: "ELLERY X M'O CAPSULE 6", img: 'fi-6.png', price: 61, balance: 8, description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.'},
  'id10': {name: "ELLERY X M'O CAPSULE 10", img: 'fi-10.png', price: 62, balance: 3, description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.'},
};

/**
 * Рисует карточку товара
 * @param {object} renderLink ссылка на элемент в который будет помещаться карочка товара.
 * @param {string} idItem идентификатор товара
 * @param {object} item объект с данными о товаре
 */
function renderGoodsItem(renderLink, idItem, item){
  let markup = `<div class="fet-item" data-id="${idItem}">
                  <img src="img/${item.img}" alt="${item.img}" class="fet-item__images">
                  <div class="fet-item__info">
                      <h5 class="fet-item__name">${item.name}</h5>
                      <p class="fet-item__description">${item.description}</p>
                      <p class="fet-item__price">$ ${item.price}</p>
                  </div>
                  <div class="fet-item__add-cart_area">
                      <button class="_icon-cart fet-item__add-cart_btn" data-id="${idItem}"><span class="add-cart__text">Add to Cart</span></button>
                  </div>
              </div>`;
  renderLink.insertAdjacentHTML('beforeend', markup);
}

/**
 * Отрисовывает содержимое каталога
 * @param {string} selector селектор, указывающий на элемент, в который будут отрисовываться товары.
 */
function renderGoodsList(selector = '.fet-items'){
  let renderLink = document.querySelector(selector);
  for(let item in catalog){
    renderGoodsItem(renderLink, item, catalog[item]);
  }
}

window.addEventListener('load',() => {
  renderGoodsList();
});