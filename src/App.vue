<template>
	<div class="container">
		<div class="head-wrap">
			<head-layout></head-layout>
		</div>
		<div class="content-wrap">
			<side-layout></side-layout>
			<content-layout></content-layout>
		</div>
	</div>
</template>
<script>
	import HeadLayout from './components/layout/head.vue';
	import SideLayout from './components/layout/side.vue';
	import ContentLayout from './components/layout/content.vue';

	export default {
		name: 'app',
		data() {
			return{
			}
		},
		components: {
			HeadLayout,
			SideLayout,
			ContentLayout,
		},
		methods: {
		}
	}
</script>
<style>
	.container {
		width:100%;
		height:100%
	}
	.head-wrap {
		height: 50px;
		background-color: $--background-color-head;
	}
	.content-wrap {
		display: flex;
		height: calc(100% - 50px);
		overflow: hidden;
	}
</style>
