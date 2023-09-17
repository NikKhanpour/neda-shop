<template>
	<div class="input-group mb-3">
		<input
			v-model="props.coupon.code"
			type="text"
			class="form-control"
			placeholder="کد تخفیف"
		/>
		<button
			:disabled="loading"
			@click="checkCoupon"
			class="input-group-text"
			id="basic-addon2"
		>
			اعمال کد تخفیف
			<div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
		</button>
	</div>
</template>
<script setup>
import { useToast } from "vue-toastification";

const props = defineProps(["coupon"]);
const loading = ref(false);
const toast = useToast();
async function checkCoupon() {
	try {
		loading.value = true;
		const percent = await $fetch("/api/order/checkCoupon", {
			method: "POST",
			body: { code: props.coupon.code },
		});
		props.coupon.percent = percent;
		toast.success(`${props.coupon.percent}% تخفیف اعمال شد ;)`);
	} catch (error) {
		toast.error(Object.values(error.data.data.message).flat().toString());
	} finally {
		loading.value = false;
	}
}
</script>