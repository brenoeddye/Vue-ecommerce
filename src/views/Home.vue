<script>
import { mapGetters, mapActions } from 'vuex'
import Icon from '../components/Icons.vue'
import DynamicWall from '../components/DynamicWall.vue'
import Items from '../components/Items.vue'
import CartItem from '../components/Cart-item.vue';
import api from '../services/api'

export default {
    components: { Icon, DynamicWall, Items, CartItem },
    data() {
        return {
            cart: false,
            login: false,
            count: 0,
            form: {
                email: '',
                pass: ''
            },
            error: ''
        }
    },
    computed: {
        ...mapGetters({
            products: 'getGames',
            currentProduct: 'getCurrentProduct',
            getName: 'getName',
            isLogged: 'isLogged'
        }),
        ...mapGetters([
            'getCartProducts'
        ])
    },
    methods: {
        ...mapActions([
            'addProduct',
            'removeProduct'
        ]),

        hasProduct() {
            return this.getCartProducts.length > 0;
        },

        closeCart() {
            return this.cart = false;
        },

        closeLogin() {
            return this.login = false;
        },

        addItem(product) {
            this.count++
            this.addProduct(product)
        },

        removeItem(index) {
            this.count--
            if(this.count < 0)
                this.count = 0
            this.removeProduct(index)
        },

        totalPrice() {
            return this.getCartProducts.reduce((sum, i) => {
                return sum + i.price
            }, 0)
        },

        async getAuth(email, pass) {
            await api.get('/checkuser').then((res) => {
                const user = res?.data

                if(user.email == email && user.password == pass) {
                    this.getName = user.name
                    this.$store.commit('SET_NAME', user.name);
                    this.$store.commit('SET_USER', true);
                    this.isLogged = true
                } else this.error = '* Usuário não cadastrado ou senha errada!'
            })
        },

        checkForm() {
            if(this.form.email && this.form.pass) {
                this.error = ''
                return this.getAuth(this.form.email, this.form.pass)
            }

            if(!this.form.user || !this.form.pass)
                this.error = '* Preencha todos os campos!'
        },
    }
}
</script>

<template>
    <DynamicWall />
    <div class="header">
        <div class="container">
            <img class="logo" src="../assets/img/vue.png" />
            <ul>
                <li class="nav tag"><a href="#"><Icon icon="tag" />Destaques</a></li>
                <li class="nav desktop"><a href="#"><Icon icon="desktop" />PC</a></li>
                <li class="nav gamepad"><a href="#"><Icon icon="gamepad" />Consoles</a></li>
                <li class="nav mobile"><a href="#"><Icon icon="mobile" />Mobile</a></li>
                <li class="nav plus"><a href="#"><Icon icon="plus" />Mais</a></li>
            </ul>
            <div class="quick_access">
                
                <div class="loginSection">
                    <Icon icon="user" class="Clk" @click="login = !login"/>
                    <div v-if="login === true" class="login">
                        <div v-click-outside="closeLogin">
                            <div v-if="isLogged === false">
                                <h2>Entrar</h2>
                                <div class="error">
                                    <span>{{ error }}</span>
                                </div>
                                <div class="forms">
                                        <input type="email" placeholder="Digite seu email" v-model="form.email">
                                        <input type="password" placeholder="Digite sua senha" v-model="form.pass">
                                </div>

                                <button class="btn enter" @click="checkForm()">Entrar</button>
                            </div>
                            <div v-if="isLogged === true">
                                <h3>Olá, {{ getName }}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="cartSection">
                    <Icon icon="cart" @click="cart = !cart" class="Clk"/>
                    <div v-if="cart === true" class="cart">
                        <div class="title" v-click-outside="closeCart" >
                            <h3>Seu carrinho</h3>
                            <span v-if="!hasProduct()" class="emptyCart">Carrinho vazio! 😥</span>
                            <div v-for="(product, index) in getCartProducts" :key="index">
                                <CartItem :name="product.name" :image="product.image" :price="product.price" :percent="product.percent" @remove="removeItem(index)" />
                            </div>
                            <div class="total" v-if="hasProduct()">
                                <span>TOTAL:</span>
                                <span>R$ {{ totalPrice() }},00</span>
                            </div>
                            <router-link to="/checkout"><button class="btn goPay">Finalizar Compra</button></router-link>
                        </div>
                    </div>
                    <div class="badge" v-if="count > 0">{{ count }}</div>
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <ul class="content">
            <li v-for="(product, index) in products" :key="index">
                <Items :name="product.name" :image="product.image" :price="product.price" :percent="product.percent" @add="addItem(product)" @remove="removeItem(product)"/>
            </li>
        </ul>
    </div>
    <footer>
        <div class="support_links">
            <ul>
                <li><a href="#">Lorem Ipsum</a></li>
                <li><a href="#">Lorem Ipsum</a></li>
                <li><a href="#">Lorem Ipsum</a></li>
                <li><a href="#">Lorem Ipsum</a></li>
                <li><a href="#">Lorem Ipsum</a></li>
            </ul>
            <ul>
                <li><a href="#">Lorem Ipsum</a></li>
                <li><a href="#">Lorem Ipsum</a></li>
                <li><a href="#">Lorem Ipsum</a></li>
                <li><a href="#">Lorem Ipsum</a></li>
                <li><a href="#">Lorem Ipsum</a></li>
            </ul>
            <ul>
                <li><a href="#">Lorem Ipsum</a></li>
                <li><a href="#">Lorem Ipsum</a></li>
                <li><a href="#">Lorem Ipsum</a></li>
                <li><a href="#">Lorem Ipsum</a></li>
                <li><a href="#">Lorem Ipsum</a></li>
            </ul>
        </div>
        <p>Desenvolvido com 💜 por <a href="http://www.brenopereira.com"><b>Breno Pereira</b></a></p>
    </footer>
</template>