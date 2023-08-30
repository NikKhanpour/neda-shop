<template>
	<div :disabled="loading" @click="deleteAddress" class="btn btn-dark">
		حذف
		<div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
	</div>
</template>
<script setup>
import { useToast } from "vue-toastification";
const toast = useToast();
const loading = ref(false);
const props = defineProps(["addressId"]);
const refreshGetAddress = inject("refreshGetAddress");
async function deleteAddress() {
	try {
		loading.value = false;
		await $fetch("/api/profile/addresses/delete", {
			method: "POST",
			body: { address_id: props.addressId },
		});
		refreshGetAddress();
		toast.warning("آدرس حذف شد");
	} catch (error) {
		return error;
	} finally {
		loading.value = false;
	}
}
</script>