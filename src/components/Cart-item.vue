<script>
import Icon from './Icons.vue'

export default {
    components: { Icon },
    props: {
        name: String,
        image: String,
        price: String,
        percent: String
    }
}
</script>

<template>
    <div class="miniItem">
        <img :src="image">
        <div class="desc">
            <span>{{ name }}</span>
            <span>R$ {{ price }},00</span>
        </div>
        <Icon icon="remove" @click="this.$emit('remove')"/>
    </div>
</template>