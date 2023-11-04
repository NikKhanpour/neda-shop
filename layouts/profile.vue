<template>
	<section class="profile_section layout_padding">
		<div class="container">
			<div class="row">
				<div class="col-sm-12 col-lg-3">
					<ul class="list-group">
						<li class="list-group-item">
							<NuxtLink to="/profile">اطلاعات کاربر</NuxtLink>
						</li>
						<li class="list-group-item">
							<NuxtLink to="/profile/addresses">آدرس ها</NuxtLink>
						</li>
						<li class="list-group-item">
							<NuxtLink to="/profile/orders">سفارشات</NuxtLink>
						</li>
						<li class="list-group-item">
							<NuxtLink to="/profile/transactions">تراکنش ها</NuxtLink>
						</li>
						<li class="list-group-item">
							<div @click="logout">خروج</div>
						</li>
					</ul>
				</div>
				<div class="col-sm-12 col-lg-9">
					<slot />
				</div>
			</div>
		</div>
	</section>
</template>
<script setup>
import { useToast } from "vue-toastification";

const toast = useToast();
const { authUser } = useAuth();
async function logout() {
	try {
		await $fetch("/api/auth/logout", {
			method: "POST",
			headers: useRequestHeaders(["cookie"]),
		});
		toast.warning("از اکانتت خارج شدی :(");
		authUser.value = null;
		return navigateTo("/");
	} catch (error) {
		console.log(error.data.data.message);
	}
}
</script>