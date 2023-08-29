<template>
	<section class="auth_section book_section">
		<div class="container">
			<div class="row mt-5">
				<AuthCheckOtp v-if="showCheckOtp" />
				<AuthLogin v-else @show-check-otp-form="() => (showCheckOtp = true)" />
			</div>
		</div>
	</section>
</template>
<script setup>
const showCheckOtp = ref(false);
definePageMeta({
	middleware: "guest",
});
</script>