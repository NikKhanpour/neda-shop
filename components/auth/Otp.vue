<template>
	<div class="card">
		<div class="card-body">
			<div v-if="errors.length > 0" class="alert alert-danger">
				<ul class="mb-0">
					<li v-for="(error, index) in errors" :key="index">{{ error }}</li>
				</ul>
			</div>
			<div class="form_container">
				<div class="mb-3">
					<label for="cellphone" class="form-label">کد تایید</label>
					<input
						v-model="code"
						type="text"
						class="form-control"
						id="cellphone"
					/>
				</div>
				<div class="d-flex justify-content-between">
					<button
						@click="checkOtp"
						:disabled="loading"
						type="submit"
						class="btn btn-primary btn-auth"
					>
						تایید
						<div
							v-if="loading"
							class="spinner-border spinner-border-sm ms-2"
						></div>
					</button>
					<AuthResendOtp />
				</div>
			</div>
		</div>
	</div>
	<div @click="changeNumber" class="mt-3 ms-2">شمارتو اشتباه زدی؟</div>
</template>
<script setup>
import { useToast } from "vue-toastification";

const { authUser } = useAuth();
const loading = ref(false);
const code = ref(null);
const toast = useToast();
const errors = ref([]);

async function checkOtp() {
	try {
		loading.value = true;
		const user = await $fetch("/api/auth/checkOtp", {
			method: "POST",
			body: { otp: code.value },
		});
		authUser.value = user;
		toast.success("خوش اومدی =)");
		if (process.client) {
			localStorage.removeItem("otpSent");
		}
		return navigateTo("/");
	} catch (error) {
		errors.value = Object.values(error.data.data.message).flat();
	} finally {
		loading.value = false;
	}
}

function changeNumber() {
	if (process.client) {
		localStorage.removeItem("otpSent");
		location.reload();
	}
}
</script>