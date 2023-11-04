<template>
	<div
		v-if="pending"
		class="d-flex justify-content-center"
		style="margin-top: 150px; margin-bottom: 400px"
	>
		<div class="spinner-border" style="height: 5rem; width: 5rem"></div>
	</div>
	<template v-else>
		<div class="table-responsive mt-3">
			<table class="table align-middle">
				<thead>
					<tr>
						<th>شماره سفارش</th>
						<th>مبلغ</th>
						<th>وضعیت</th>
						<th>شماره پیگیری</th>
						<th>تاریخ</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="trans in data.transactions" :key="trans.id">
						<th>{{ trans.order_id }}</th>
						<td>{{ numberFormat(trans.amount) }} تومان</td>
						<td>
							<span
								:class="{
									'text-success': trans.status == 'موفق',
									'text-danger': trans.status == 'ناموفق',
								}"
								>{{ trans.status }}</span
							>
						</td>
						<td>{{ trans.trans_id }}</td>
						<td>{{ trans.created_at }}</td>
					</tr>
				</tbody>
			</table>
		</div>
		<nav class="d-flex justify-content-center mt-5">
			<ul class="pagination">
				<li
					v-for="(link, index) in data.meta.links.slice(1, -1)"
					:key="index"
					class="page-item"
					:class="{ active: link.active }"
				>
					<button @click="paginate(link.label)" class="page-link" href="#">
						{{ link.label }}
					</button>
				</li>
			</ul>
		</nav>
	</template>
</template>
<script setup>
const page = ref(1);
const { data, refresh, pending } = await useFetch("/api/profile/transactions", {
	headers: useRequestHeaders(["cookie"]),
	query: { page },
});

function paginate(link) {
	(page.value = link), refresh();
}
</script>