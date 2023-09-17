<template>
	<section class="auth_section book_section">
		<div class="container">
			<div class="row mt-5">
				<div class="col-md-4 offset-md-4">
					<div class="card">
						<div v-if="errors.length > 0" class="alert alert-danger">
							<ul class="mb-0">
								<li v-for="(error, index) in errors" :key="index">
									{{ error }}
								</li>
							</ul>
						</div>
						<div class="card-body">
							<div class="form_container">
								<form>
									<div class="mb-3">
										<label for="cellphone" class="form-label"
											>شماره موبایل</label
										>
										<input
											v-model="cellphone"
											type="text"
											class="form-control"
											id="cellphone"
										/>
									</div>
									<button
										:disabled="loading"
										@click="login"
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
			</div>
		</div>
	</section>
</template>
<script setup>
import { useToast } from "vue-toastification";

const cellphone = ref(null);
const loading = ref(false);
const errors = ref([]);
const toast = useToast();
const emit = defineEmits(["showOtpForm"]);
async function login() {
	if (cellphone.value === "" || cellphone.value === null) {
		toast.error("شماره خود را وارد کنید");
		return;
	}
	try {
		loading.value = true;
		errors.value = [];
		await $fetch("/api/auth/login", {
			method: "POST",
			body: { cellphone: cellphone.value },
		});
		toast.success("کد تایید ارسال شد");
		emit("showOtpForm");
	} catch (error) {
		errors.value = Object.values(error.data.data.message).flat();
	} finally {
		loading.value = false;
	}
}
</script>