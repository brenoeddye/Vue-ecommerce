<script>
export default {
    data() {
        return {
            image: ''
        }
    },
    methods: {
        changeBackground() {
            this.image = '../assets/img/background/bg'+ Math.floor(Math.random() * 3) +'.jpg'
        }
    }
}
</script>

<template>
    <div class="dwall">
        <img src="../assets/img/background/bg1.jpg" alt="">
    </div>
</template>