<template>
	<div
		v-if="pending"
		class="d-flex justify-content-center"
		style="margin-top: 200px; margin-bottom: 400px"
	>
		<div class="spinner-border" style="height: 5rem; width: 5rem"></div>
	</div>
	<section v-else>
		<div
			v-if="data.orders.length == 0"
			class="d-flex justify-content-center"
			style="margin-top: 100px; margin-bottom: 200px"
		>
			<h4>تاحالا چیزی سفارش ندادی :(</h4>
		</div>
		<div v-else>
			<div class="table-responsive mt-3">
				<table class="table align-middle">
					<thead>
						<tr>
							<th>شماره سفارش</th>
							<th>آدرس</th>
							<th>وضعیت پرداخت</th>
							<th>قیمت کل</th>
							<th>تاریخ</th>
							<th>جزییات</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(order, index) in data.orders" :key="index">
							<th>{{ order.id }}</th>
							<td>{{ order.address_title }}</td>
							<td>
								<span
									:class="{
										'text-success': order.payment_status == 'موفق',
										'text-danger': order.payment_status == 'ناموفق',
									}"
									>{{ order.payment_status }}</span
								>
							</td>
							<td>{{ numberFormat(order.paying_amount) }} تومان</td>
							<td>{{ order.created_at }}</td>
							<td>
								<button
									type="button"
									class="btn btn-primary"
									data-bs-toggle="modal"
									:data-bs-target="`#modal-${index}`"
								>
									محصولات
								</button>
								<div class="modal fade" :id="`modal-${index}`">
									<div class="modal-dialog modal-lg">
										<div class="modal-content">
											<div class="modal-header">
												<h6 class="modal-title">
													محصولات سفارش شماره {{ order.id }}
												</h6>
												<button
													type="button"
													class="btn-close"
													data-bs-dismiss="modal"
													aria-label="Close"
												></button>
											</div>
											<div class="modal-body">
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
														<tr
															v-for="product in order.order_items"
															:key="product.id"
														>
															<th>
																<img
																	v-img="product.product_primary_image"
																	src="/images/preloader.png"
																	width="80"
																/>
															</th>
															<td class="fw-bold">
																{{ product.product_name }}
															</td>
															<td>{{ numberFormat(product.price) }} تومان</td>
															<td>{{ product.quantity }}</td>
															<td>
																{{ numberFormat(product.subtotal) }} تومان
															</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<nav class="d-flex justify-content-center mt-5">
				<ul class="pagination">
					<li
						v-for="(link, index) in data?.meta.links.slice(1, -1)"
						:key="index"
						class="page-item"
						:class="{ active: link.active }"
					>
						<button @click="paginate(link.label)" class="page-link">
							{{ link.label }}
						</button>
					</li>
				</ul>
			</nav>
		</div>
	</section>
</template>
<script setup>
const page = ref(1);
const { data, refresh, pending } = await useFetch(() => "/api/profile/orders", {
	headers: useRequestHeaders(["cookie"]),
	query: { page },
});

function paginate(link) {
	page.value = link;
	refresh();
}
</script>