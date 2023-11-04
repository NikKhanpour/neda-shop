<template>
	<button @click="resendOtp" :disabled="!resendPermission" class="btn btn-dark">
		<span v-if="resendPermission"
			>ارسال دوباره
			<div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
		</span>
		<div v-else style="direction: ltr" class="justify-content-between">
			<vue-countdown
				:time="60 * 2 * 1000"
				v-slot="{ minutes, seconds }"
				:transform="transformSlotProps"
				@end="() => (resendPermission = true)"
			>
				{{ minutes }} : {{ seconds }}
			</vue-countdown>
		</div>
	</button>
</template>
<script setup>
import VueCountdown from "@chenfengyuan/vue-countdown";
import { useToast } from "vue-toastification";

const toast = useToast();
const loading = ref(false);
const resendPermission = ref(false);

async function resendOtp() {
	try {
		loading.value = true;
		await $fetch("/api/auth/resendOtp", {
			method: "POST",
			headers: useRequestHeaders(["cookie"]),
		});
		toast.success("دوباره برات فرستادم");
		resendPermission.value = false;
	} catch (error) {
		toast.error(Object.values(error.data.data.message).flat().toString());
	} finally {
		loading.value = false;
	}
}

function transformSlotProps(props) {
	const formattedProps = {};

	Object.entries(props).forEach(([key, value]) => {
		formattedProps[key] = value < 10 ? `0${value}` : String(value);
	});

	return formattedProps;
}
</script>