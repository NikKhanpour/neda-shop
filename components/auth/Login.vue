<template>
	<div class="col-md-4 offset-md-4">
		<div class="card">
			<div class="card-body">
				<div class="form_container">
					<form @submit.prevent="login">
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
							:disabled="loading"
							type="submit"
							class="btn btn-primary btn-auth"
						>
							ورود
							<div
								v-if="loading"
								class="spinner-border spinner-border-sm ms-2"
							></div>
						</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import { useToast } from "vue-toastification";
const toast = useToast();
const emit = defineEmits(["showCheckOtpForm"]);
const loading = ref(false);
const cellphone = ref(null);
async function login() {
	if (cellphone.value === null) {
		toast.error("شماره موبایل الزامی است");
		return;
	}
	const pattern = /^(\+98|0)?9\d{9}$/;
	if (!pattern.test(cellphone.value)) {
		toast.error("فرمت شماره موبایل معتبر نیست");
		return;
	}

	try {
		const data = await $fetch("/api/auth/login", {
			method: "POST",
			body: { cellphone: cellphone.value },
		});
		toast.success("کد تایید ارسال شد");
		emit("showCheckOtpForm");
	} catch (error) {
		return error;
	}
}
</script>