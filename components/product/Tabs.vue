<template>
	<section class="food_section layout_padding-bottom">
		<div class="container">
			<div class="heading_container heading_center">
				<h2>منو محصولات</h2>
			</div>

			<div>
				<Tabs
					:options="{ useUrlFragment: false }"
					nav-class="filters_menu"
					nav-item-active-class="active"
				>
					<Tab
						v-for="(tabList, index) in data.data.tabList"
						:key="index"
						:name="tabList"
					>
						<div class="filters_content">
							<div class="row grid">
								<div
									v-for="product in data.data.tabPanel[index].slice(0, 3)"
									:key="product.id"
									class="col-sm-6 col-lg-4"
								>
									<div v-if="product.status == 'فعال'">
										<ProductCard :product="product" />
									</div>
								</div>
							</div>
						</div>
					</Tab>
				</Tabs>
			</div>
			<div class="btn-box">
				<NuxtLink to="/menu"> مشاهده بیشتر </NuxtLink>
			</div>
		</div>
	</section>
</template>
<script setup>
import { Tabs, Tab } from "vue3-tabs-component";
const {
	public: { apiBase },
} = useRuntimeConfig();

const data = await $fetch(`${apiBase}/products/products-tabs`);
</script>