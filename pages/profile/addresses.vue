<template>
	<ClientOnly>
		<template #fallback>
			<div
				class="d-flex justify-content-center"
				style="margin-top: 200px; margin-bottom: 200px"
			>
				<div class="spinner-border" style="width: 5rem; height: 5rem"></div>
			</div>
		</template>
		<ProfileAddressCreate :provinces="data.provinces" :cities="data.cities" />
		<div v-for="address in data.addresses" :key="address.id">
			<ProfileAddressEdit
				:address="address"
				:provinces="data.provinces"
				:cities="data.cities"
			/>
		</div>
	</ClientOnly>
</template>
<script setup>
const { data, refresh } = await useFetch(() => "/api/profile/addresses", {
	headers: useRequestHeaders(["cookie"]),
});
provide("refresh", refresh);
</script>