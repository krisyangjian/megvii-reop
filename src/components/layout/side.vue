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
          background-color="transparent"
          text-color="#fff"
          :collapse="isCollapse"
          >
      			<el-submenu index="1">
        			<template slot="title"><i class="el-icon-caret-bottom"></i><span>人像检索</span></template>
        			<el-menu-item index="1-1">选项1</el-menu-item>
        			<el-menu-item index="1-2">选项2</el-menu-item>
      			</el-submenu>
      			<el-submenu index="2">
        			<template slot="title"><i class="el-icon-caret-bottom"></i><span>资源管理</span></template>
          		<el-menu-item index="2-1">选项1</el-menu-item>
          		<el-menu-item index="2-2">选项2</el-menu-item>oup>
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
        this.isClose = !this.isClose;
        // this.isCollapse = !this.isCollapse;
      }
		}
	}	
</script>

<style>
  .sidebar .menu-wrap{
    /*-webkit-transition: all .3s;*/
    overflow: hidden;
  }
  .sidebar .menu-wrap.close {
    /*-webkit-transition: all .3s;*/ 
    height: 0px;
  }
  .sidebar .collapse-btn {
    height: 42px;
    line-height: 42px;
    font-size: 18px;
    text-align: center;
    background-color: #424d5a;
    cursor: pointer;
    /*display: none;*/
  }
  .sidebar .collapse-btn i {
    color: #fff;
    margin-left: -9px;
  }
	.menu-megvii.el-menu {
		border-right: none;
	}
	.menu-megvii .el-submenu .el-menu-item {
		min-width: 170px;
	}
  .menu-megvii .el-submenu__title i {
    color: #fff;
  }
  .menu-megvii .el-submenu__title .el-submenu__icon-arrow {
    display: none;
  }
</style>