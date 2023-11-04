<template>
	<ClientOnly>
		<div class="card">
			<div class="card-body">
				<div v-if="errors.length > 0" class="alert alert-danger">
					<ul class="mb-0">
						<li v-for="(error, index) in errors" :key="index">{{ error }}</li>
					</ul>
				</div>
				<div class="form_container">
					<div class="mb-3">
						<label for="cellphone" class="form-label">شماره موبایل</label>
						<input
							v-model="cellphone"
							type="text"
							class="form-control"
							id="cellphone"
						/>
					</div>
					<button
						@click="login"
						:disabled="loading"
						type="submit"
						class="btn btn-primary btn-auth"
					>
						ورود / ثبت نام
						<div
							v-if="loading"
							class="spinner-border spinner-border-sm ms-2"
						></div>
					</button>
				</div>
			</div>
		</div>
		<template #fallback>
			<div class="text-center mt-5">
				<div class="spinner-border" style="width: 4rem; height: 4rem"></div>
			</div>
		</template>
	</ClientOnly>
</template>
<script setup>
import { useToast } from "vue-toastification";

const cellphone = ref(null);
const loading = ref(false);
const toast = useToast();
const errors = ref([]);
const emit = defineEmits(["showOtpForm"]);

if (process.client) {
	if (localStorage.getItem("otpSent")) {
		emit("showOtpForm");
	}
}
async function login() {
	if (cellphone.value === "" || cellphone.value === null) {
		toast.error("شمارتو وارد نکردی!");
		return;
	}
	try {
		loading.value = true;
		errors.value = [];
		await $fetch("/api/auth/login", {
			method: "POST",
			body: { cellphone: cellphone.value },
		});
		setOtpSentInLocalStorage();
		toast.success("الان کد تاییدتو میفرستم");
		emit("showOtpForm");
	} catch (error) {
		errors.value = Object.values(error.data.data.message).flat();
	} finally {
		loading.value = false;
	}
}

function setOtpSentInLocalStorage() {
	if (process.client) {
		localStorage.setItem("otpSent", true);
	}
}
</script>