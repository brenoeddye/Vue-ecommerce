import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {
        name: '',
        login: null
    },
    games: [
        {
            name: 'Cyberpunk 2077',
            price: 79,
            image: 'cyber',
            percent: '20'
        },
        {
            name: 'Red Dead Redemption 2',
            price: 209,
            image: 'reddead',
            percent: '0'
        },
        {
            name: 'FIFA 22',
            price: 249,
            image: 'fifa22',
            percent: '0'
        },
        {
            name: 'Rainbow Six Siege',
            price: 149,
            image: 'r6',
            percent: '0'
        },
        {
            name: 'TES V: Skyrim',
            price: 79,
            image: 'skyrim',
            percent: '60'
        },
        {
            name: 'Bomba Patch 22',
            price: 9,
            image: 'bomba',
            percent: '0'
        }
    ],

    cartProducts: [],
    currentProduct: {}
  },

  mutations: {
    ADD_PRODUCT: (state, product) => {
        state.cartProducts.push(product)
    },
    REMOVE_PRODUCT: (state, index) => {
        state.cartProducts.splice(index, 1);
    },
    CURRENT_PRODUCT: (state, product) => {
        state.currentProduct = product
    },
    SET_NAME: (state, name) => {
        state.user.name = name
    },
    SET_USER: (state, user) => {
        state.user.login = user
    }
},

  actions: {
    addProduct: (context, product) => {
        context.commit('ADD_PRODUCT', product)
    },
    removeProduct: (context, index) => {
        context.commit('REMOVE_PRODUCT', index)
    },
    currentProduct: (context, product) => {
        context.commit('CURRENT_PRODUCT', product)
    }
},

  getters: {
    getGames: state => state.games,
    getCartProducts: state => state.cartProducts,
    getCurrentProduct: state => state.currentProduct,
    getName: state => state.user.name,
    isLogged: state => state.user.login !== null
  }
})