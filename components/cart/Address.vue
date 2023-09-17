<template>
	<div v-if="addresses?.length > 0" class="d-flex justify-content-center">
		<div>آدرس</div>
		<select
			@change="(el) => emit('setAddressId', el.target.value)"
			style="width: 200px"
			class="form-select ms-3"
			aria-label="Default select example"
		>
			<option value="" selected>انتخاب</option>
			<option
				v-for="address in data.addresses"
				:key="address.id"
				:value="address.id"
			>
				{{ address.title }}
			</option>
		</select>
	</div>
	<NuxtLink v-else to="/" class="btn btn-primary"> ایجاد آدرس </NuxtLink>
</template>
<script setup>
const data = await $fetch("/api/profile/addresses", {
	method: "GET",
	headers: useRequestHeaders(),
});
const emit = defineEmits(["setAddressId"]);
</script>