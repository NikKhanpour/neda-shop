<template>
	<button @click="pay" :disabled="loading" class="user_option btn-auth mt-4">
		پرداخت
		<div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
	</button>
</template>
<script setup>
import { useToast } from "vue-toastification";

const props = defineProps(["addressId", "coupon", "cart"]);
const loading = ref(false);
const toast = useToast();

async function pay() {
	try {
		loading.value = true;
		const data = await $fetch("/api/order/pay", {
			method: "POST",
			body: {
				cart: props.cart,
				coupon: props.coupon,
				address_id: props.addressId,
			},
		});
		await navigateTo(data.url, {
			external: true,
		});
	} catch (error) {
		toast.error(Object.values(error.data.data.message).flat().toString());
	} finally {
		loading.value = false;
	}
}
</script>