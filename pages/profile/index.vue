<template>
	<div class="vh-70 mt-4">
		<div class="row g-4">
			<div class="col-12 col-md-6">
				<label class="form-label">نام و نام خانوادگی</label>
				<input type="text" v-model="user.name" class="form-control" />
			</div>
			<div class="col-12 col-md-6">
				<label class="form-label">ایمیل</label>
				<input type="text" v-model="user.email" class="form-control" />
			</div>
			<div class="col-12 col-md-6">
				<label class="form-label">شماره تلفن</label>
				<input
					type="text"
					disabled
					class="form-control"
					:value="data.cellphone"
				/>
			</div>
		</div>
		<button @click="update" :disabled="loading" class="btn btn-primary mt-4">
			ویرایش
			<div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
		</button>
	</div>
</template>
<script setup>
import { useToast } from "vue-toastification";

const loading = ref(false);
const toast = useToast();
const user = reactive({
	name: "",
	email: "",
});
const data = await $fetch("/api/profile/info", {
	headers: useRequestHeaders(),
});
user.name = data.name;
user.email = data.email;

async function update() {
	try {
		loading.value = true;
		await $fetch("/api/profile/info/edit", {
			method: "POST",
			body: { name: user.name, email: user.email },
		});
		toast.success("پروفایلت آپدیت شد");
	} catch (error) {
		toast.error(Object.values(error.data.data.message).flat().toString());
	} finally {
		loading.value = false;
	}
}
</script>