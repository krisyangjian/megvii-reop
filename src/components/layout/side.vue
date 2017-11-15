<template>
	<div class="sidebar">
		<div class="collapse-btn" 
      @click="collapseClick">
      <i class="el-icon-tickets"></i>
    </div>
		<div 
      :class="{
        'menu-wrap': true,
        'close': isClose
      }">
    		<el-menu
          class="menu-megvii"
          background-color="#5d6674"
          text-color="#fff"
          :collapse="isCollapse"
          >
      			<el-submenu index="1">
        			<template slot="title"><i class="el-icon-location"></i><span>人像检索</span></template>
        			<el-menu-item index="1-1">选项1</el-menu-item>
        			<el-menu-item index="1-2">选项2</el-menu-item>
      			</el-submenu>
      			<el-submenu index="2">
        			<template slot="title"><i class="el-icon-menu"></i><span>资源管理</span></template>
          		<el-menu-item index="2-1">选项1</el-menu-item>
          		<el-menu-item index="2-2">选项2</el-menu-item>
      			</el-submenu>
    		</el-menu>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'side',
		data() {
			return{
				isClose: false,
        isCollapse: false
			}
		},
		components: {
		},
		methods: {
      collapseClick() {
        // this.isClose = !this.isClose;
        this.isCollapse = !this.isCollapse;
      }
		}
	}	
</script>

<style>
  .sidebar {
    float: left;
    height: 100%;
    background-color: #5d6674;
  }
  .sidebar .menu-wrap{
    background-color: #5d6674;
    overflow: hidden;
  }
  .sidebar .menu-megvii:not(.el-menu--collapse) {
    width: 200px;
  }
  .sidebar .menu-wrap .el-menu {
    background-color: #292c36;
  }
  .sidebar .menu-wrap.close {
    height: 0px;
  }
  .sidebar .collapse-btn {
    height: 42px;
    line-height: 42px;
    font-size: 18px;
    text-align: center;
    background-color: #424d5a;
    cursor: pointer;
    text-align: center;
  }
  .sidebar .collapse-btn i {
    color: #fff;
    /*margin-left: -9px;*/
  }
	.menu-megvii.el-menu {
		border-right: none;
	}
  .menu-megvii .el-submenu__title i {
    color: #fff;
  }
</style>