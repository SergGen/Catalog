import CartComp from './CartComp'
import SearchComp from './SearchComp'
import ItemsCatalog from './ItemsCatalog'

const app = {
//Vue.createApp({
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
  created () {
    this.fetchCatalog();
    this.fetchCart();
  },
  mounted () {

  },
  methods: {
    inToSearch (string) {
      this.itemToSearch = string;
    },
    fetchCatalog () {
      fetch('http://localhost:3000/catalog', { mode: 'no-cors' })
        .then(response => response.json())
        .then(answer => {
          this.catalogRender = answer;
        });
    },
    fetchCart () {
      fetch('http://localhost:3000/get-cart', { mode: 'no-cors' })
        .then(response => response.json())
        .then(answer => {
          if (!answer.empty) {
            this.cartItems = answer;
          }
        });
    },
    serverCartUpdate (action) {
      let data = this.reqConfig(this.cartItems);
      fetch(`${this.apiUrl}/${action}`, data)
        .then(response => response.json())
        .then(answer => {
          if (!answer['result']) {
            console.log("no server answer by addItem");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    search () {
      if (this.catalogOrigin.length === 0) {
        this.catalogOrigin = this.catalogRender.slice();
      }
      let regExp = new RegExp(this.itemToSearch, 'ig');
      this.catalogRender.length = 0;
      this.catalogRender = this.catalogOrigin.filter(item => regExp.test(item.name));
      if (this.itemToSearch.length === 0) {
        this.catalogRender = this.catalogOrigin.slice();
      }
    },
    addItem (idItemAdd) {
      let itemAdded = this.catalogRender.filter(item => item.id === idItemAdd)[0];
      let itemInCart = this.cartItems.filter(item => item.id === idItemAdd);

      if (itemInCart.length === 0) {
        itemAdded.quantity = 1;
        this.cartItems.push(itemAdded);
        this.serverCartUpdate('add');
      } else {
        if (itemInCart[0].quantity < itemInCart[0].balance) {
          itemInCart[0].quantity += 1;
          this.serverCartUpdate('add');
        } else {
          alert('No more');
        }
      }
    },
    removeItem (idItemRm) {
      this.cartItems.splice(idItemRm, 1);
      this.serverCartUpdate('remove');
    },

    subtractItem (items) {
      items.item.quantity--;
      if (items.item.quantity < 1) {
        this.removeItem(items.idItemRm);
      } else {
        this.serverCartUpdate('subtract');
      }
    },
    reqConfig (data) {
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
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      }
    }
  },
  watch: {
    itemToSearch () {
      this.search();
    }
  }
}
//}).mount('#app');
export default app;