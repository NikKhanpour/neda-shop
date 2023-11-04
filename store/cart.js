import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
const toast = useToast()
export const cartStore = defineStore('cartStore', {
    state: () => {
        return {
            cart: []
        }
    },
    getters: {
        count(state) {
            return state.cart.length
        },
        items(state) {
            return state.cart
        },
        total(state) {
            return state.cart.reduce((total, product) => {
                return product.is_sale ? total + (product.sale_price * product.qty) : total + (product.price * product.qty)
            }, 0)
        }
    },
    actions: {
        addToCart(product, qty) {
            if (product.quantity == 0) {
                toast.error('آیتم موجود نیست :,(')
                return
            }
            this.cart.push({ ...product, qty })
            toast.success('انداختی تو سبد خریدت :>')
        },
        remove(id) {
            this.cart = this.cart.filter(item => item.id != id)
        },
        increment(id) {
            const item = this.cart.find(p => p.id == id)
            if (item.qty < item.quantity) {
                item.qty++
            }
        },
        decrement(id) {
            const item = this.cart.find(p => p.id == id)
            if (item.qty > 1) {
                item.qty--
            }
        },
        clear() {
            this.cart = []
        }
    },
    persist: {
        storage: persistedState.localStorage,
    }
})