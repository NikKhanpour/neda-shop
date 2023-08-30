<template>
	<NuxtLayout name="profile">
		<NuxtPage />
	</NuxtLayout>
</template>
<script setup>
definePageMeta({
	middleware: "logged-out",
});
</script>