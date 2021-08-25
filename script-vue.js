'use strict';

const CartComp = {
  props: {
    catalogRender: Array,
    cartItems: Array,
  },
  data(){
    return {
      showHideCart: false,
    }
  },
  computed: {
    totalPrice(){
      let total = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
      return total === 0 ? 'Cart is empty' : total;
    },
    showTotalQuantityIcon(){
      return this.cartItems.length > 0;
    }
  },
  methods: {
    addItem(idItemAdd){
      this.$emit('adding', idItemAdd);
    },
    removeItem(idItemRm){
      this.$emit('removing', idItemRm);
    },
    subtractItem(item, idItemRm){
      this.$emit('subtracting', {item, idItemRm});
    },
  },
  template: `
    <div class="header__cart" @click="showHideCart = !showHideCart">
    <img src="img/cart.svg" alt="cart" class="header__cart_img">
    <span class="header__cart_circle" v-show="showTotalQuantityIcon">{{cartItems.length}}</span>
    </div>
    <div v-show="showHideCart" class="cart">
    <button class="cart__btn_close" @click="showHideCart = !showHideCart">X</button>
    <div class="cart__items">
      <div class="cart__item" v-for="(item,i) in cartItems" :key="item.id">
        <div class="cart__img_box"><img :src="'./img/'+item.img" :alt="item.img"></div>
        <div class="cart__info_box"><p class="cart__item_name">Title: {{item.name}}</p>
          <p class="cart__item_price">Price: $ {{item.price}}</p>
          <p class="cart__item_quantity">Quantity: {{item.quantity}}            
          </p></div>
        <div class="cart__btns">
          <button class="add-item" @click="addItem(item.id)">+</button>
          <button  class="minus-item" @click="subtractItem(item,i)">-</button>
          <button class="remove-item" @click="removeItem(i)">X</button></div>
      </div>
    </div>
    <p class="total-price">Total price: <span class="total-price_num">{{totalPrice}}</span></p>
    </div>
  `
}

const SearchComp = {
  data(){
    return {
      showHideSearch: false
    }
  },
  methods: {
      searching(e){
        this.$emit('searching', e.target.value.trim());
      }
  },
  template: `
    <button class="header__search _icon-search" @click="showHideSearch = !showHideSearch"></button>
    <label v-show="showHideSearch">
      <input type="text" class="search_items" @input="searching"></label>`
}

const ItemsCatalog = {
  props: {
    catalogRender: Array
  },
  methods: {
    addingItem(itemId){
      this.$emit('adding', itemId);
    }
  },
  template: `
    <div class="fet-item" v-for="item in this.catalogRender" :key="item.id">
      <img :src="'img/'+item.img" :alt="item.img" class="fet-item__images">
      <div class="fet-item__info">
        <h5 class="fet-item__name">{{item.name}}</h5>
        <p class="fet-item__description">{{item.description}}</p>
        <p class="fet-item__price">$ {{item.price}}</p>
      </div>
      <div class="fet-item__add-cart_area">
        <button class="_icon-cart fet-item__add-cart_btn" @click="addingItem(item.id)"><span class="add-cart__text">Add to Cart</span></button>
      </div>
    </div>
  `
}

Vue.createApp({
  components: {
    SearchComp,
    CartComp,
    ItemsCatalog
  },
  data: () => ({
    apiUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses',
    catalogRender: [
      {id: 'id1' ,name: "ELLERY X M'O CAPSULE 1", img: 'fi-1.png', price: 51, balance: 2, description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.'},
      {id: 'id8' ,name: "ELLERY X M'O CAPSULE 8", img: 'fi-8.png', price: 52, balance: 3, description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.'},
      {id: 'id3' ,name: "ELLERY X M'O CAPSULE 3", img: 'fi-3.png', price: 53, balance: 4, description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.'},
      {id: 'id4' ,name: "ELLERY X M'O CAPSULE 4", img: 'fi-4.png', price: 54, balance: 5, description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.'},
      {id: 'id9' ,name: "ELLERY X M'O CAPSULE 9", img: 'fi-9.png', price: 55, balance: 6, description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.'},
      {id: 'id11' ,name: "ELLERY X M'O CAPSULE 11", img: 'fi-11.png', price: 56, balance: 7, description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.'},
      {id: 'id7' ,name: "ELLERY X M'O CAPSULE 7", img: 'fi-7.png', price: 57, balance: 2, description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.'},
      {id: 'id2' ,name: "ELLERY X M'O CAPSULE 2", img: 'fi-2.png', price: 58, balance: 3, description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.'},
      {id: 'id12' ,name: "ELLERY X M'O CAPSULE 12", img: 'fi-12.png', price: 59, balance: 4, description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.'},
      {id: 'id5' ,name: "ELLERY X M'O CAPSULE 5", img: 'fi-5.png', price: 60, balance: 5, description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.'},
      {id: 'id6' ,name: "ELLERY X M'O CAPSULE 6", img: 'fi-6.png', price: 61, balance: 8, description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.'},
      {id: 'id10' ,name: "ELLERY X M'O CAPSULE 10", img: 'fi-10.png', price: 62, balance: 3, description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.'},
    ],
    catalogOrigin: [],
    itemToSearch: '',
    cartItems: []
  }),
  methods: {
    inToSearch(string){
      this.itemToSearch = string;
    },

    search() {
      if(this.catalogOrigin.length === 0){
        this.catalogOrigin = this.catalogRender.slice();
      }
      let regExp = new RegExp(this.itemToSearch,'ig');
      this.catalogRender.length = 0;
      this.catalogRender = this.catalogOrigin.filter(item => regExp.test(item.name));
      if(this.itemToSearch.length === 0){
        this.catalogRender = this.catalogOrigin.slice();
      }
    },
    addItem(idItemAdd){
      fetch(`${this.apiUrl}/addToBasket.json`)
        .then(response => response.json())
        .then(answer => {
          if(answer['result']){
            let itemAdded = this.catalogRender.filter(item => item.id === idItemAdd)[0];
            let itemInCart = this.cartItems.filter(item => item.id === idItemAdd);

            if(itemInCart.length === 0){
              itemAdded.quantity = 1;
              this.cartItems.push(itemAdded);
            } else {
              if(itemInCart[0].quantity < itemInCart[0].balance){
                itemInCart[0].quantity += 1;
              } else {
                alert('No more');
              }
            }
          }else {
            console.log("no server answer by addItem");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    removeItem(idItemRm){
      fetch(`${this.apiUrl}/deleteFromBasket.json`)
        .then(response => response.json())
        .then(answer => {
          if(answer['result']){
            this.cartItems.splice(idItemRm,1);
          }else {
            console.log("no server answer by removeItem");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    subtractItem(items){
      items.item.quantity--;
      if(items.item.quantity < 1){
        this.removeItem(items.idItemRm);
      }
    },
  },
  watch:{
    itemToSearch(){
      this.search();
    }
  },
}).mount('body');