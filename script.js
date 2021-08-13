'use strict';
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
/**
 *  Класс каталога
 */
class GoodsList {
  /**
   * Получение ссылки на объект корзины
   * @param value
   */
  set cart(value) {
    this._cart = value;
  }

  /**
   * Получение ссылки на объект элемента каталога
   * @param value
   */
  set item(value) {
    this._item = value;
  }

  /**
   * отдача ссылки на каталог товаров
   * @returns {{id2: {img: string, balance: number, price: number, name: string, description: string}, id1: {img: string, balance: number, price: number, name: string, description: string}, id4: {img: string, balance: number, price: number, name: string, description: string}, id3: {img: string, balance: number, price: number, name: string, description: string}, id11: {img: string, balance: number, price: number, name: string, description: string}, id6: {img: string, balance: number, price: number, name: string, description: string}, id5: {img: string, balance: number, price: number, name: string, description: string}, id10: {img: string, balance: number, price: number, name: string, description: string}, id8: {img: string, balance: number, price: number, name: string, description: string}, id7: {img: string, balance: number, price: number, name: string, description: string}, id12: {img: string, balance: number, price: number, name: string, description: string}, id9: {img: string, balance: number, price: number, name: string, description: string}}}
   */
  get getCatalog() {
    return this._catalog;
  }

  _cart;
  _item;
  _catalog = {
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

  constructor () {
    this.goods = [];
    this.fetchGoods().then((data) => {
      this.goods = [...data];
      console.log(this.goods);
    });
  }

  /**
   *  * Функция демонстрирует работу с промисами. Получаемые данные в работе не используются, так как не совпадают с моей структурой данных.
   * Загружает набор товаров в каталоге с сервера
   * @returns {Promise<any>}
   */
  fetchGoods(){
    return fetch(`${API_URL}/catalogData.json`)
      .then(result => result.json())
      .catch(error => {
        console.log(error);
      })
  }

  /**
   * Добавляет товары в корзину.
   * @param {object} event событие клика
   */
  addItemToCart(event){
    this._cart.addItem(event.currentTarget.dataset.id);
    this._cart.updateTotalQuantityIcon();
  }

  /**
   * Отрисовывает товары в заданный элемент.
   * @param {string} selector имя селектора элемента, в который будут добавлятся товары
   */
  renderGoodsList(selector = '.fet-items'){
    let renderLink = document.querySelector(selector);
    for(let item in this._catalog){
      this._item._renderGoodsItem(renderLink, item, this._catalog[item]);
    }
    document.querySelectorAll('.fet-item__add-cart_btn').forEach(item => item.addEventListener('click',this.addItemToCart.bind(this)));
  }
}

/**
 * Класс корзины
 */
class Cart {
/**
 * Функция демонстрирует работу с промисами. Получаемые данные в работе не используются, так как не совпадают с моей структурой данных.
     * Загружает набор товаров в корзине с сервера
     * @returns {Promise<any | void>}
*/
  fetchGoods(){
    return fetch(`${API_URL}/getBasket.json`)
      .then(result => result.json())
      .catch(error => {
        console.log(error);
      })
  }


  /**
   * Получение ссылки на объект класса GoodList
   * @param {object} value ссылка на объект класса GoodList
   */
  set goodsList(value) {
    this._goodsList = value;
  }

  _goodsList;
  _items = {};
  _links = {
    cart: null,
    totalQuantityIcon : null,
    cartButton : null,
    cartClose : null,
    cartItems : null,
    totalPrice : null,
    emptyBalances : null
  };

  constructor() {
    this.goodsInBasketCurrent = [];
    this.fetchGoods().then((data) => {
      this.goodsInBasketCurrent = [...data['contents']];
      console.log(this.goodsInBasketCurrent);
    });

    this._links.cartButton = document.querySelector('.header__cart');
    this._links.totalQuantityIcon = this._links.cartButton.querySelector('.header__cart_circle');
    this._links.totalQuantityIcon.style.display = 'none';
    this._links.cart = document.querySelector('.cart');
    this._links.cartClose = this._links.cart.querySelector('.cart__btn_close');
    this._links.cartItems = this._links.cart.querySelector('.cart__items');
    this._links.totalPrice = this._links.cart.querySelector('.total-price_num');
    this._links.cartButton.addEventListener('click', this._showHide.bind(this));
    this._links.cartClose.addEventListener('click', this._showHide.bind(this));
  }

