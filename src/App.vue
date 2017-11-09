<template>
	<div class="container" style="width:100%;height:100%">
		<el-container>
			<el-header><head-layout></head-layout></el-header>
			<el-container>
				<el-aside width="200px"><side-layout></side-layout></el-aside>
				<el-main><content-layout></content-layout></el-main>
			</el-container>			
		</el-container>
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
				message: 'yangjian'
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
</style>
