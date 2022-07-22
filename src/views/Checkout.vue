<script>
import { mapGetters, mapActions } from 'vuex'
import DynamicWall from '../components/DynamicWall.vue'
import Icon from '../components/Icons.vue'
import CartItem from '../components/Cart-item.vue'
import api from '../services/api'
import Order from '../components/Order.vue'

export default {
    components: { DynamicWall, Icon, CartItem, Order },
    data() {
        return {
            err: null,
            form: {
                email: '',
                pass: ''
            },
            address: {
                address: '',
                number: '',
                distric: '',
                cep: '',
                city: '',
                state: ''
            },
            addresses: [],
            checkers: {
                shipTo: null,
                shipBy: null,
                payment: null
            },
            checkout: false
        }
    },
    computed: {
        ...mapGetters({
            getName: 'getName',
            isLogged: 'isLogged'
        }),
        ...mapGetters([
            'getCartProducts',
        ]),
    },
    methods: {
        ...mapActions([
            'removeProduct'
        ]),

        totalPrice() {
            return this.getCartProducts.reduce((sum, i) => {
                return sum + i.price
            }, 0)
        },

        closeOrder() {
            this.checkout = false
            this.$router.push('/')
        },

        hasProduct() {
            return this.getCartProducts.length > 0;
        },

        removeItem(index) {
            this.count--
            if(this.count < 0)
                this.count = 0
            this.removeProduct(index)
        },

        addAddress(address, number, cep, distric, state, city) {
            if(!address || !number || !cep || !distric || !state || !city)
                return this.showError('Preencha todos os campos!')

            this.addresses.push({
                address: address,
                number: number,
                cep: cep,
                distric: distric,
                state: state,
                city: city
            })
        },

        async getAuth(email, pass) {
            await api.get('/checkuser').then((res) => {
                const user = res?.data
                if(user.email == email && user.password == pass) {
                    this.getName = user.name
                    this.$store.commit('SET_NAME', user.name);
                    this.$store.commit('SET_USER', true);
                    this.isLogged = true
                } else this.showError('Usuário não cadastrado ou senha errada!')
            })
        },

        async getAddress() {
            await api.get('/address').then((res) => {
                const data = res?.data
                this.addAddress(data.address, data.number, data.cep, data.distric, data.state, data.city)
            })
        },

        checkForm() {
            if(!this.form.email || !this.form.pass)
                return this.showError('Preencha todos os campos!')

            if(this.form.email && this.form.pass)
                return this.getAuth(this.form.email, this.form.pass)
        },

        createOrder() {
            if(this.isLogged === false)
                return this.showError('Você deve logar primeiro!')

            if(this.getCartProducts.length <= 0)
                return this.showError('Carrinho vazio!')

            console.log(this.checkers.shipTo, this.checkers.shipBy, this.checkers.payment)

            if(this.checkers.shipTo === null && this.checkers.shipBy === null && this.checkers.payment === null)
                return this.showError('Pagamento, entrega ou frete inválidos!')

            else this.checkout = true
        },

        showError(err) {
            this.err = err
            setTimeout(() => {
                this.err = null
            }, 5000)
        }
    },
    created() {
        this.getAddress()
    }
}
</script>

