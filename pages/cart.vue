<template>
	<ClientOnly>
		<section
			v-if="cartItemsCounter > 0"
			class="single_page_section layout_padding"
		>
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
													<img src="./images/b1.jpg" width="100" alt="" />
													<img
														src="/images/preloader.png"
														width="100"
														height="60"
														v-img="item.primary_image"
													/>
												</th>
												<td class="fw-bold">{{ item.name }}</td>
												<td>
													<span v-if="item.is_sale">
														{{ numberFormat(item.sale_price) }}
													</span>
													<span v-else> {{ numberFormat(item.price) }}</span>
													<span class="ms-1"> تومان</span>
													<div v-if="item.sale_price" class="text-danger">
														{{ salePercent(item.price, item.sale_price) }}%
														تخفیف
													</div>
												</td>
												<td>
													<div class="input-counter">
														<span
															class="plus-btn"
															@click="
																() =>
																	item.quantity > item.qty &&
																	cart.increment(item.id)
															"
														>
															+
														</span>
														<div class="input-number">{{ item.qty }}</div>
														<span
															class="minus-btn"
															@click="
																() => item.qty > 1 && cart.decrement(item.id)
															"
														>
															-
														</span>
													</div>
												</td>
												<td>
													<div>
														<span v-if="item.is_sale">{{
															numberFormat(item.sale_price * item.qty)
														}}</span>
														<span v-else>{{
															numberFormat(item.price * item.qty)
														}}</span>
													</div>
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
												<div>{{ numberFormat(cart.totalAmount) }} تومان</div>
											</li>
											<li
												class="list-group-item d-flex justify-content-between"
											>
												<div>
													تخفیف :
													<span class="text-danger ms-1"
														>{{ coupon.percent }}%</span
													>
												</div>
												<div class="text-danger">
													{{
														numberFormat(
															(cart.totalAmount * coupon.percent) / 100
														)
													}}
													تومان
												</div>
											</li>
											<li
												class="list-group-item d-flex justify-content-between"
											>
												<div>قیمت پرداختی :</div>
												<div>
													{{
														numberFormat(
															cart.totalAmount -
																(cart.totalAmount * coupon.percent) / 100
														)
													}}
													تومان
												</div>
											</li>
										</ul>
										<CartPayment
											:cart="items"
											:coupon="coupon"
											:address-id="addressId"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<div v-else class="cart-empty">
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
		<template #fallback>
			<div class="d-flex justify-content-center">
				<div
					class="spinner"
					style="
						margin-top: 250px;
						margin-bottom: 250px;
						width: 5rem;
						height: 5rem;
					"
				></div>
			</div>
		</template>
	</ClientOnly>
</template>
<script setup>
import { useCartStore } from "../store/cart";
import { useToast } from "vue-toastification";

const toast = useToast();
const cart = useCartStore();
const cartItemsCounter = computed(() => cart.count);
const items = computed(() => cart.items);
const addressId = ref(1);
console.log(addressId.value);
const coupon = reactive({
	code: "",
	percent: 0,
});

function removeItem(id) {
	cart.remove(id);
	toast.warning("آیتم از سبد خرید حذف شد");
}
</script>






<style scoped>
.spinner {
	width: 56px;
	height: 56px;
	border-radius: 50%;
	background: #ffbe33;
	-webkit-mask: radial-gradient(
		circle closest-side at 50% 40%,
		#0000 94%,
		#000
	);
	transform-origin: 50% 40%;
	animation: spinner-pl92zb 1s infinite linear;
}

@keyframes spinner-pl92zb {
	100% {
		transform: rotate(1turn);
	}
}
</style>
