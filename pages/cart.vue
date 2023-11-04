<template>
	<ClientOnly>
		<div v-if="cartCounter == 0" class="cart-empty">
			<div class="text-center">
				<div>
					<i class="bi bi-basket-fill" style="font-size: 80px"></i>
				</div>
				<h4 class="text-bold">سبد خرید شما خالی میباشد</h4>
				<NuxtLink to="/menu" class="btn btn-outline-dark mt-3"
					>مشاهده محصولات</NuxtLink
				>
			</div>
		</div>
		<section v-else class="single_page_section layout_padding">
			<div class="container">
				<div class="row">
					<div class="col-md-10 offset-md-1">
						<div class="row gy-5">
							<div class="col-12">
								<div class="table-responsive">
									<table class="table align-middle">
										<thead>
											<tr>
												<th>محصول</th>
												<th>نام</th>
												<th>قیمت</th>
												<th>تعداد</th>
												<th>قیمت کل</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="item in items" :key="item.id">
												<th>
													<img
														src="/images/preloader.png"
														v-img="item.primary_image"
														width="100"
													/>
												</th>
												<td class="fw-bold">{{ item.name }}</td>
												<td>
													<div v-if="item.is_sale">
														<span>{{ numberFormat(item.sale_price) }}</span>
														<span class="text-danger"
															>{{
																salePercent(item.price, item.sale_price)
															}}%</span
														>
													</div>
													<span v-else>{{ numberFormat(item.price) }}</span>
													<span class="ms-1">تومان</span>
												</td>
												<td>
													<div class="input-counter">
														<span
															@click="
																item.qty < item.quantity &&
																	cart.increment(item.id)
															"
															class="plus-btn"
														>
															+
														</span>
														<div class="input-number">{{ item.qty }}</div>
														<span
															@click="item.qty > 1 && cart.decrement(item.id)"
															class="minus-btn"
														>
															-
														</span>
													</div>
												</td>
												<td>
													<span>{{
														numberFormat(
															item.is_sale
																? item.sale_price * item.qty
																: item.price * item.qty
														)
													}}</span>
													<span class="ms-1">تومان</span>
												</td>
												<td>
													<i
														@click="cart.remove(item.id)"
														class="bi bi-x text-danger fw-bold fs-4 cursor-pointer"
													></i>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
								<button @click="cart.clear()" class="btn btn-primary mb-2 mt-4">
									پاک کردن سبد خرید
								</button>
							</div>
						</div>
						<div class="row mt-4">
							<CartCoupon :coupon="coupon" />
							<CartAddress @set-address-id="(id) => (addressId = id)" />
						</div>
						<div class="row justify-content-center mt-5">
							<div class="col-12 col-md-6">
								<div class="card">
									<div class="card-body p-4">
										<h5 class="card-title fw-bold">مجموع سبد خرید</h5>
										<ul class="list-group mt-4">
											<li
												class="list-group-item d-flex justify-content-between"
											>
												<div>مجموع قیمت :</div>
												<div>{{ numberFormat(total) }} تومان</div>
											</li>
											<li
												class="list-group-item d-flex justify-content-between"
											>
												<div class="text-danger">
													تخفیف :
													<span v-if="coupon.percent" class="text-danger ms-1"
														>{{ coupon.percent }}%</span
													>
												</div>
												<div v-if="coupon.percent" class="text-danger">
													{{ numberFormat((total * coupon.percent) / 100) }}
													تومان
												</div>
												<div v-else class="text-danger">کد تخفیف نزدی</div>
											</li>
											<li
												class="list-group-item d-flex justify-content-between"
											>
												<div>قیمت پرداختی :</div>
												<div>
													{{
														numberFormat(total - (total * coupon.percent) / 100)
													}}
													تومان
												</div>
											</li>
										</ul>
										<CartPayment
											:cart="items"
											:coupon="coupon.code"
											:addressId="addressId"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<template #fallback>
			<div
				class="d-flex justify-content-center"
				style="margin-top: 300px; margin-bottom: 400px"
			>
				<div class="spinner-border" style="width: 5rem; height: 5rem"></div>
			</div>
		</template>
	</ClientOnly>
</template>
<script setup>
import { computed } from "vue";
import { cartStore } from "../store/cart";

const cart = cartStore();
const items = computed(() => cart.items);
const cartCounter = computed(() => cart.count);
const total = computed(() => cart.total);
const addressId = ref(null);
const coupon = reactive({
	code: "",
	percent: 0,
});

definePageMeta({
	middleware: "auth",
});
</script>