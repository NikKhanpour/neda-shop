<template>
	<div class="sub_page">
		<div class="hero_area">
			<header class="header_section">
				<div class="container">
					<nav class="navbar navbar-expand-lg custom_nav-container">
						<a class="navbar-brand" href="index.html">
							<span> نداشاپ </span>
						</a>

						<button
							class="navbar-toggler"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarSupportedContent"
							aria-controls="navbarSupportedContent"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span class="navbar-toggler-icon"></span>
						</button>

						<div class="collapse navbar-collapse" id="navbarSupportedContent">
							<ul class="navbar-nav mx-auto">
								<li class="nav-item" :class="{ active: route.path == '/' }">
									<NuxtLink class="nav-link" to="/">صفحه اصلی</NuxtLink>
								</li>
								<li class="nav-item" :class="{ active: route.path == '/menu' }">
									<NuxtLink class="nav-link" to="/menu">منو</NuxtLink>
								</li>
								<li
									class="nav-item"
									:class="{ active: route.path == '/aboutme' }"
								>
									<NuxtLink class="nav-link" to="/aboutme">درباره من</NuxtLink>
								</li>
								<li
									class="nav-item"
									:class="{ active: route.path == '/contactme' }"
								>
									<NuxtLink class="nav-link" to="/contactme"
										>تماس با من</NuxtLink
									>
								</li>
							</ul>
							<div class="user_option">
								<NuxtLink class="cart_link position-relative" to="/cart">
									<i class="bi bi-cart-fill text-white fs-5"></i>
									<ClientOnly>
										<span
											v-if="itemsCounter > 0"
											class="position-absolute top-0 translate-middle badge rounded-pill"
										>
											{{ itemsCounter }}
										</span>
									</ClientOnly>
								</NuxtLink>
								<NuxtLink v-if="authUser" to="/profile" class="btn-auth">
									پروفایل
								</NuxtLink>
								<NuxtLink v-else to="/login" class="btn-auth"> ورود </NuxtLink>
							</div>
						</div>
					</nav>
				</div>
			</header>
		</div>
	</div>
</template>
<script setup>
import { cartStore } from "../../store/cart";

const route = useRoute();
const cart = cartStore();
const { authUser } = useAuth();
const itemsCounter = computed(() => cart.count);
</script>