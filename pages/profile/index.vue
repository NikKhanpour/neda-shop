<template>
	<div class="vh-70">
		<div class="row g-4 mt-2">
			<div class="col-12 col-md-6">
				<label class="form-label">نام و نام خانوادگی</label>
				<input type="text" class="form-control" v-model="formData.name" />
			</div>
			<div class="col-12 col-md-6">
				<label class="form-label">ایمیل</label>
				<input type="text" class="form-control" v-model="formData.email" />
			</div>
			<div class="col-12 col-md-6">
				<label class="form-label">شماره تلفن</label>
				<input
					type="text"
					disabled
					class="form-control"
					:value="user.cellphone"
				/>
			</div>
		</div>
		<button @click="edit" :disabled="loading" class="btn btn-primary mt-4">
			ویرایش
			<div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
		</button>
	</div>
</template>
<script setup>
import { useToast } from "vue-toastification";

const loading = ref(false);
const toast = useToast();
const user = await $fetch("/api/profile/info", {
	headers: useRequestHeaders(["cookie"]),
});
const formData = reactive({
	name: "",
	email: "",
});
formData.name = user.name;
formData.email = user.email;

async function edit() {
	try {
		loading.value = true;
		const data = await $fetch("/api/profile/edit", {
			method: "POST",
			body: { name: formData.name, email: formData.email },
		});
		toast.success("ویرایش پروفایل انجام شد");
	} catch (error) {
		toast.error(Object.values(error.data.data.message).flat().toString());
	} finally {
		loading.value = false;
	}
}
</script>