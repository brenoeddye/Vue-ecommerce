<script>
import DynamicWall from '../components/DynamicWall.vue'
import Icon from '../components/Icons.vue'
import Icons from '../components/Icons.vue'

export default {
    components: { DynamicWall, Icon, Icons },
    props: {
        cart: Array,
        total: String
    },
    data() {
        return {
            error: '',
            form: {
                email: '',
                pass: ''
            },
            isLogged: false
        }
    },
    methods: {
        async getAuth(email, pass) {
            console.log(email, pass)
            await api.get('/checkuser').then((res) => {
                const user = res?.data

                if(user.email == email && user.password == pass) {
                    this.user.name = user.name
                    this.isLogged = true
                    console.log(this.isLogged)
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
        }
    }
}
</script>

<template>
    <DynamicWall />
    <div class="container-mx checkout">
        <div class="right">
            <div class="board">
                <div>
                    <h2><Icon icon="cart" />Seu carrinho</h2>
                </div>
                <div class="userCart">

                </div>
            </div>
            <div>
                <div class="board">
                    <div>
                        <h2><Icon icon="data" />Dados</h2>
                    </div>
                    <div>
                        <div v-if="isLogged === true" class="userData">

                        </div>
                        <div v-if="isLogged === false" class="userData">
                            <h3>Você precisa logar para concluir a compra:</h3>

                            <span>{{ error }}</span>

                            <input type="text" placeholder="Digite seu email" v-model="form.email">
                            <input type="text" placeholder="Digite sua senha" v-model="form.pass">

                            <button class="btn enter" @click="checkForm()">Entrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="sidebar">
            <div>
                <h2><Icon icon="payment" />Pagamento</h2>
            </div>

            <div class="total">
                <span>Valor:</span>
                <span>R${{ total }},00</span>
            </div>

            <div class="payment_inpts">
                <label class="selection">
                    <div>
                        <Icons icon="pix" />PIX
                    </div>
                    <input type="radio" name="radio">
                </label>
                <label class="selection">
                    <div>
                        <Icons icon="boleto" />Boleto
                    </div>
                    <input type="radio" name="radio">
                </label>

                <button class="btn goPay">Finalizar Pedido</button>
            </div>
        </div>
    </div>
</template>