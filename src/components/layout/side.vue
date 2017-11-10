<template>
	<div class="side">
		<div style="background-color: blue">menu header</div>
		<div>
    		<el-menu :default-openeds="['1']">
      			<el-submenu index="1">
        			<template slot="title"><i class="el-icon-message"></i>导航一</template>
        			<el-menu-item index="1-1">选项1</el-menu-item>
        			<el-menu-item index="1-2">选项2</el-menu-item>
<!--         			<el-menu-item-group>
          				<el-menu-item index="1-1">选项1</el-menu-item>
          				<el-menu-item index="1-2">选项2</el-menu-item>
        			</el-menu-item-group> -->
<!--         			<el-menu-item-group title="分组2">
          				<el-menu-item index="1-3">选项3</el-menu-item>
        			</el-menu-item-group> -->
<!--         			<el-submenu index="1-4">
          				<template slot="title">选项4</template>
          				<el-menu-item index="1-4-1">选项4-1</el-menu-item>
        			</el-submenu> -->
      			</el-submenu>
<!--       			<el-submenu index="2">
        			<template slot="title"><i class="el-icon-menu"></i>导航二</template>
        			<el-menu-item-group>
          				<template slot="title">分组一</template>
          				<el-menu-item index="2-1">选项1</el-menu-item>
          				<el-menu-item index="2-2">选项2</el-menu-item>
        			</el-menu-item-group>
        			<el-menu-item-group title="分组2">
          				<el-menu-item index="2-3">选项3</el-menu-item>
        			</el-menu-item-group>
        			<el-submenu index="2-4">
          				<template slot="title">选项4</template>
          				<el-menu-item index="2-4-1">选项4-1</el-menu-item>
        			</el-submenu>
      			</el-submenu> -->
    		</el-menu>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'side',
		data() {
			return{
				message: 'yangjian'
			}
		},
		components: {
		},
		methods: {
		}
	}	
</script>

<style>
	.side .el-menu {
		border-right: none;
		background-color: transparent;
		/*border-right: solid 1px #333333;*/
	}
	.side .el-submenu .el-menu-item {
		min-width: 170px;
	}
</style>