<template>
	<ClientOnly>
		<button :disabled="loading" @click="deleteAddress" class="btn btn-dark">
			حذف
			<div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
		</button>
	</ClientOnly>
</template>
<script setup>
import { useToast } from "vue-toastification";

const props = defineProps(["addressId"]);
const loading = ref(false);
const toast = useToast();
const refresh = inject("refresh");
async function deleteAddress() {
	try {
		loading.value = true;
		await $fetch("/api/profile/address/delete", {
			method: "POST",
			body: { address_id: props.addressId },
		});
		toast.warning("آدرستو پاک کردم");
		refresh();
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	} catch (error) {
		// toast.error(Object.values(error.data.data.message).flat().toString());
	} finally {
		loading.value = false;
	}
}
</script>