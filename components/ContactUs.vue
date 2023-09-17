<template>
	<section class="book_section layout_padding">
		<div class="container">
			<div class="heading_container">
				<h2>تماس با ما</h2>
			</div>
			<div class="row">
				<div class="col-md-6">
					<div class="form_container">
						<form @submit.prevent="send">
							<div>
								<input
									type="text"
									class="form-control"
									placeholder="نام و نام خانوادگی"
									v-model="formData.name"
								/>
							</div>
							<div>
								<input
									type="email"
									class="form-control"
									placeholder="ایمیل"
									v-model="formData.email"
								/>
							</div>
							<div>
								<input
									type="text"
									class="form-control"
									placeholder="موضوع پیام"
									v-model="formData.subject"
								/>
							</div>
							<div>
								<textarea
									rows="10"
									style="height: 100px"
									class="form-control"
									placeholder="متن پیام"
									v-model="formData.text"
								></textarea>
							</div>
							<div class="btn_box">
								<button :disabled="loading">
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

const toast = useToast();
const loading = ref(false);
const { $leaflet } = useNuxtApp();
const {
	public: { apiBase },
} = useRuntimeConfig();
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
		toast.error("تمامی فیلدها الزامیست");
		return;
	}
	try {
		loading.value = true;
		const data = await $fetch(`${apiBase}/contact-us`, {
			method: "POST",
			body: formData,
		});
		toast.success("پیام شما ارسال شد");
	} catch (error) {
		console.log(error);
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