<template>
    <DynamicWall />
    <div class="advError" v-if="err !== null">
        <Icon class="advRemove" icon="remove"/>
        <span>{{ err }}</span>
    </div>
    <div class="container-mx checkout">
        <div class="right">
            <div class="board">
                <div class="title">
                    <h2><Icon icon="cart" class="b-icon"/>Seu carrinho</h2>
                    <router-link to="/" class="btn buy">Cancelar</router-link>
                </div>
                <div class="userCart">
                    <span v-if="!hasProduct()" class="emptyCart">Carrinho vazio! 😥</span>
                    <div v-for="(product, index) in getCartProducts" :key="index">
                        <CartItem :name="product.name" :image="product.image" :price="product.price" :percent="product.percent" @remove="removeItem(index)" />
                    </div>
                </div>
            </div>
            <div>
                <div class="board">
                    <div>
                        <h2><Icon icon="data" class="b-icon" />Endereço</h2>
                    </div>
                    <div>
                        <div v-if="isLogged === true" class="userData">
                        <div v-for="(current, index) in addresses" :key="index">
                            <label class="addr">
                                <input type="radio" name="add" :value="[current.address, current.number, current.distric, current.cep, current.city, current.state]" v-model="checkers.shipTo">
                                <span>{{ current.address }}, {{ current.number }}, {{ current.distric }} - {{ current.cep }} - {{ current.city }}, {{ current.state }}</span>
                                <button class="close" @click="addresses.splice(index, 1)"><Icon icon="remove"/></button>
                            </label>
                        </div>
                            
                            <h3>Preencha os dados de entrega:</h3>
                                <div>
                                    <input type="text" placeholder="Endereço" class="add_inpt address" v-model="address.address">
                                    <input type="text" placeholder="Número" class="add_inpt number" v-model="address.number">
                                </div>
                                <div>
                                    <input type="text" placeholder="CEP" class="add_inpt cep" v-model="address.cep">
                                    <input type="text" placeholder="Bairro" class="add_inpt distric" v-model="address.distric">
                                    <input type="text" placeholder="UF" class="add_inpt state" v-model="address.state">
                                    <input type="text" placeholder="Cidade" class="add_inpt city" v-model="address.city">
                                </div>
                                <button class="btn enter addButton" @click="addAddress(address.address, address.number, address.cep, address.distric, address.state, address.city)">Adicionar Endereço</button>
                            </div>
                        <div v-if="isLogged === false" class="userData">
                            <h3>Você precisa logar para concluir a compra:</h3>

                            <input type="text" placeholder="Digite seu email" class="add_inpt" v-model="form.email">
                            <input type="password" placeholder="Digite sua senha" class="add_inpt" v-model="form.pass">

                            <button class="btn enter addButton" @click="checkForm()">Entrar</button>
                        </div>
                    </div>
                </div>

                <div class="board" v-if="isLogged === true">
                    <div>
                        <h2><Icon icon="shipping" class="b-icon"/>Frete</h2>
                    </div>
                    <div class="shipping_opt">
                        <label class="_opt">
                            <div>
                                <Icon icon="box" class="b-icon"/>
                                <span>PAC</span>
                            </div>
                            <div>
                                <span class="estimated">13 dias úteis!</span>
                                <input type="radio" value="PAC" name="ship" v-model="checkers.shipBy">
                            </div>
                        </label>
                        <label class="_opt">
                            <div>
                                <Icon icon="shipping" class="b-icon"/>
                                <span>Sedex</span>
                            </div>
                            <div>
                                <span class="estimated faster">5 dias úteis!</span>
                                <input type="radio" value="Sedex" name="ship" v-model="checkers.shipBy">
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div class="sidebar">
            <div>
                <h2><Icon icon="payment" class="b-icon" />Pagamento</h2>
            </div>

            <div class="total">
                <span>Valor:</span>
                <span>R${{ totalPrice() }},00</span>
            </div>

            <div class="payment_inpts">
                <label class="selection">
                    <div>
                        <Icon icon="pix" />PIX
                    </div>
                    <input type="radio" name="radio" value="PIX" v-model="checkers.payment">
                </label>
                <label class="selection">
                    <div>
                        <Icon icon="boleto" />Boleto
                    </div>
                    <input type="radio" name="radio" value="Boleto" v-model="checkers.payment">
                </label>

                <button class="btn goPay" @click="createOrder()">Finalizar Pedido</button>
            </div>
        </div>
    </div>
    <div v-if="checkout === true">
        <Order @close="closeOrder"/>
    </div>
</template>