  /**
   * Добавляет товары в корзину.
   * @param {string} id идентификатор товара
   */
  addItem(id){
    fetch(`${API_URL}/addToBasket.json`)
      .then(response => response.json())
      .then(answer => {
        if(answer['result']){
          if(!this._items.hasOwnProperty(id)){
            this._items[id] = {name : '', img: '', price : 0, quantity : 1, balance : 0};
            this._items[id].name = this._goodsList.getCatalog[id].name;
            this._items[id].img = this._goodsList.getCatalog[id].img;
            this._items[id].price = this._goodsList.getCatalog[id].price;
            this._items[id].balance = this._goodsList.getCatalog[id].balance;
          } else {
            this._items[id].quantity += 1;
          }
          this.updateTotalQuantityIcon();
          console.log(id);
        }else {
          console.log("no server answer by addItem");
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  /**
   * Скрывает/показывает окно корзины.
   * @private
   */
  _showHide(){
    this._links.cart.style.display = this._links.cart.style.display === 'block' ? 'none' : 'block';
    if(this._links.cart.style.display === 'block'){
      this._renderCart();
    }
  }

  /**
   * Отрисовывает товары в корзине.
   * @private
   */
  _renderCart() {
    let markup = 'Корзина пуста';
    this._links.cartItems.innerHTML = markup;
    if(Object.keys(this._items).length > 0) {
      this._links.cartItems.innerHTML = '';
      for (let item in this._items) {
        markup = `<div class="cart__item" data-id="${item}">
                    <div class="cart__img_box"><img src="./img/${this._items[item].img}" alt="${this._items[item].img}"></div>
                    <div class="cart__info_box"><p class="cart__item_name">Title: ${this._items[item].name}</p>
                        <p class="cart__item_price">Price: ${this._items[item].price}</p>
                        <p class="cart__item_quantity">Quantity: ${this._items[item].quantity} <span data-id="${item}" class="cart__max-quantity">На складе больше нет.</span></p></div>
                    <div class="cart__btns"><button class="add-item" data-id="${item}">+</button>
                        <button  class="minus-item" data-id="${item}">-</button>
                        <button class="remove-item" data-id="${item}">X</button></div>
                    </div>`;
        this._links.cartItems.insertAdjacentHTML('beforeend', markup);
      }
      this._totalPrice();
      this._links.cartItems.querySelectorAll('.cart__max-quantity').forEach(emptyBalance => {
        emptyBalance.style.display = this._items[emptyBalance.dataset.id].balance === this._items[emptyBalance.dataset.id].quantity ? 'block' : 'none';
      });
      this._links.cartItems.querySelectorAll('.add-item').forEach(btn => btn.addEventListener('click', this._plusItem.bind(this)));
      this._links.cartItems.querySelectorAll('.minus-item').forEach(btn => btn.addEventListener('click', this._subtractItem.bind(this)));
      this._links.cartItems.querySelectorAll('.remove-item').forEach(btn => btn.addEventListener('click', this._removeItem.bind(this)));
    }
  }

  /**
   * Удаляет товар из корзины.
   * @param {object} event событие клика на кнопку
   * @private
   */
  _removeItem(event){
    fetch(`${API_URL}/deleteFromBasket.json`)
      .then(response => response.json())
      .then(answer => {
        if(answer['result']){
          delete this._items[event.target.dataset.id];
          this._renderCart();
          this._totalPrice();
          this.updateTotalQuantityIcon();
        }else {
          console.log("no server answer by removeItem");
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  /**
   * Убавляет количество товара в корзине.
   * @param {object} event событие клика на кнопку
   * @private
   */
  _subtractItem(event){
    this._items[event.target.dataset.id].quantity--;
    this._items[event.target.dataset.id].quantity < 1 ? this._removeItem(event) : this._renderCart();
  }

  /**
   * Добавляет количество товара в корзине.
   * @param {object} event событие клика на кнопку
   * @private
   */
  _plusItem(event){
    if(this._items[event.target.dataset.id].quantity < this._items[event.target.dataset.id].balance){
      this._items[event.target.dataset.id].quantity++;
    }
    this._renderCart();
  }

  /**
   * Рассчитывает и выводит общую стоимость.
   * @private
   */
  _totalPrice(){
    let totalPrice = 0;

    if(Object.keys(this._items).length > 0){
      for(let item in this._items){
      totalPrice += this._items[item].price * this._items[item].quantity;
    }}
    this._links.totalPrice.innerText = totalPrice;
  }

  /**
   * Обновляет значение количества товаров в корзине в иконке корзины в header.
   */
  updateTotalQuantityIcon(){
    this._links.totalQuantityIcon.style.display = Object.keys(this._items).length > 0 ? 'block' : 'none';
    this._links.totalQuantityIcon.innerText = Object.keys(this._items).length;
  }
}

class Item {

  /**
   * Отрисовывает карточку товара
   * @param {object} renderLink ссылка на элемент, в который будут добавлятся товары.
   * @param {string} idItem идентификатор товара
   * @param {object} item объект с данными о товаре
   * @private
   */
  _renderGoodsItem(renderLink, idItem, item){
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
}

window.addEventListener('load',() => {
  const item = new Item();
  const goodsList = new GoodsList();
  const cart = new Cart();
  cart.goodsList = goodsList;
  goodsList.item = item;
  goodsList.renderGoodsList();
  goodsList.cart = cart;
});