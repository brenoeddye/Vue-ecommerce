<script>
import { mapActions } from 'vuex'
import Icon from './Icons.vue'

export default {
    components: { Icon },
    props: {
        name: String,
        image: String,
        price: Number,
        percent: String
    },
    data() {
        return {
            inCart: false
        }
    },
    methods: {
        ...mapActions([
            'addProduct'
        ]),

        removeCart() {
            this.inCart = false
            this.$emit('remove')
        },

        addCart() {
            this.inCart = true
            this.$emit('add')
        }
    }
}
</script>

<template>
    <div class="item">
        <div v-if="inCart === true">
            <div class="inCart">No Carrinho</div>
        </div>
        <img :src="'../assets/items/'+ image +'.jpg'" alt="">
        <div class="infos">
            <div>
                <span class="title">{{ name }}</span>
                <div>
                    <span class="price">R$ {{ price }},00</span>
                    <div class="badges">
                        <img src="../assets/img/xbox.jpg" />
                        <img src="../assets/img/sony.jpg" />
                        <img src="../assets/img/steam.jpg" />
                    </div>
                </div>
            </div>
            <div v-if="percent > '0'">
                <div class="percent">
                    {{ percent }} %
                </div>
            </div>
        </div>
        <div class="buttons">
            <div v-if="inCart === true" >
                <button class="btn remove" @click="removeCart()"><Icon icon="remove" /></button>
            </div>
            <div v-else>
                <button class="btn add" @click="addCart()"><Icon icon="cartPlus" /></button>
            </div>
            <button class="btn buy">Comprar</button>
        </div>
    </div>
</template>