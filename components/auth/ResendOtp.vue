<template>
	<button class="btn btn-dark" @click="resend" :disabled="!showButton">
		<div v-if="!showButton">
			<vue-countdown
				style="direction: ltr"
				:time="2 * 60 * 1000"
				:transform="transformSlotProps"
				v-slot="{ minutes, seconds }"
				@end="onCountdownEnd"
			>
				{{ minutes }}:{{ seconds }}
			</vue-countdown>
		</div>
		<span v-else>
			ارسال دوباره
			<div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
		</span>
	</button>
</template>
<script setup>
import VueCountdown from "@chenfengyuan/vue-countdown";
import { useToast } from "vue-toastification";

const showButton = ref(false);
const loading = ref(false);
const toast = useToast();

async function resend() {
	try {
		loading.value = true;
		await $fetch("/api/auth/resendOtp", {
			method: "POST",
		});
		toast.success("کد تایید ارسال شد");
		showButton.value = false;
	} catch (error) {
		console.log(error.data.data.message);
	} finally {
		loading.value = false;
	}
}

function onCountdownEnd() {
	showButton.value = true;
}

function transformSlotProps(props) {
	const formattedProps = {};

	Object.entries(props).forEach(([key, value]) => {
		formattedProps[key] = value < 10 ? `0${value}` : String(value);
	});

	return formattedProps;
}
</script>