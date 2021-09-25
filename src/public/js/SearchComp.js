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

export default SearchComp;