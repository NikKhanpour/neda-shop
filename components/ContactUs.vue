<template>
	<section class="book_section layout_padding">
		<div class="container">
			<div class="heading_container">
				<h2>پیامی برای من داری؟</h2>
			</div>
			<div class="row">
				<div class="col-md-6">
					<div class="form_container">
						<div>
							<label for="name" class="form-label">اسم و فامیلیت</label>
							<input
								type="text"
								class="form-control"
								id="name"
								v-model="formData.name"
							/>
						</div>
						<div>
							<label for="email" class="form-label">ایمیلت</label>

							<input
								type="email"
								class="form-control"
								id="email"
								v-model="formData.email"
							/>
						</div>
						<div>
							<label for="subject" class="form-label">موضوع پیامت</label>
							<input
								type="text"
								id="subject"
								class="form-control"
								v-model="formData.subject"
							/>
						</div>
						<div>
							<label for="text" class="form-label">پیامت</label>
							<textarea
								rows="10"
								style="height: 100px"
								class="form-control"
								id="text"
								v-model="formData.text"
							></textarea>
						</div>
						<div class="btn_box">
							<button :disabled="loading" @click="sendMessage">
								ارسال پیام
								<div
									v-if="loading"
									class="spinner-border spinner-border-sm ms-2"
								></div>
							</button>
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<img
						style="height: 30rem; width: 45rem"
						src="/images/neda.png"
						alt=""
					/>
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
const toast = useToast();
const loading = ref(false);
const formData = reactive({
	name: "",
	email: "",
	subject: "",
	text: "",
});

async function sendMessage() {
	if (
		formData.email === "" ||
		formData.name === "" ||
		formData.text === "" ||
		formData.subject === ""
	) {
		toast.error("همه‌ی فیلدهارو پر کن!");
	}
	try {
		loading.value = true;
		await $fetch(`${apiBase}/contact-us`, {
			method: "POST",
			body: { ...formData },
			headers: { Accept: "application/json" },
		});
		toast.success("زود پیامت خونده میشه ;)");
	} catch (error) {
		console.log(error);
	} finally {
		loading.value = false;
	}
}
</script>