import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';
const toast = useToast()
export const useCartStore = defineStore('cart', {
    state: () => {
        return {
            cart: []
        }
    },
    actions: {
        addToCart(product, qty) {
            this.cart.push({ ...product, qty })
            toast.success('محصول به سبد خرید اضافه شد')
        },
        remove(id) {
            this.cart = this.cart.filter(p => p.id != id)
        }
    },
    persist: {
        storage: persistedState.localStorage,
        key: 'shopping-cart'
    },
})