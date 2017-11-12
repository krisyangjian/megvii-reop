<template>
	<div class="content">
		<div>
			<el-breadcrumb separator-class="el-icon-arrow-right">
  				<el-breadcrumb-item :to="{ path: '/' }">人像检索</el-breadcrumb-item>
  				<el-breadcrumb-item>选项1</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div style="float:right;margin-bottom:50px;">
			<el-button type="primary" icon="el-icon-upload" @click="dialogVisible = true">新建底库</el-button>
		</div>
		<div>  
			<el-table
    			:data="tableData"
    			stripe
    			style="width: 100%">
    			<el-table-column
      				prop="date"
      				label="日期"
      				width="180">
    			</el-table-column>
    			<el-table-column
      				prop="name"
      				label="姓名"
      				width="180">
    			</el-table-column>
    			<el-table-column
      				prop="address"
      				label="地址">
    			</el-table-column>
  			</el-table>
  		</div>

		<el-dialog
  			title="新建底库"
  			:visible.sync="dialogVisible"
  			width="25%"
  			:fullscreen="true"
  			customClass="newLibDialog">
  			<slot>
  				<div>
  					<span>底库名称：</span><el-input placeholder="2-12汉字"></el-input>
  				</div>
  			</slot>
  			<span slot="footer" class="dialog-footer">
    			<el-button type="primary" @click="dialogVisible = false">完  成</el-button>
  			</span>
		</el-dialog>
  	</div>
</template>
<script>
	export default {
		name: 'content',
		data() {
			return{
				tableData: [{
					date: '2016-05-02',
          			name: '王小虎',
          			address: '上海市普陀区金沙江路 1518 弄'
        		}, {
        			date: '2016-05-04',
          			name: '王小虎',
          			address: '上海市普陀区金沙江路 1517 弄'
        		}, {
          			date: '2016-05-01',
          			name: '王小虎',
          			address: '上海市普陀区金沙江路 1519 弄'
        		}, {
          			date: '2016-05-03',
          			name: '王小虎',
          			address: '上海市普陀区金沙江路 1516 弄'
        		}],
        		dialogVisible: false				
			}
		},
		components: {
		},
		methods: {
		}
	}		
</script>

<style>
	.content {
		width: 100%;
		height: 100%;
	}
	.newLibDialog {
		position: relative;
	}
	.newLibDialog .dialog-footer {
		position: absolute;
		bottom: 20px;
		right: 20px;
	}
	.newLibDialog .el-input {
		width: 370px;
	}
</style>