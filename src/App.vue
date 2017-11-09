<template>
	<div class="container">
		<logo-layout></logo-layout>
		<!-- <header-layout @changePassword='changePwd' @callback="callback" @hideHeader="hideHeader" :isShow="isShow"></header-layout> -->
		<content-layout></content-layout>
		<footer-layout></footer-layout>
	</div>
</template>
<script>
	import LogoLayout from '@/components/layout/logo';
	import FooterLayout from '@/components/layout/footer';
	import ContentLayout from '@/components/layout/content';
	export default {
		name: 'app',
		data() {
			return{

			}
		},
		components: {
			LogoLayout,
			FooterLayout,
			ContentLayout,
		},
		methods: {
		},
		created() {}
	}
</script>
<style>
</style>
