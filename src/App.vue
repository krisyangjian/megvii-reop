<template>
	<div class="container" style="width:100%;height:100%">
		<el-container class="container-wrap">
			<el-header class="header-wrap" height="50px"><head-layout></head-layout></el-header>
			<el-container class="container-wrap">
				<el-aside class="side-wrap" width="170px"><side-layout></side-layout></el-aside>
				<el-main class="main-wrap"><content-layout></content-layout></el-main>
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
	.header-wrap {
		background-color: #5d6674;
	}
	.side-wrap {
		background-color: #292c36;
	}
	.container-wrap {
		height: 100%;
		flex: 1;
	}
	.container .el-aside {
		overflow-x: hidden;
	}
	.container-wrap .main-wrap {
		overflow: hidden;
		background-color: #eaecf1
	}
</style>
