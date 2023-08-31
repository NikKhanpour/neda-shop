<template>
	<div class="col-12 col-md-6">
		<div class="input-group mb-3">
			<input
				v-model="code"
				type="text"
				class="form-control"
				placeholder="کد تخفیف"
			/>
			<button
				@click="checkCoupon"
				:disabled="loading"
				class="input-group-text"
				id="basic-addon2"
			>
				اعمال کد تخفیف
				<div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
			</button>
		</div>
	</div>
</template>
<script setup>
import { useToast } from "vue-toastification";
const toast = useToast();
const code = ref("");
const loading = ref(false);

const props = defineProps(["coupon"]);

async function checkCoupon() {
	if (code.value === "" || code.value === null) {
		toast.warning("کد تخفیفی وارد نکردید");
		return;
	}
	try {
		loading.value = true;
		const data = await $fetch("/api/cart/checkCoupon", {
			method: "POST",
			body: { code: code.value },
		});
		toast.success("کد تخفیف اعمال شد");
		props.coupon.code = code.value;
		props.coupon.percent = data.percentage;
	} catch (error) {
		toast.error(Object.values(error.data.data.message).flat().toString());
	} finally {
		loading.value = false;
	}
}
</script>