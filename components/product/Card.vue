<template>
	<div class="box">
		<div>
			<NuxtLink :to="`/product/${props.product.slug}`">
				<div class="img-box">
					<img
						src="/images/preloader.png"
						v-img="props.product.primary_image"
					/>
				</div>
			</NuxtLink>
			<div class="detail-box">
				<NuxtLink :to="`/product/${props.product.slug}`"
					><h5>{{ props.product.name }}</h5>
					<p>
						{{ props.product.description }}
					</p>
				</NuxtLink>
				<div class="options">
					<h6>
						<div v-if="props.product.is_sale">
							<del>{{ numberFormat(props.product.price) }}</del>
							<span class="text-danger"
								>{{ numberFormat(props.product.sale_price) }} تومان</span
							>
						</div>
						<div v-else>{{ numberFormat(props.product.price) }} تومان</div>
					</h6>
					<button @click="addToCart(props.product)">
						<i class="bi bi-cart-fill text-white fs-5"></i>
					</button>
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