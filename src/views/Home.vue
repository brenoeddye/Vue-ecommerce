<script>
import { mapGetters, mapActions } from 'vuex'
import Icon from '../components/Icons.vue'
import DynamicWall from '../components/DynamicWall.vue'
import Product from '../components/Items.vue'
import Items from '../components/Items.vue'

export default {
    components: { Icon, DynamicWall, Product, Items },
    data() {
        return {
            cart: false,
            count: 0
        }
    },
    computed: {
        ...mapGetters({
            products: 'getGames'
        })
    },
    methods: {
        ...mapActions([
            'addProduct'
        ]),

        closeCart() {
            return this.cart = false;
        },

        addItem() {
            this.count++
        },

        removeItem() {
            this.count--
        },
    },
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
                <Icon icon="user" class="Clk"/>
                <div class="cartSection">
                    <Icon icon="cart" @click="cart = !cart" class="Clk"/>
                    <div v-if="cart === true" class="cart">
                        <div class="title" v-click-outside="closeCart" >
                            <h3>Seu carrinho</h3>
                            <div>

                            </div>
                            <button class="btn goPay">Finalizar Compra</button>
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
                <Items :name="product.name" :image="product.image" :price="product.price" :percent="product.percent" />
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