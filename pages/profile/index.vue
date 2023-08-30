<template>
	<div class="vh-70">
		<FormKit
			@submit="edit"
			type="form"
			:actions="false"
			:incomplete-message="false"
		>
			<div class="row g-4">
				<div v-if="errors.length > 0" class="alert alert-danger">
					<ul class="mb-0">
						<li v-for="(error, index) in errors" :key="index">
							{{ error }}
						</li>
					</ul>
				</div>
				<div class="col col-md-6">
					<FormKit
						type="text"
						name="name"
						id="name"
						label-class="form-label"
						input-class="form-control"
						label="نام و نام خانوادگی"
						validation="required"
						:validation-messages="{
							required: 'فیلد نام و نام خوانوادگی الزامیست',
						}"
						messages-class="form-text text-danger"
						:value="user.name"
					/>
				</div>
				<div class="col col-md-6">
					<FormKit
						type="email"
						name="email"
						id="email"
						label-class="form-label"
						input-class="form-control"
						label="ایمیل"
						validation="required|email"
						:validation-messages="{
							required: 'فیلد ایمیل الزامیست',
							email: 'فرمت فیلد معتبر نیست',
						}"
						messages-class="form-text text-danger"
						:value="user.email"
					>
					</FormKit>
				</div>
				<div class="col col-md-6">
					<label class="form-label">شماره تلفن</label>
					<input
						type="text"
						disabled
						class="form-control"
						:value="user.cellphone"
					/>
				</div>
				<FormKit
					:disabled="loading"
					type="submit"
					input-class="btn btn-primary mt-4"
				>
					ویرایش
					<div
						v-if="loading"
						class="spinner-border spinner-border-sm ms-2"
					></div>
				</FormKit>
			</div>
		</FormKit>
	</div>
</template>
<script setup>
import { useToast } from "vue-toastification";
const toast = useToast();
const errors = ref([]);
const loading = ref(false);
const user = ref({});
const data = await $fetch("/api/profile/info", {
	headers: useRequestHeaders(["cookie"]),
});
user.value = data;
async function edit(formData) {
	try {
		loading.value = true;
		const data = await $fetch("/api/profile/info/edit", {
			method: "POST",
			body: formData,
		});
		user.value = data;
		toast.success("ویرایش اطلاعات انجام شد");
	} catch (error) {
		errors.value = Object.values(error.data.data.message).flat();
	} finally {
		loading.value = false;
	}
}
</script>