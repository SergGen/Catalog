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
    <img src="../img/cart.svg" alt="cart" class="header__cart_img">
    <span class="header__cart_circle" v-show="showTotalQuantityIcon">{{ cartItems.length }}</span>
    </div>
    <div v-if="showHideCart" class="cart">
    <button class="cart__btn_close" @click="showHideCart = !showHideCart">X</button>
    <div class="cart__items">
      <div class="cart__item" v-for="(item,i) in cartItems" :key="item.id">
        <div class="cart__img_box"><img :src="'./img/'+item.img" :alt="item.img"></div>
        <div class="cart__info_box"><p class="cart__item_name">Title: {{ item.name }}</p>
          <p class="cart__item_price">Price: $ {{ item.price }}</p>
          <p class="cart__item_quantity">Quantity: {{ item.quantity }}
          </p></div>
        <div class="cart__btns">
          <button class="add-item" @click="addItem(item.id)">+</button>
          <button class="minus-item" @click="subtractItem(item,i)">-</button>
          <button class="remove-item" @click="removeItem(i)">X</button>
        </div>
      </div>
    </div>
    <p class="total-price">Total price: <span class="total-price_num">{{ totalPrice }}</span></p>
    </div>
  `
}

export default CartComp;