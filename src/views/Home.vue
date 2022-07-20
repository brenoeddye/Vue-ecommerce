<script>
import Icon from '../components/Icons.vue'
import DynamicWall from '../components/DynamicWall.vue'
import Product from '../components/Items.vue'

export default {
    components: { Icon, DynamicWall, Product },
    data() {
        return {
            cart: false,
            count: 0
        }
    },
    methods: {
        closeCart() {
            return this.cart = false;
        },

        addItem() {
            this.count++
        },

        removeItem() {
            this.count--
        }
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
                <Icon icon="user" class="Clk"/>
                <div class="cartSection">
                    <Icon icon="cart" @click="cart = !cart" class="Clk"/>
                    <div v-if="cart === true" class="cart">
                        <div class="title" v-click-outside="closeCart" >
                            <h3>Seu carrinho</h3>

                            <button class="btn goPay">Finalizar Compra</button>
                        </div>
                    </div>
                    <div class="badge" v-if="count > 0">{{ count }}</div>
                </div>
            </div>
        </div>
    </div>
    <div class="container content">
        <Product name="Cyberpunk 2077" image="cyber" price="179,90" percent="20" hasDiscount @add="addItem()" @remove="removeItem()" />
        <Product name="Red Dead Redemption 2" image="reddead" price="209,90" percent="0" @add="addItem()" @remove="removeItem()" />
        <Product name="FIFA 22" image="fifa22" price="249,90" percent="0" @add="addItem()" @remove="removeItem()" />
        <Product name="Rainbow Six Siege" image="r6" price="149,90" percent="0" @add="addItem()" @remove="removeItem()" />
        <Product name="TES V: Skyrim" image="skyrim" price="79,90" percent="60" hasDiscount @add="addItem()" @remove="removeItem()" />
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