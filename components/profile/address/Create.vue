<template>
	<button
		class="btn btn-primary mt-3"
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
				@submit="create"
				:actions="false"
				:incomplete-message="false"
				#default="{ value }"
				id="createAddress"
			>
				<div class="row g-4">
					<div class="col-12 col-md-6">
						<FormKit
							type="text"
							name="title"
							id="title"
							label-class="form-label"
							input-class="form-control"
							label="عنوان"
							validation="required"
							messages-class="form-text text-danger"
							:validation-messages="{ required: 'فیلد عنوان الزامیست' }"
						/>
					</div>
					<div class="col-12 col-md-6">
						<FormKit
							type="text"
							name="cellphone"
							id="cellphone"
							label-class="form-label"
							input-class="form-control"
							label="شماره تماس"
							:validation="[['required'], ['matches', /^(\+98|0)?9\d{9}$/]]"
							messages-class="form-text text-danger"
							:validation-messages="{
								required: 'فیلد شماره تماس الزامیست',
								matches: 'فرمت شماره تماس معبتر نیست ',
							}"
						/>
					</div>
					<div class="col-12 col-md-6">
						<FormKit
							type="text"
							name="postal_code"
							id="postal_code"
							label-class="form-label"
							input-class="form-control"
							label="کد پستی"
							:validation="[['required'], ['matches', /^\d{5}[ -]?\d{5}$/i]]"
							messages-class="form-text text-danger"
							:validation-messages="{
								required: 'فیلد کد پستی الزامیست',
								matches: 'کد پستی باید ده رقم باشد',
							}"
						/>
					</div>
					<div class="col-12 col-md-6">
						<FormKit
							@change="changeProvince"
							type="select"
							name="province_id"
							id="province_id"
							label-class="form-label"
							input-class="form-select"
							label="استان"
							validation="required"
							messages-class="form-text text-danger"
							:validation-messages="{ required: 'فیلد استان الزامیست' }"
						>
							<option
								v-for="province in props.provinces"
								:key="province.id"
								:value="province.id"
							>
								{{ province.name }}
							</option>
						</FormKit>
					</div>
					<div class="col-12 col-md-6">
						<FormKit
							ref="cityEl"
							type="select"
							name="city_id"
							id="city_id"
							label-class="form-label"
							input-class="form-select"
							label="شهر"
							validation="required"
							messages-class="form-text text-danger"
							:validation-messages="{ required: 'فیلد شهر الزامیست' }"
						>
							<option
								v-for="city in props.cities.filter(
									(item) => item.province_id == value.province_id
								)"
								:key="city.id"
								:value="city.id"
							>
								{{ city.name }}
							</option>
						</FormKit>
					</div>
					<div class="col-12 col-md-12">
						<FormKit
							type="textarea"
							rows="5"
							name="address"
							id="address"
							label-class="form-label"
							input-class="form-control"
							label="آدرس"
							validation="required"
							messages-class="form-text text-danger"
							:validation-messages="{ required: 'فیلد آدرس الزامیست' }"
						/>
					</div>
					<FormKit
						type="submit"
						input-class="btn btn-primary"
						:disabled="loading"
					>
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

const props = defineProps(["provinces", "cities"]);
const cityEl = ref(null);
const loading = ref(false);
const toast = useToast();
const refresh = inject("refresh");
async function create(formData) {
	try {
		loading.value = true;
		await $fetch("/api/profile/address/create", {
			method: "POST",
			body: formData,
		});
		toast.success("آدرس ایجاد شد");
		refresh();
	} catch (error) {
		console.log(error);
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