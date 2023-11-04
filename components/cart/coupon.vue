<template>
	<div class="col-12 col-md-6">
		<div class="input-group mb-3">
			<input
				v-model="code"
				type="text"
				class="form-control"
				placeholder="کد تخفیفت داری؟"
			/>
			<button
				@click="checkCoupon"
				:disabled="loading"
				class="input-group-text"
				id="basic-addon2"
			>
				چک کردن تخفیف
				<div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
			</button>
		</div>
	</div>
</template>
<script setup>
import { useToast } from "vue-toastification";

const props = defineProps(["coupon"]);
const toast = useToast();
const loading = ref(false);
const code = ref(null);

async function checkCoupon() {
	if (!code.value) {
		toast.error("کد تخفیفتو بزن");
		return;
	}
	try {
		loading.value = true;
		const percent = await $fetch("/api/cart/checkCoupon", {
			method: "POST",
			body: { code: code.value },
		});
		toast.success(`چک شد! ${percent.toString()}% تخفیف داری =)`);
		props.coupon.code = code.value;
		props.coupon.percent = percent;
	} catch (error) {
		if (
			Object.values(error.data.data.message).flat().toString() ==
			"کد تخفیف وارد شده وجود ندارد"
		) {
			toast.error("کد تخفیف یا اشتباهه یا مهلتش تموم شده :(");
		} else if (
			Object.values(error.data.data.message).flat().toString() ==
			"شما قبلا از این کد تخفیف استفاده کرده اید"
		) {
			toast.error("قبلا این تخفیفو گرفتی ^^");
		}
	} finally {
		loading.value = false;
	}
}
</script>