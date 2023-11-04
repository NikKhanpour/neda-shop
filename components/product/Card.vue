<template>
	<div class="box">
		<div>
			<NuxtLink :to="`/product/${product.slug}`">
				<div class="img-box">
					<img
						src="/images/preloader.png"
						v-img="props.product.primary_image"
					/>
				</div>
			</NuxtLink>
			<div class="detail-box">
				<NuxtLink :to="`/product/${product.slug}`">
					<h5>{{ props.product.name }}</h5>
					<p>
						{{ props.product.description }}
					</p>
				</NuxtLink>
				<div class="options">
					<h6 v-if="props.product.is_sale">
						<del class="me-2">{{ numberFormat(props.product.price) }}</del>
						{{ numberFormat(props.product.sale_price) }}
						<span>تومان</span>
					</h6>
					<h6 v-else>
						{{ numberFormat(props.product.price) }}
						<span>تومان</span>
					</h6>
					<button v-if="props.product.quantity > 0">
						<i
							@click="addToCart(props.product)"
							class="bi bi-cart-fill text-white fs-5"
						></i>
					</button>
					<div v-else class="text-danger">تموم شده</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import { cartStore } from "~/store/cart";

const props = defineProps(["product"]);
const cart = cartStore();
function addToCart(product) {
	cart.remove(product.id);
	cart.addToCart(product, 1);
}
</script>