<template>
	<div class="col-12 col-md-6 d-flex justify-content-end align-items-baseline">
		<NuxtLink
			v-if="data.addresses.length == 0"
			to="/profile/addresses"
			class="btn btn-primary"
		>
			ایجاد آدرس
		</NuxtLink>
		<div v-else>
			<select
				@change="(el) => emit('setAddressId', el.target.value)"
				style="width: 200px"
				class="form-select ms-3"
				aria-label="Default select example"
			>
				<option selected value="">انتخاب آدرس</option>
				<option
					v-for="address in data.addresses"
					:key="address.id"
					:value="address.id"
				>
					{{ address.title }}
				</option>
			</select>
		</div>
	</div>
</template>
<script setup>
const data = await $fetch("/api/profile/addresses", {
	headers: useRequestHeaders(["cookie"]),
});

const emit = defineEmits(["setAddressId"]);
</script>