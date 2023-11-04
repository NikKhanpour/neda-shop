<template>
	<section class="single_page_section layout_padding">
		<div class="container">
			<div class="row">
				<div class="col-md-10 offset-md-1">
					<div class="row gy-5">
						<div class="col-sm-12 col-lg-6">
							<h3 class="fw-bold mb-4">{{ product.data.name }}</h3>
							<h5 v-if="product.data.is_sale" class="mb-3">
								<del class="me-3">{{ numberFormat(product.data.price) }}</del>
								{{ numberFormat(product.data.sale_price) }} تومان
								<div class="text-danger fs-6">
									{{
										salePercent(product.data.price, product.data.sale_price)
									}}% تخفیف
								</div>
							</h5>
							<h5 v-else class="mb-3">
								{{ numberFormat(product.data.price) }} تومان
							</h5>
							<p>
								{{ product.data.description }}
							</p>

							<div v-if="product.data.quantity > 0">
								<div class="mt-5 d-flex">
									<button @click="addToCart(product.data)" class="btn-add">
										افزودن به سبد خرید
									</button>
									<div class="input-counter ms-4">
										<span
											@click="() => qty < product.data.quantity && qty++"
											class="plus-btn"
										>
											+
										</span>
										<div class="input-number">{{ qty }}</div>
										<span @click="() => qty > 1 && qty--" class="minus-btn">
											-
										</span>
									</div>
								</div>
							</div>
							<div v-else>
								<div class="mt-5 d-flex text-danger">
									موجودی این آیتم تموم شده :,(
								</div>
							</div>
						</div>
						<div class="col-sm-12 col-lg-6">
							<div
								id="carouselExampleIndicators"
								class="carousel slide"
								data-bs-ride="carousel"
							>
								<div class="carousel-indicators">
									<button
										type="button"
										data-bs-target="#carouselExampleIndicators"
										data-bs-slide-to="0"
										class="active"
										aria-current="true"
										aria-label="Slide 1"
									></button>
									<button
										v-for="(image, index) in product.data.images"
										:key="index"
										type="button"
										data-bs-target="#carouselExampleIndicators"
										:data-bs-slide-to="`${index + 1}`"
									></button>
								</div>
								<div class="carousel-inner">
									<div class="carousel-item active">
										<img
											src="/images/preloader.png"
											v-img="product.data.primary_image"
											class="d-block w-100"
										/>
									</div>
									<div
										v-for="image in product?.data.images"
										:key="image.id"
										class="carousel-item"
									>
										<img
											src="/images/preloader.png"
											class="d-block w-100"
											v-img="image.image"
										/>
									</div>
								</div>
								<button
									class="carousel-control-prev"
									type="button"
									data-bs-target="#carouselExampleIndicators"
									data-bs-slide="prev"
								>
									<span
										class="carousel-control-prev-icon"
										aria-hidden="true"
									></span>
									<span class="visually-hidden">Previous</span>
								</button>
								<button
									class="carousel-control-next"
									type="button"
									data-bs-target="#carouselExampleIndicators"
									data-bs-slide="next"
								>
									<span
										class="carousel-control-next-icon"
										aria-hidden="true"
									></span>
									<span class="visually-hidden">Next</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- end food section -->
	<hr />
	<section class="food_section my-5">
		<div class="container">
			<div class="row gx-3">
				<div
					v-for="randomProduct in randomProducts?.data"
					:key="randomProduct.id"
					class="col-sm-6 col-lg-3"
				>
					<ProductCard :product="randomProduct" />
				</div>
			</div>
		</div>
	</section>
</template>
<script setup>
import { cartStore } from "../../store/cart";

const {
	public: { apiBase },
} = useRuntimeConfig();
const route = useRoute();
const cart = cartStore();
const qty = ref(1);

function addToCart(product) {
	cart.remove(product.id);
	cart.addToCart(product, qty.value);
}

const { data: product } = await useFetch(
	`${apiBase}/products/${route.params.slug}`
);
const { data: randomProducts } = await useFetch(
	`${apiBase}/random-products?count=4`
);
</script>