<template>
	<ClientOnly>
		<template #fallback>
			<div
				class="d-flex justify-content-center"
				style="margin-top: 200px; margin-bottom: 200px"
			>
				<div class="spinner-border" style="width: 5rem; height: 5rem"></div>
			</div>
		</template>
		<section class="auth_section">
			<div class="container">
				<div class="row mt-5">
					<div class="col-md-5 offset-md-4">
						<div class="card">
							<div v-if="errors.length > 0" class="alert alert-danger">
								<ul class="mb-0">
									<li v-for="(error, index) in errors" :key="index">
										{{ error }}
									</li>
								</ul>
							</div>
							<div class="card-body">
								<div class="text-center mb-5">
									<div v-if="payment.status">
										<i class="bi bi-check-circle-fill text-success fs-1"></i>
										<h5 class="mt-3 text-success">
											پرداخت شما با موفقیت انجام شد
										</h5>
										<h6 class="mt-3">
											شماره پیگیری : <span>{{ payment.transId }}</span>
										</h6>
									</div>
									<div v-else>
										<i class="bi bi-x-circle-fill text-danger fs-1"></i>
										<h5 class="mt-3 text-danger">{{ payment.error }}</h5>
									</div>
								</div>
								<div class="d-flex justify-content-between">
									<NuxtLink
										v-if="payment.status"
										to="/profile/transactions"
										class="btn btn-primary"
										>مشاهده سفارش</NuxtLink
									>
									<NuxtLink v-else to="/cart" class="btn btn-primary"
										>سبد خرید</NuxtLink
									>
									<NuxtLink to="/" class="btn btn-dark"
										>بازگشت به سایت</NuxtLink
									>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</ClientOnly>
</template>
<script setup>
import { cartStore } from "../../store/cart";

const route = useRoute();
const {
	public: { apiBase },
} = useRuntimeConfig();
const payment = ref({});
const errors = ref([]);
const cart = cartStore();
if (process.client) {
	try {
		const data = await $fetch(`${apiBase}/payment/verify`, {
			method: "POST",
			body: { token: route.query.trackId, status: route.query.success },
		});
		payment.value = data.data;
		if (payment.value.status) {
			cart.clear();
		}
	} catch (error) {
		errors.value = Object.values(error.data.message).flat();
	}
}
</script>