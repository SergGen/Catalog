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

export default ItemsCatalog;