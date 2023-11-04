<template>
	<button
		class="btn btn-primary mt-4"
		type="button"
		data-bs-toggle="collapse"
		data-bs-target="#collapseExample"
		aria-expanded="false"
		aria-controls="collapseExample"
	>
		ایجاد آدرس جدید
	</button>
	<div class="collapse mt-3" id="collapseExample">
		<div class="card card-body">
			<FormKit
				type="form"
				id="createAddress"
				@submit="create"
				:actions="false"
				:incomplete-message="false"
			>
				<div class="row g-4">
					<div class="col-12 col-md-6">
						<FormKit
							type="text"
							label="عنوان"
							name="title"
							id="title"
							label-class="form-label"
							input-class="form-control"
							validation="required"
							messages-class="form-text text-danger"
							:validation-messages="{ required: 'فیلد عنوان خالی گذاشتی' }"
						/>
					</div>
					<div class="col-12 col-md-6">
						<FormKit
							type="text"
							label="شماره تماس"
							name="cellphone"
							id="cellphone"
							label-class="form-label"
							input-class="form-control"
							:validation="[['required'], ['matches', /^(\+98|0)?9\d{9}$/]]"
							messages-class="form-text text-danger"
							:validation-messages="{
								required: 'فیلد شماره خالی گذاشتی',
								matches: 'شمارتو اشتباه زدی',
							}"
						/>
					</div>
					<div class="col-12 col-md-6">
						<FormKit
							type="text"
							label="کد پستی"
							name="postal_code"
							id="postal_code"
							label-class="form-label"
							input-class="form-control"
							:validation="[['required'], ['matches', /^\d{5}[ -]?\d{5}$/i]]"
							messages-class="form-text text-danger"
							:validation-messages="{
								required: 'فیلد کد پستی خالی گذاشتی',
								matches: 'کد پستی باید 10 رقم باشه',
							}"
						/>
					</div>

					<div class="col-12 col-md-12">
						<FormKit
							type="textarea"
							label="شهر و آدرس"
							name="address"
							id="address"
							rows="5"
							label-class="form-label"
							input-class="form-control"
							validation="required"
							messages-class="form-text text-danger"
							:validation-messages="{ required: 'فیلد عنوان خالی گذاشتی' }"
						/>
					</div>
					<FormKit type="submit" input-class="btn btn-primary mt-4">
						ایجاد
						<div
							v-if="loading"
							class="spinner-border spinner-border-sm ms-2"
						></div>
					</FormKit>
				</div>
			</FormKit>
		</div>
	</div>
	<hr />
</template>
<script setup>
import { useToast } from "vue-toastification";

const cityEl = ref(null);
const loading = ref(false);
const toast = useToast();

const refresh = inject("refresh");
const props = defineProps(["cities", "provinces"]);

async function create(formData) {
	try {
		loading.value = true;
		await $fetch("/api/profile/address/create", {
			method: "POST",
			body: { ...formData, city_id: 1, province_id: 1 },
		});
		toast.success("آدرستو برات ساختم");
		refresh();
	} catch (error) {
		toast.error(Object.values(error.data.data.message).flat().toString());
	} finally {
		loading.value = false;
	}
}

function changeProvince(el) {
	cityEl.value.node.input(
		props.cities.find((item) => item.province_id == el.target.value).id
	);
}
</script>