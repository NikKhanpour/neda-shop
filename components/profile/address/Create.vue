<template>
	<div class="col-sm-12 col-lg-12">
		<button
			class="btn btn-primary"
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
				<div v-if="errors.length > 0" class="alert alert-danger">
					<ul class="mb-0">
						<li v-for="(error, index) in errors" :key="index">{{ error }}</li>
					</ul>
				</div>
				<div class="row g-4">
					<FormKit
						#default="{ value }"
						@submit="createAddress"
						id="createAddress"
						type="form"
						:actions="false"
						:incomplete-message="false"
					>
						<div class="row">
							<div class="col col-md-6">
								<FormKit
									type="text"
									name="title"
									id="title"
									label-class="form-label"
									input-class="form-control"
									label="عنوان"
									validation="required"
									:validation-messages="{
										required: 'فیلد عنوان الزامیست',
									}"
									messages-class="form-text text-danger"
								/>
							</div>
							<div class="col col-md-6">
								<FormKit
									type="text"
									name="cellphone"
									id="cellphone"
									label-class="form-label"
									input-class="form-control"
									label="شماره تماس"
									:validation="[['required'], ['matches', /^(\+98|0)?9\d{9}$/]]"
									:validation-messages="{
										required: 'شماره تماس الزامیست',
										matches: 'فرمت شماره تماس معتبر نمیباشد',
									}"
									messages-class="form-text text-danger"
								/>
							</div>
							<div class="col col-md-6 mt-3">
								<FormKit
									type="text"
									name="postal_code"
									id="postal_code"
									label-class="form-label"
									input-class="form-control"
									label="کدپستی"
									:validation="[
										['required'],
										['matches', /^\d{5}[ -]?\d{5}$/i],
									]"
									:validation-messages="{
										required: 'کدپستی الزامیست',
										matches: 'فرمت کدپستی معتبر نمیباشد',
									}"
									messages-class="form-text text-danger"
								/>
							</div>
							<div class="col col-md-6 mt-3">
								<FormKit
									@change="changeProvince"
									type="select"
									name="province_id"
									id="province_id"
									label-class="form-label"
									input-class="form-select"
									label="استان"
									validation="required"
									:validation-messages="{
										required: 'وارد کردن استان الزامیست',
									}"
									messages-class="form-text text-danger"
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
							<div class="col col-md-6 mt-3">
								<FormKit
									ref="cityEl"
									type="select"
									name="city_id"
									id="city_id"
									label-class="form-label"
									input-class="form-select"
									label="شهر"
									validation="required"
									:validation-messages="{
										required: 'وارد کردن شهر الزامیست',
									}"
									messages-class="form-text text-danger"
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
							<div class="col col-md-12 mt-3">
								<FormKit
									type="textarea"
									rows="5"
									name="address"
									id="address"
									label-class="form-label"
									input-class="form-control"
									label="آدرس"
									validation="required"
									:validation-messages="{ required: 'آدرس الزامیست' }"
									messages-class="form-text text-danger"
								/>
							</div>
						</div>
						<FormKit
							:disabled="loading"
							type="submit"
							input-class="btn btn-primary mt-4"
							>ایجاد
							<div
								v-if="loading"
								class="spinner-border spinner-border-sm ms-2"
							></div>
						</FormKit>
					</FormKit>
				</div>
			</div>
		</div>
		<hr />
	</div>
</template>
<script setup>
import { useToast } from "vue-toastification";
import { reset } from "@formkit/core";
const toast = useToast();
const errors = ref([]);
const loading = ref(false);
const props = defineProps(["provinces", "cities"]);
const refreshGetAddress = inject("refreshGetAddress");
async function createAddress(formData) {
	try {
		loading.value = true;
		await $fetch("/api/profile/addresses/create", {
			method: "POST",
			body: formData,
		});
		toast.success("ادرس با موفقیت ساخته شد");
		reset("createAddress");
		refreshGetAddress();
	} catch (error) {
		errors.value = Object.values(error.data.data.message).flat();
	} finally {
		loading.value = false;
	}
}

const cityEl = ref(null);
function changeProvince(el) {
	cityEl.value.node.input(
		props.cities.find((item) => item.province_id == el.target.value).id
	);
}
</script>