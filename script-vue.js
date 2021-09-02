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
    apiUrl: 'http://localhost:3000',
    catalogRender: {},
    catalogOrigin: [],
    itemToSearch: '',
    cartItems: [],
  }),
  created(){
    this.fetchCatalog();
  },
  mounted(){

  },
  methods: {
    inToSearch(string){
      this.itemToSearch = string;
    },
    fetchCatalog(){
      fetch('http://localhost:3000/catalog', {mode: 'no-cors'})
        .then(response => response.json())
        .then(answer => {
          this.catalogRender = answer;
        });
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
      let data = this.reqConfig(this.catalogRender.filter(item => item.id === idItemAdd)[0]);
      fetch(`${this.apiUrl}/add`, data)
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
      let data = this.reqConfig(this.catalogRender.filter(item => item.id === idItemRm)[0]);
      fetch(`${this.apiUrl}/remove`, data)
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
      let data = this.reqConfig(this.catalogRender.filter(item => item.id === items.idItemRm)[0]);
      fetch(`${this.apiUrl}/subtract`, data)
        .then(response => response.json())
        .then(answer => {
          if(answer['result']){
          }else {
            console.log("no server answer by removeItem");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    reqConfig(data){
      return {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        //mode: 'no-cors', // no-cors, *cors, same-origin
        //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        //redirect: 'follow', // manual, *follow, error
        //referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify('!!!111!!!') // body data type must match "Content-Type" header
      }
    }
  },
  watch:{
    itemToSearch(){
      this.search();
    }
  },
}).mount('body');