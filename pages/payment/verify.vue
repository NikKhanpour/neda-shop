<template>
	<ClientOnly>
		<template #fallback>
			<div
				class="d-flex justify-content-center"
				style="margin-top: 100px; margin-bottom: 550px"
			>
				<div class="spinner-border" style="height: 5rem; width: 5rem"></div>
			</div>
		</template>
		<section class="auth_section">
			<div class="container">
				<div class="row mt-5">
					<div class="col-md-5 offset-md-4">
						<div class="card">
							<div class="card-body">
								<div class="text-center mb-5">
									<div v-if="payment.status">
										<i class="bi bi-check-circle-fill text-success fs-1"></i>
										<h5 class="mt-3 text-success">
											سفارش ثبت شد و رفت واسه ارسال.. ^^
										</h5>
										<h6 class="mt-3">
											شماره پیگیری : <span>{{ payment.transId }}</span>
										</h6>
									</div>
									<div v-else>
										<i class="bi bi-x-circle-fill text-danger fs-1"></i>
										<h5 class="mt-3 text-danger">
											{{ payment.error }}
										</h5>
									</div>
								</div>
								<div class="d-flex justify-content-between">
									<NuxtLink
										v-if="payment.status"
										to="/profile/orders"
										class="btn btn-primary"
										>جزییات سفارش</NuxtLink
									>
									<NuxtLink v-else to="/cart" class="btn btn-primary"
										>سبد خرید</NuxtLink
									>
									<NuxtLink to="/" class="btn btn-dark">خونه</NuxtLink>
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

const {
	public: { apiBase },
} = useRuntimeConfig();
const route = useRoute();
const payment = ref({});
const cart = cartStore();
if (process.client) {
	try {
		const data = await $fetch(`${apiBase}/payment/verify`, {
			method: "POST",
			body: { token: route.query.trackId, status: route.query.trackId },
		});
		payment.value = data.data;
		if (payment.value.status) {
			cart.clear();
		}
	} catch (error) {
		console.log(error);
	}
}
</script>