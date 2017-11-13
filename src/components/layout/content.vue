<template>
	<div class="content">
		<div>
      <span>当前位置：</span>
			<el-breadcrumb separator-class="el-icon-arrow-right">
  				<el-breadcrumb-item :to="{ path: '/' }">人像检索</el-breadcrumb-item>
  				<el-breadcrumb-item>选项1</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div style="float:right;margin-bottom:33px;display: none;">
			<el-button type="primary" icon="el-icon-upload" @click="dialogVisible = true">新建底库</el-button>
		</div>
    <div class="search">
      <div style="">
        <el-button type="primary">查询</el-button>
      </div>
      <div class="search-form">
          <el-form ref="form" :model="form" label-width="90px">
            <el-form-item label="使用权限：">
              <el-select v-model="form.year" placeholder="全部">
                <el-option label="有" value="1"></el-option>
                <el-option label="无" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态：">
              <el-select v-model="form.status" placeholder="全部">
                <el-option label="正常" value="normal"></el-option>
                <el-option label="上传中" value="uploading"></el-option>
                <el-option label="上传失败" value="upload-failed"></el-option>
                <el-option label="入库中" value="ing"></el-option>
                <el-option label="入库失败" value="in-failed"></el-option>
              </el-select>              
            </el-form-item>
            <el-form-item label="底库类型：">
              <el-select v-model="form.type" placeholder="全部">
                <el-option label="布控库" value="shanghai"></el-option>
                <el-option label="静态库" value="beijing"></el-option>
              </el-select>              
            </el-form-item>
            <el-form-item label="底库名称：">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-form>
      </div>
    </div>
		<div class="lib-data-table">  
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
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text">日志</el-button>
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">更多<i class="el-icon-arrow-down el-icon--right"></i></span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="a">批量上传</el-dropdown-item>
                  <el-dropdown-item command="b">修改</el-dropdown-item>
                  <el-dropdown-item command="c">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
  			</el-table>
  		</div>

    <div class="lib-pagination" style="display: none;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage2"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next"
        :total="1000"
        ></el-pagination>
    </div>
    <div class="newLibDialog">
		  <el-dialog
  			title="新建底库"
  			:visible.sync="dialogVisible"
  			width="25%"
  			:fullscreen="true">
  			<slot>
  				<div class="lib-name">
  					<span>底库名称：</span><el-input placeholder="2-12汉字"></el-input>
  				</div>
          <div>
            <span>底库类型：</span>
            <el-radio-group v-model="radio" @change="handleLibTypeChange">
              <el-radio :label="1">布控库</el-radio>
              <el-radio :label="2">静态库</el-radio>
            </el-radio-group>
          </div>
          <div v-show="radio == 1">
            <div class="lib-level">
              <span>底库级别：</span>
              <div>
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">                  
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="lib-sound">
            <span>报警声音：</span>
            <div>
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">                  
                </el-option>
              </el-select>
              <el-switch
                  v-model="value2"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
              </el-switch>
            </div>
            </div>
            <div>
              <span>比对阈值：</span>
              <el-slider v-model="value3"></el-slider>
            </div>
          </div>
          <div v-show="radio == 2">
            <div>
              <span>共享人员：</span>
              <div>
                <el-select v-model="value" placeholder="请选择">
                </el-select>
              </div>
            </div>
          </div>
  			</slot>
  			<span slot="footer" class="dialog-footer">
    			<el-button type="primary" @click="dialogVisible = false">完  成</el-button>
  			</span>
		  </el-dialog>
    </div>
    <div class="uploadDialog">
      <el-dialog
        title="批量上传"
        :visible.sync="dialogUploadVisible">
        <slot>
          <el-upload
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
              ref="upload"
              :auto-upload="false">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </slot>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="startUpload">确定</el-button>
          <el-button type="default" @click="dialogUploadVisible = false">取消</el-button>
        </span>
      </el-dialog>
    </div>
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
        dialogVisible: false,
        dialogUploadVisible: false,
        radio: 1,
        options: [{
          value: '选项1',
          label: '1'
        }, {
          value: '选项2',
          label: '2'
        }],
        value: '',
        value1: true,
        value2: true,
        value3: 10,
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }			
			}
		},
		components: {
		},
		methods: {
      formatTooltip(val) {
        return val / 100;
      },
      handleClick(row) {
        console.log(row);
      },
      handleCommand(command) {
        if(command == "a") {
          this.dialogUploadVisible = true;
        }
      },
      startUpload() {
        this.$refs.upload.submit();
        this.dialogUploadVisible = false;
      },
      handleLibTypeChange(model) {
      },
      handleSizeChange() {},
      handleCurrentChange(model) {
        console.log(model)
      },
		}
	}		
</script>

<style>
	.content {
		width: 100%;
		height: 100%;
	}
  .content .el-breadcrumb {
    display: inline-block;
  }
  .content .search {
    /*width: 400px;*/
    float: left;
  }
  .content .lib-data-table {
    margin-left: 342px;
  }
  .content .lib-data-table .el-table {
    border: 1px solid #c7c7ca;
  }
  .content .search .search-form {
    padding: 40px 20px;
    background-color: #ffffff;
    border: 1px solid #c7c7ca;
  }
	.newLibDialog {
		position: relative;
	}
  .newLibDialog .el-dialog {
    float: right;
  }
	.newLibDialog .dialog-footer {
		position: absolute;
		bottom: 20px;
		right: 20px;
	}
	.newLibDialog .lib-name .el-input {
		width: 250px;
	}
  .newLibDialog .lib-level .el-input {
    width: 250px;
  }
  .lib-pagination .el-pagination {
    position: absolute;
    right: 14px;
    bottom: 5px;
    z-index: 1000;
  }
  .lib-data-table .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .uploadDialog .el-upload-dragger {
    width: 280px;
  }
  .uploadDialog .el-dialog__body {
    position: relative;
  }
  .uploadDialog .el-upload-list {
    position: absolute;
    left: 310px;
    top: 20px;
  }
  .uploadDialog .el-upload-list .el-upload-list__item-name {
    /*margin-right: 0px;*/
  }
  .newLibDialog .dialog-fade-enter-active {
    animation: new-dialog-fade-in .2s;
  }
  .newLibDialog .dialog-fade-leave-active {
    animation: new-dialog-fade-out .2s;
  }
  @keyframes new-dialog-fade-in {
    0% {
      transform: translate3d(450px, 0, 0);
      opacity: 1;
    }
    100% {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }
  @keyframes new-dialog-fade-out {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(450px, 0, 0);
    opacity: 0;
  }
}
</style>