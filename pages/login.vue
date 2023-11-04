<template>
	<section class="auth_section book_section">
		<div class="container">
			<div class="row mt-5">
				<div class="col-md-4 offset-md-4">
					<AuthOtp v-if="showOtp" />
					<AuthLogin v-else @show-otp-form="() => (showOtp = true)" />
				</div>
			</div>
		</div>
	</section>
</template>
<script setup>
const showOtp = ref(false);
const cellphone = reactive({
	value: null,
});
provide("cellphone", cellphone);
definePageMeta({
	middleware: "guest",
});
</script>