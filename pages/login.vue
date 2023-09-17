<template>
	<AuthCheckOtp v-if="showOtp" />
	<AuthLogin v-else @showOtpForm="() => (showOtp = true)" />
</template>
<script setup>
const showOtp = ref(false);
</script>