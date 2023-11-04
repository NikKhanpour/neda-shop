<template>
	<ClientOnly>
		<AddressesCreate :cities="data.cities" :provinces="data.provinces" />
		<div v-for="address in data.addresses" :key="address.id">
			<AddressesEdit
				:cities="data.cities"
				:provinces="data.provinces"
				:address="address"
			/>
		</div>
		<template #fallback>
			<div
				class="d-flex justify-content-center"
				style="margin-top: 100px; margin-bottom: 400px"
			>
				<div class="spinner-border" style="height: 5rem; width: 5rem"></div>
			</div>
		</template>
	</ClientOnly>
</template>
<script setup>
const { data, refresh } = await useFetch(() => "/api/profile/addresses", {
	headers: useRequestHeaders(["cookie"]),
});
provide("refresh", refresh);
</script>