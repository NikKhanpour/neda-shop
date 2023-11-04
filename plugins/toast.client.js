import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(Toast, {
        position: "top-center",
        toastClassName: "font-toast",
        bodyClassName: ['custom'],
        timeout: 4000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "",
        icon: true,
        rtl: true,
        transition: "Vue-Toastification__fade",
        maxToasts: 20,
        newestOnTop: true
    })
})