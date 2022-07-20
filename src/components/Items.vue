<script>
import Icon from './Icons.vue'

export default {
    components: { Icon },
    props: {
        name: String,
        image: String,
        price: String,
        hasDiscount: Boolean,
        percent: String
    }
}
</script>

<template>
    <div class="item">
        <img :src="'src/assets/img/items/' + image + '.jpg'" alt="">
        <div class="infos">
            <div>
                <span class="title">{{ name }}</span>
                <div>
                    <span class="price">R$ {{ price }}</span>
                    <div class="badges">
                        <img src="../assets/img/xbox.jpg" />
                        <img src="../assets/img/sony.jpg" />
                        <img src="../assets/img/steam.jpg" />
                    </div>
                </div>
            </div>
            <div v-if="hasDiscount === true">
                <div class="percent">
                    {{ percent }} %
                </div>
            </div>
        </div>
        <div class="buttons">
            <button class="btn add"><Icon icon="cartPlus" /></button>
            <button class="btn buy">Comprar</button>
        </div>
    </div>
</template>