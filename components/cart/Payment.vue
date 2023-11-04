<template>
	<button
		@click="payment"
		:disabled="loading"
		class="user_option btn-auth mt-4"
	>
		پرداخت
		<div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
	</button>
</template>
<script setup>
import { useToast } from "vue-toastification";

const toast = useToast();

const props = defineProps(["cart", "coupon", "addressId"]);

const loading = ref(false);
async function payment() {
	try {
		loading.value = true;
		const data = await $fetch("/api/payment", {
			method: "POST",
			body: {
				cart: props.cart,
				coupon: props.coupon,
				address_id: props.addressId,
			},
		});
		return navigateTo(data.url, {
			external: true,
		});
	} catch (error) {
		if (
			Object.values(error.data.data.message).flat().toString() ==
			"فیلد شناسه آدرس الزامی است"
		) {
			toast.error("آدرس انتخاب نکردی...");
		} else {
			toast.error(Object.values(error.data.data.message).flat().toString());
			// console.log(error.data.data.message);
		}
	} finally {
		loading.value = false;
	}
}
</script>