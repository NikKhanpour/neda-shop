<template>
	<ClientOnly>
		<button
			@click="resend"
			style="direction: ltr"
			:disabled="!showBotton"
			class="btn btn-dark ms-auto"
		>
			<span v-if="showBotton" style="direction: rtl"
				>ارسال دوباره
				<div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
			</span>
			<vue-countdown
				v-else
				:time="2 * 60 * 1000"
				v-slot="{ minutes, seconds }"
				:transform="transformSlotProps"
				@end="onCountdownEnd"
			>
				{{ minutes }} : {{ seconds }}
			</vue-countdown>
		</button>
	</ClientOnly>
</template>
<script setup>
import VueCountdown from "@chenfengyuan/vue-countdown";
import { useToast } from "vue-toastification";
const showBotton = ref(false);
const loading = ref(false);
const toast = useToast();

async function resend() {
	try {
		loading.value = true;
		await $fetch("/api/auth/resendOtp", {
			method: "POST",
		});
		toast.success("کد تایید ارسال شد");
		showBotton.value = false;
	} catch (error) {
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
function onCountdownEnd() {
	showBotton.value = true;
}
</script>