<template>
	<section class="food_section layout_padding">
		<div class="container">
			<div class="row">
				<div class="col-sm-12 col-lg-3">
					<div>
						<label class="form-label">جستجو</label>
						<div class="input-group mb-3">
							<input
								v-model="searchContent"
								@input="search"
								type="text"
								class="form-control"
								placeholder="نام محصول ..."
								aria-label="Recipient's username"
								aria-describedby="basic-addon2"
							/>
							<a href="#" class="input-group-text" id="basic-addon2">
								<i class="bi bi-search"></i>
							</a>
						</div>
					</div>
					<hr />
					<div class="filter-list">
						<div class="form-label">دسته بندی</div>
						<ul>
							<li
								v-for="category in categories.data"
								:key="category.id"
								class="my-2 cursor-pointer"
								:class="{
									'filter-list-active':
										route.query.hasOwnProperty('category') &&
										route.query.category == category.id,
								}"
								@click="handleFilter({ category: category.id })"
							>
								{{ category.name }}
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
									route.query.hasOwnProperty('sortByd') &&
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
								@click="handleFilter({ sortBy: 'bestSeller' })"
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
				</div>

				<div class="col-sm-12 col-lg-9">
					<div
						v-if="pending"
						class="d-flex justify-content-center align-items-center"
						style="margin-top: 150px"
					>
						<div class="spinner-border" style="width: 5rem; height: 5rem"></div>
					</div>
					<div v-else>
						<div
							v-if="data.data.products.length == 0"
							class="d-flex justify-content-center"
							style="margin-top: 150px"
						>
							<h4>محصولی یافت نشد!</h4>
						</div>

						<template v-else>
							<div class="row gx-3">
								<div
									v-for="product in data.data.products"
									:key="product"
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
						</template>
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
query.value = route.query;
const { data, refresh, pending } = await useFetch(() => `${apiBase}/menu`, {
	query,
});
const { data: categories } = await useFetch(`${apiBase}/categories`);

function handleFilter(param) {
	query.value = { ...route.query, ...param };

	if (!param.hasOwnProperty("page")) {
		delete query.value.page;
	}
	if (query.value.hasOwnProperty("search")) {
		search.value = "";
		delete query.value.search;
	}
	router.push({
		path: "/menu",
		query: query.value,
	});
	refresh();
}

function search() {
	query.value = { search: searchContent };
	router.push({
		path: "/menu",
		query: query.value,
	});

	if (searchContent.value === "") {
		if (query.value.hasOwnProperty("search")) {
			delete query.value.search;
			router.push({
				path: "/menu",
				query: query.value,
			});
			refresh();
		}
	}
	refresh();
}
if (process.client) {
	watchEffect(() => {
		if (Object.keys(route.query).length == 0) {
			query.value = {};
			refresh();
		}
	});
}
</script>