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
								<div class="mb-3">
									<label for="cellphone" class="form-label">کد تایید</label>
									<input
										v-model="otp"
										type="text"
										class="form-control"
										id="cellphone"
									/>
								</div>
								<div class="d-flex justify-content-between">
									<button
										:disabled="loading"
										@click="checkOtp"
										type="submit"
										class="btn btn-primary btn-auth"
									>
										ورود
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
				</div>
			</div>
		</div>
	</section>
</template>
<script setup>
import { useToast } from "vue-toastification";

const otp = ref(null);
const loading = ref(false);
const errors = ref([]);
const toast = useToast();
const authUser = useAuth();

async function checkOtp() {
	if (otp.value === "" || otp.value === null) {
		toast.error("کد تایید را وارد کنید");
		return;
	}
	try {
		loading.value = true;
		errors.value = [];
		const user = await $fetch("/api/auth/checkOtp", {
			method: "POST",
			body: { otp: otp.value },
		});
		toast.success("با موفقیت وارد شدید");
		authUser.value = user;
		return navigateTo("/");
	} catch (error) {
		errors.value = Object.values(error.data.data.message).flat();
	} finally {
		loading.value = false;
	}
}
</script>