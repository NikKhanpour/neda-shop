<template>
	<button :disabled="loading" @click="deleteAddress" class="btn btn-dark">
		حذف
		<div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
	</button>
</template>
<script setup>
import { useToast } from "vue-toastification";

const loading = ref(false);
const props = defineProps(["addressId"]);
const toast = useToast();
const refresh = inject("refresh");
async function deleteAddress() {
	try {
		loading.value = true;
		await $fetch("/api/profile/address/delete", {
			method: "POST",
			body: { address_id: props.addressId },
		});
		refresh();
		toast.warning("آدرس حذف شد");
	} catch (error) {
		toast.error(Object.values(error.data.data.message).flat().toString());
	} finally {
		loading.value = false;
	}
}
</script>