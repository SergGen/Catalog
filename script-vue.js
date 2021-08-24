'use strict';
Vue.createApp({
  data: () => ({
    API_URL: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses',
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
    showHide: {
      search: false,
      cart: false,
      cartQuantity: false
    },
    itemToSearch: '',
    cartItems: []
  }),
  computed: {
    totalPrice(){
      let total = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
      if(total === 0) {
        total = 'Cart is empty';
      }
      return total;
    }
  },
  methods: {
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
      fetch(`${this.API_URL}/addToBasket.json`)
        .then(response => response.json())
        .then(answer => {
          if(answer['result']){
            let itemAdded = this.catalogRender.filter(item => item.id === idItemAdd)[0];
            let itemInCart = this.cartItems.filter(item => item.id === idItemAdd);

            if(itemInCart.length === 0){
              itemAdded.quantity = 1;
              this.cartItems.push(itemAdded);
              this.showTotalQuantityIcon();
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
    removeItem(item, idItemRm){
      fetch(`${this.API_URL}/deleteFromBasket.json`)
        .then(response => response.json())
        .then(answer => {
          if(answer['result']){
            this.cartItems.splice(idItemRm,1);
            this.showTotalQuantityIcon();
          }else {
            console.log("no server answer by removeItem");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    subtractItem(item, idItemRm){
      item.quantity--;
      if(item.quantity < 1){
        this.removeItem(item, idItemRm);
      }
    },
    showTotalQuantityIcon(){
      this.showHide.cartQuantity = this.cartItems.length > 0;
    }
  },
  watch:{
    itemToSearch(){
      this.search();
    }
  }
}).mount('body');