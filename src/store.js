import { createStore } from 'vuex'

export default createStore({
  state: {
    games: [
        {
            name: 'Cyberpunk 2077',
            price: 79,
            image: 'src/assets/img/items/cyber.jpg',
            percent: '20'
        },
        {
            name: 'Red Dead Redemption 2',
            price: 209,
            image: 'src/assets/img/items/reddead.jpg',
            percent: '0'
        },
        {
            name: 'FIFA 22',
            price: 249,
            image: 'src/assets/img/items/fifa22.jpg',
            percent: '0'
        },
        {
            name: 'Rainbow Six Siege',
            price: 149,
            image: 'src/assets/img/items/r6.jpg',
            percent: '0'
        },
        {
            name: 'TES V: Skyrim',
            price: 79,
            image: 'src/assets/img/items/skyrim.jpg',
            percent: '60'
        },
        {
            name: 'Bomba Patch 22',
            price: 9,
            image: 'src/assets/img/items/bomba.jpg',
            percent: '0'
        }
    ],

    cartProducts: [],
    currentProduct: {}
  },

  mutations: {
    ADD_PRODUCT: (state, product) => {
        state.cartProducts.push(product);
    },
    REMOVE_PRODUCT: (state, index) => {
        state.cartProducts.splice(index, 1);
    },
    CURRENT_PRODUCT: (state, product) => {
        state.currentProduct = product;
    },
},

  actions: {
    addProduct: (context, product) => {
        context.commit('ADD_PRODUCT', product);
    },
    removeProduct: (context, index) => {
        context.commit('REMOVE_PRODUCT', index);
    },
    currentProduct: (context, product) => {
        context.commit('CURRENT_PRODUCT', product);
    },
},

  getters: {
    getGames: state => state.games,
    getCartProducts: state => state.cartProducts,
    getCurrentProduct: state => state.currentProduct
  }
})