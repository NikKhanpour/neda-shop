import leaflet from 'leaflet/dist/leaflet'
import 'leaflet/dist/leaflet.css'
export default defineNuxtPlugin(nuxtApp => {
    return nuxtApp.provide('leaflet', leaflet)
})