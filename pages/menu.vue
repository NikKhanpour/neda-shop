<template>
	<section class="food_section layout_padding">
		<div class="container">
			<div class="row">
				<div class="col-sm-12 col-lg-3">
					<div>
						<label class="form-label">جستجو</label>
						<div class="input-group mb-3">
							<input
								@input="checkSearchBox({ search: searchContent })"
								v-model="searchContent"
								type="text"
								class="form-control"
								placeholder="دنبال چی میگردی؟"
								aria-label="Recipient's username"
								aria-describedby="basic-addon2"
							/>
							<button class="input-group-text" id="basic-addon2">
								<i class="bi bi-search"></i>
							</button>
						</div>
					</div>
					<hr />
					<div class="filter-list">
						<div class="form-label">دسته بندی</div>
						<ul>
							<li v-for="category in validCategories" :key="category.id">
								<div
									class="my-2 cursor-pointer"
									@click="handleFilter({ category: category.id })"
									:class="{
										'filter-list-active':
											route.query.hasOwnProperty('category') &&
											route.query.category == category.id,
									}"
								>
									{{ category.name }}
								</div>
							</li>
						</ul>
					</div>
					<hr />
					<div>
						<label class="form-label">مرتب سازی</label>
						<div class="form-check my-2">
							<input
								class="form-check-input"
								type="radio"
								name="flexRadioDefault"
								id="flexRadioDefault1"
								@click="handleFilter({ sortBy: 'max' })"
								:checked="
									route.query.hasOwnProperty('sortBy') &&
									route.query.sortBy == 'max'
								"
							/>
							<label
								class="form-check-label cursor-pointer"
								for="flexRadioDefault1"
							>
								بیشترین قیمت
							</label>
						</div>
						<div class="form-check my-2">
							<input
								class="form-check-input"
								type="radio"
								name="flexRadioDefault"
								id="flexRadioDefault2"
								@click="handleFilter({ sortBy: 'min' })"
								:checked="
									route.query.hasOwnProperty('sortBy') &&
									route.query.sortBy == 'min'
								"
							/>
							<label
								class="form-check-label cursor-pointer"
								for="flexRadioDefault2"
							>
								کمترین قیمت
							</label>
						</div>
						<div class="form-check my-2">
							<input
								class="form-check-input"
								type="radio"
								name="flexRadioDefault"
								id="flexRadioDefault3"
								@click="handleFilter({ sortBy: 'best_seller' })"
								:checked="
									route.query.hasOwnProperty('sortBy') &&
									route.query.sortBy == 'bestSeller'
								"
							/>
							<label
								class="form-check-label cursor-pointer"
								for="flexRadioDefault3"
							>
								پرفروش ترین
							</label>
						</div>
						<div class="form-check my-2">
							<input
								class="form-check-input"
								type="radio"
								name="flexRadioDefault"
								id="flexRadioDefault4"
								@click="handleFilter({ sortBy: 'sale' })"
								:checked="
									route.query.hasOwnProperty('sortBy') &&
									route.query.sortBy == 'sale'
								"
							/>
							<label
								class="form-check-label cursor-pointer"
								for="flexRadioDefault4"
							>
								با تخفیف
							</label>
						</div>
					</div>
					<hr />
					<div class="d-flex justify-content-center">
						<button @click="clearFilters" class="btn btn-primary w-100">
							پاک کردن فیلترها
						</button>
					</div>
				</div>
				<div class="col-sm-12 col-lg-9">
					<div
						v-if="pending"
						class="d-flex align-item-center justify-content-center"
						style="margin-top: 150px; margin-bottom: 400px"
					>
						<div class="spinner-border" style="width: 5rem; height: 5rem"></div>
					</div>
					<div v-else>
						<div
							v-if="data.data.products.length == 0"
							class="d-flex justify-content-center aligin-items-center"
							style="margin-top: 150px"
						>
							<h4>چیزی پیدا نکردم :(</h4>
						</div>
						<div v-else>
							<div class="row gx-3">
								<div
									v-for="product in data.data.products"
									:key="product.id"
									class="col-sm-6 col-lg-4"
								>
									<ProductCard :product="product" />
								</div>
							</div>
							<nav class="d-flex justify-content-center mt-5">
								<ul class="pagination">
									<li
										v-for="(link, index) in data.data.meta.links.slice(1, -1)"
										:key="index"
										class="page-item"
										:class="{ active: link.active }"
									>
										<button
											@click="handleFilter({ page: link.label })"
											class="page-link"
										>
											{{ link.label }}
										</button>
									</li>
								</ul>
							</nav>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script setup>
const {
	public: { apiBase },
} = useRuntimeConfig();
const query = ref({});
const route = useRoute();
const router = useRouter();
const searchContent = ref("");

query.value = { ...route.query };
const { data, refresh, pending } = await useFetch(() => `${apiBase}/menu`, {
	query,
});

const categories = await $fetch(`${apiBase}/categories`);

const validCategories = ref([]);
categories.data.forEach((item) => {
	if (item.description) {
		validCategories.value.push(item);
	}
});

function clearFilters() {
	query.value = {};
	router.push({
		path: "/menu",
		query: query.value,
	});
	refresh();
}

// getValidProducts();
function handleFilter(param) {
	query.value = { ...route.query, ...param };

	if (!param.hasOwnProperty("page")) {
		delete query.value.page;
	}

	if (query.value.hasOwnProperty("search")) {
		searchContent.value = "";
		checkSearchBox();
	}
	router.push({
		path: "/menu",
		query: query.value,
	});
	refresh();
}

function checkSearchBox() {
	if (searchContent.value == "") {
		delete query.value.search;
	} else {
		query.value = { search: searchContent.value };
	}
	router.push({
		path: "/menu",
		query: query.value,
	});
	refresh();
}
</script>