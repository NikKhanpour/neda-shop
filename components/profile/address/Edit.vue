<template>
	<div class="card card-body">
		<FormKit
			type="form"
			@submit="edit"
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
						:value="props.address.title"
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
						:value="props.address.cellphone"
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
						:value="props.address.postal_code"
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
						:value="props.address.province_id"
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
						:value="props.address.city_id"
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
						:value="props.address.address"
					/>
				</div>
				<div class="d-flex justify-content-between align-items-center">
					<FormKit
						type="submit"
						input-class="btn btn-primary"
						:disabled="loading"
					>
						ویرایش
						<div
							v-if="loading"
							class="spinner-border spinner-border-sm ms-2"
						></div>
					</FormKit>
					<ProfileAddressDelete :addressId="props.address.id" />
				</div>
			</div>
		</FormKit>
	</div>
	<hr />
</template>
<script setup>
import { useToast } from "vue-toastification";

const props = defineProps(["cities", "provinces", "address"]);
const loading = ref(false);
const toast = useToast();
const cityEl = ref(null);

async function edit(formData) {
	try {
		loading.value = true;
		const data = await $fetch("/api/profile/address/edit", {
			method: "POST",
			body: { ...formData, address_id: props.address.id },
		});
		toast.success("ویرایش انجام شد");
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