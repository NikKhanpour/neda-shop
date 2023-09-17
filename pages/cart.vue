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
		<div v-if="itemsCount == 0" class="cart-empty">
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
		<template v-else>
			<section class="single_page_section layout_padding">
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
														<span v-if="item.is_sale"
															>{{ numberFormat(item.sale_price) }} تومان</span
														>
														<span v-else
															>{{ numberFormat(item.price) }} تومان</span
														>
														<span v-if="item.is_sale" class="text-danger"
															>{{
																salePercent(item.price, item.sale_price)
															}}%</span
														>
													</td>
													<td>
														<div class="input-counter">
															<span
																class="plus-btn"
																@click="
																	item.qty <= item.quantity &&
																		cart.increment(item.id)
																"
															>
																+
															</span>
															<div class="input-number">{{ item.qty }}</div>
															<span
																class="minus-btn"
																@click="item.qty > 1 && cart.decrement(item.id)"
															>
																-
															</span>
														</div>
													</td>
													<td>
														<span v-if="item.is_sale">{{
															numberFormat(item.sale_price * item.qty)
														}}</span>
														<span v-else>{{
															numberFormat(item.price * item.qty)
														}}</span>
														<span class="ms-1">تومان</span>
													</td>
													<td>
														<i
															@click="removeItem(item.id)"
															class="bi bi-x text-danger fw-bold fs-4 cursor-pointer"
														></i>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
									<button @click="cart.clear()" class="btn btn-primary mb-4">
										پاک کردن سبد خرید
									</button>
								</div>
							</div>
							<div class="row mt-4">
								<div class="col-12 col-md-6">
									<cartCoupon :coupon="coupon" />
								</div>
								<div
									class="col-12 col-md-6 d-flex justify-content-end align-items-baseline"
								>
									<cartAddress @set-address-id="(id) => (addressId = id)" />
								</div>
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
													<div>
														تخفیف :
														<span v-if="coupon.percent" class="text-danger ms-1"
															>{{ coupon.percent }}%</span
														>
													</div>
													<div class="text-danger">
														{{ numberFormat((total * coupon.percent) / 100) }}
														تومان
													</div>
												</li>
												<li
													class="list-group-item d-flex justify-content-between"
												>
													<div>قیمت پرداختی :</div>
													<div v-if="coupon.percent">
														{{
															numberFormat(
																total - (total * coupon.percent) / 100
															)
														}}
														تومان
													</div>
													<div v-else>{{ numberFormat(total) }} تومان</div>
												</li>
											</ul>
											<CartPayment
												:cart="items"
												:address-id="addressId"
												:coupon="coupon.code"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</template>
	</ClientOnly>
</template>
<script setup>
import { useToast } from "vue-toastification";
import { cartStore } from "../store/cart";

const toast = useToast();
const cart = cartStore();
const items = computed(() => cart.items);
const itemsCount = computed(() => cart.itemsCount);
const total = computed(() => cart.totalAmount);
const addressId = ref(null);
console.log(addressId.value);
const coupon = reactive({
	code: "",
	percent: "",
});

function removeItem(id) {
	cart.remove(id);
	toast.warning("آیتم از سبد خرید حذف شد");
}
</script>