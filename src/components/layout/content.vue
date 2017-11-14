<template>
	<div class="content">
		<div style="height:20px;">
      <span>当前位置：</span>
			<el-breadcrumb separator-class="el-icon-arrow-right">
  				<el-breadcrumb-item :to="{ path: '/' }">人像检索</el-breadcrumb-item>
  				<el-breadcrumb-item>选项1</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div style="float: right; margin-top: 20px;">
			<el-button type="primary" icon="el-icon-upload" @click="dialogVisible=true">新建底库</el-button>
		</div>
    <div class="search">
      <div style="text-align:right;">
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
  		<div class="lib-pagination">
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
              <div class="share-people" @click="select0Visible = true"><i class="el-icon-caret-bottom"></i></div>
            </div>
          </div>
  			</slot>
  			<span slot="footer" class="dialog-footer">
    			<el-button type="primary" @click="dialogVisible = false">完  成</el-button>
  			</span>
		  </el-dialog>
    </div>
    <div class="selectDialog0">
      <el-dialog
        :fullscreen="true"
        :modal="false"
        :visible.sync="select0Visible">
        <slot title="title"><div class="select-title" @click="select0Visible=false"><i class="el-icon-arrow-left"></i><span>选择共享人员</span></div></slot>
        <slot>
          <div class="select-area">
            <div class="select-cater"><el-checkbox v-model="allChecked">全部人员共享</el-checkbox></div>
            <div class="select-cater" v-bind:class="{ noselect: allChecked }" @click="selectTree=true">指定部门共享</div>
            <div class="select-cater" v-bind:class="{ noselect: allChecked }" @click="selectTree=true">指定人员共享</div>
          </div>
          <div class="select-tree" v-show="selectTree">
            <el-tree
              :data="dataTree"
              node-key="id"
              show-checkbox
              @check-change="handleCheckChange">
          </el-tree>
          </div>
        </slot>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="startUpload">确定</el-button>
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
    <div class="uploadingDialog">
      <el-dialog
        :modal="false"
        :visible.sync="uploadingVisible">
        <div slot="title" class="uploading-title">正在上传1项内容<i class="el-icon-arrow-down" @click="normalLayer=!normalLayer"></i></div>
        <slot>
          <div v-show="normalLayer">
            <div class="remain-time">
              <div class="remain-time-text">还剩下1小时29分</div>
            </div>
            <div class="remain-status">
              <div class="remain-item">上传图片0</div>
            </div>
          </div>
        </slot>
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
          			date: '2016-05-01',
          			name: '王小虎',
          			address: '上海市普陀区金沙江路 1519 弄'
        		}, {
          			date: '2016-05-01',
          			name: '王小虎',
          			address: '上海市普陀区金沙江路 1519 弄'
        		}, {
          			date: '2016-05-01',
          			name: '王小虎',
          			address: '上海市普陀区金沙江路 1519 弄'
        		}, {
          			date: '2016-05-01',
          			name: '王小虎',
          			address: '上海市普陀区金沙江路 1519 弄'
        		}, {
          			date: '2016-05-01',
          			name: '王小虎',
          			address: '上海市普陀区金沙江路 1519 弄'
        		}],
        dialogVisible: false,
        dialogUploadVisible: false,
        select0Visible: false,
        uploadingVisible: false,
        normalLayer: true,
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
          year: '',
          status: '',
          type: ''
        },
        allChecked: false,
        selectTree: false,
        dataTree: [{
          id: 1,
          label: '一级 2',
          children: [{
            id: 3,
            label: '二级 2-1',
            children: [{
              id: 4,
              label: '三级 3-1-1'
            }, {
              id: 5,
              label: '三级 3-1-2'
            }]
          }, {
            id: 2,
            label: '二级 2-2',
            children: [{
              id: 6,
              label: '三级 3-2-1'
            }, {
              id: 7,
              label: '三级 3-2-2'
            }]
          }]
        }]
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
        this.uploadingVisible = true;
      },
      handleLibTypeChange(model) {
      },
      handleSizeChange() {},
      handleCurrentChange(model) {
        console.log(model)
      },
      handleCheckChange() {

      }
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
    width: 330px;
    float: left;
    height: calc(100% - 50px);
    margin-top: 30px;
    margin-right: 20px;
  }
  .content .lib-data-table {
  	position: relative;
    overflow: hidden;
    margin-top: 90px;
    height: calc(100% - 110px);
  }
  .content .lib-data-table .el-table {
    border: 1px solid #c7c7ca;
    height: 100%;
    background-color: #ffffff;
  }
  .content .search .search-form {
  	margin-top: 20px;
    padding: 40px 20px;
    overflow-y: auto;
    overflow-x: hidden;
    height: calc(100% - 142px);
    background-color: #ffffff;
    border: 1px solid #c7c7ca;
  }
	.newLibDialog, .selectDialog0 {
		position: relative;
	}
  .newLibDialog .el-dialog, .selectDialog0 .el-dialog{
    float: right;
  }
  .selectDialog0 .el-dialog__wrapper .el-dialog.is-fullscreen {
    width: fit-content;
  }
  .selectDialog0 .el-dialog__wrapper .el-dialog__body {
    /*width: 320px;*/
    overflow: hidden;
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
  .lib-data-table .el-table__body-wrapper {
  	height: calc(100% - 100px)
  }
  .lib-data-table .el-table__header-wrapper {
  	height: 48px;
  }
  .share-people {
    height: 38px;
    border: 1px solid #d8dce5;
    cursor: pointer;
    text-align: right;
  }
  .select-area {
    border: 1px solid #c7c7ca;
    border-bottom: none;
    float: left;
    width: 318px;
  }
  .select-area .el-dialog__footer {
    position: absolute;
    bottom: 0px;
    right: 0px;
  }
  .select-title {
    font-size: 16px;
    position: absolute;
    top: 8px;
    left: 10px;
    cursor: pointer;
  }
  .select-area .select-cater{
    padding: 0px 10px;
    height: 85px;
    line-height: 100px;
    border-bottom: 1px solid #c7c7ca;
    cursor: pointer;
  }
  .select-tree {
    background-color:#eaeaea;
    width:322px;
    height:400px;
    float:right;
  }
  .select-tree .el-tree {
    background-color: #eaeaea;
  }
  .select-area .select-cater.noselect {
    background-color: #cbd4d1;
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
  .uploadDialog .el-dialog {
    min-width: 550px;
  }
  .uploadDialog .el-upload-list .el-upload-list__item-name {
    /*margin-right: 0px;*/
  }
  .newLibDialog .dialog-fade-enter-active {
    animation: new-dialog-fade-in .2s;
  }
  .newLibDialog .dialog-fade-leave-active{
    animation: new-dialog-fade-out .2s;
  }
  .selectDialog0 .dialog-fade-enter-active {
    animation: select-dialog-fade-in .2s;
  }
  .selectDialog0 .dialog-fade-leave-active {
    animation: select-dialog-fade-out .2s;
  }
  .uploadingDialog .uploading-title {
    font-size: 14px;
    color: #ffffff;
  }
  .uploadingDialog .el-dialog__header{
    background-color: black;
  }
  .uploadingDialog .el-dialog {
    position: absolute;
    bottom: 15px;
    right: 15px;
    width: 350px;
    margin: 0;
  }
  .uploadingDialog .el-icon-arrow-down {
    float: right;
    margin-right: 50px;
    /*margin-top: 2px;*/
    font-size: 18px;
    cursor: pointer;
  }
  .uploadingDialog .remain-time {
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    background-color: #eaeaea;
  }
  .uploadingDialog .remain-time-text {
    font-size: 13px;
  }
  .uploadingDialog .el-dialog__body {
    padding: 0;
  }
  .uploadingDialog .remain-status {
    background-color: #ffffff;
    padding: 0 10px;
  }
  .uploadingDialog .remain-status .remain-item {
    height: 50px;
    line-height: 50px;
    font-size: 12px;
    color: #a3a5aa;
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
  @keyframes select-dialog-fade-in {
    0% {
      transform: translate3d(450px, 0, 0);
      opacity: 1;
    }
    100% {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }
  @keyframes select-dialog-fade-out {
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