<template>
	<section class="book_section layout_padding">
		<div class="container">
			<div class="heading_container">
				<h2>تماس با ما</h2>
			</div>
			<div class="row">
				<div class="col-md-6">
					<div class="form_container">
						<div
							v-if="errors.length > 0"
							class="alert alert-danger"
							role="alert"
						>
							<ul class="mb-0">
								<li v-for="(error, index) in errors" :key="index">
									{{ error }}
								</li>
							</ul>
						</div>
						<form @submit.prevent="send">
							<div>
								<label for="name" class="form-label">نام و نام خانوادگی</label>
								<input
									v-model="formData.name"
									type="text"
									class="form-control"
									id="name"
								/>
							</div>
							<div>
								<label for="email" class="form-label">ایمیل</label>
								<input
									v-model="formData.email"
									type="email"
									class="form-control"
									id="email"
								/>
							</div>
							<div>
								<label for="subject" class="form-label">موضوع پیام</label>
								<input
									v-model="formData.subject"
									type="text"
									class="form-control"
									id="subject"
								/>
							</div>
							<div>
								<label for="text" class="form-label">متن پیام</label>
								<textarea
									v-model="formData.text"
									rows="10"
									style="height: 100px"
									class="form-control"
									id="text"
								></textarea>
							</div>
							<div class="btn_box">
								<button :disabled="loading" type="submit">
									ارسال پیام
									<div
										v-if="loading"
										class="spinner-border spinner-border-sm ms-2"
									></div>
								</button>
							</div>
						</form>
					</div>
				</div>
				<div class="col-md-6">
					<div class="map_container">
						<div id="map" style="height: 345px"></div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { useToast } from "vue-toastification";
const {
	public: { apiBase },
} = useRuntimeConfig();
const loading = ref(false);
const errors = ref([]);
const toast = useToast();
const { $leaflet } = useNuxtApp();
const formData = reactive({
	name: "",
	email: "",
	subject: "",
	text: "",
});

async function send() {
	if (
		formData.name === "" ||
		formData.email === "" ||
		formData.subject === "" ||
		formData.text === ""
	) {
		toast.error("تمامی فیلدهای فرم تماس اجباری است");
		return;
	}
	try {
		loading.value = true;
		errors.value = [];
		const data = await $fetch(`${apiBase}/contact-us`, {
			method: "POST",
			body: formData,
		});
		toast.success("پیام ارسال شد");
	} catch (error) {
		errors.value = Object.values(error.data.message).flat();
	} finally {
		loading.value = false;
	}
}

onMounted(() => {
	let map = $leaflet.map("map").setView([35.700105, 51.400394], 14);
	let tiles = $leaflet
		.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
			maxZoom: 18,
		})
		.addTo(map);

	let marker = $leaflet
		.marker([35.700105, 51.400394], {
			icon: $leaflet.icon({
				popupAnchor: [12, 6],
				iconUrl: "images/map/marker-icon.png",
				shadowUrl: "images/map/marker-shadow.png",
			}),
		})
		.addTo(map)
		.bindPopup("<b>Hello world!</b><br />I am a popup")
		.openPopup();
});
</script>