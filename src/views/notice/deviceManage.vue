<template>
  <div id="product-manage" style="padding: 20px">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">产品管理</el-breadcrumb-item>
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="ats-sale-main">
      <div class="ats-sale-title">设备管理</div>
      <el-form :model="params" ref="params" class="ats-sale-form" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="设备类型">
              <el-select style="width: 100%;" v-model="params.deviceType" placeholder="请选择" @change="handleSearchType">
                <el-option v-for="item in options" :key="item.value" :label="item.value" :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="设备型号">
              <el-input v-model="params.deviceModel" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="设备条码号">
              <el-input v-model="params.deviceBarCode" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="项目编号">
              <el-input v-model="params.projectCode" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态">
              <el-select style="width: 100%;" v-model="params.deviceStatus" placeholder="请选择" @change="handleStatusChange">
                <el-option v-for="item in optionStatus" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button class="el-button-primary" @click="handlesearch">查询</el-button>
            <el-button native-type='reset' @click="reset">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
      <div class="ats-sale-addBtn">
        <el-button class="el-button-primary" @click="addBtn()">批量导入</el-button>
        <el-button native-type='reset' :disabled="delStatus" @click="moreDelete()">批量删除</el-button>
      </div>
  
      <el-table v-loading="loading" @selection-change="handleSelectionChange" :data="tableData" style="width: 100%">
        <!--<el-table-column type="selection" width="55">
        </el-table-column>-->
        <el-table-column label="设备类型" prop="deviceName">
          <template slot-scope="scope">
            {{scope.row.deviceName||'--'}}
          </template>
        </el-table-column>
        <el-table-column label="设备型号" prop="deviceModel">
          <template slot-scope="scope">
            {{scope.row.deviceModel||'--'}}
          </template>
        </el-table-column>
        <el-table-column label="设备条码号" prop="deviceBarCode">
          <template slot-scope="scope">
            {{scope.row.deviceBarCode||'--'}}
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="deviceStatus">
          <template slot-scope="scope">
            {{scope.row.deviceStatus==0?'未安装':scope.row.deviceStatus==1?'已安装':'已替换'}}
            <div v-if="scope.row.deviceStatus==2">原因：{{scope.row.replaceReason||'--'}}</div>
          </template>
        </el-table-column>
        <el-table-column label="项目编号" prop="projectCode">
          <template slot-scope="scope">
            {{scope.row.projectCode||'--'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="operation">
          <template slot-scope="scope">
            <el-button v-if="scope.row.deviceStatus==0" round type="text" @click="handleDel(scope.row)" size="small">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="text-align:right;margin-top:18px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.pageNo" :page-sizes="[10, 20, 30, 40]" :page-size="params.pageSize" layout=" sizes, prev, pager, next, jumper" :total="totalCount">
        </el-pagination>
      </div>
      <!--国家导入弹出框 -->
      <el-dialog class="piLiangDialog" :visible.sync="dialogFormVisible" size="tiny" :close-on-click-modal=false @close="search">
        <el-form :model="countryFormData" :rules="countryRules" ref="countryForm" label-width="220px" v-loading="loading" element-loading-text="上传中">
          <el-form-item label="请选择要上传的文件" prop="shangChuanNeiRong">
            <el-upload name="fileName" class="upload-demo" action="/device/importDevice.json" :multiple="false" :data="fileCountryData" :on-success="fileListSuccess" :on-error="fileListCountryError" :on-remove="fileCountryRemove" :before-upload="neiRongCountryBeforeUpload" :file-list="countryFormData.shangChuanNeiRong">
              <el-button class="el-button-reset" type="primary" size="small">选择文件</el-button>
              <div slot="tip" class="el-upload__tip">(限制5M含excel、xls)</div>
            </el-upload>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// import $ from 'jQuery';
export default {
  name: "product-manage",
  data() {
    var self = this;
    return {
      loading: true,//是否显示加载
      delStatus: true,
      multipleSelection: [],
      dialogFormVisible: false,
      editVisible: false,
      editUserId: '',
      params: {
        deviceType: '',   //	设备类型
        deviceModel: '',  //设备型号
        deviceBarCode: '', //条形码
        deviceStatus: '',  //设备状态 0未安装 1已安装 2已替换
        projectCode: '',  //项目编号
        pageSize: 10,
        pageNo: 1,
      },
      totalCount: 0,//设备数量
      //设备类型下拉框数据
      options: [
        // {
        //   value: '1',
        //   label: '组件'
        // }, {
        //   value: '2',
        //   label: '逆变器'
        // }, {
        //   value: '3',
        //   label: '配电箱'
        // }, {
        //   value: '4',
        //   label: '交流电缆'
        // }, {
        //   value: '5',
        //   label: '接地电缆'
        // }, {
        //   value: '6',
        //   label: '直流电缆'
        // }, {
        //   value: '7',
        //   label: '直流连接器'
        // }, {
        //   value: '8',
        //   label: '支架组合'
        // }, {
        //   value: '9',
        //   label: '其他1'
        // }, {
        //   value: '10',
        //   label: '其他2'
        // }
      ],
      //设备状态下拉框数据 0未安装 1已安装 2已替换
      optionStatus: [
        {
          value: '0',
          label: '未安装'
        }, {
          value: '1',
          label: '已安装'
        }, {
          value: '2',
          label: '已替换'
        }
      ],
      value: '',
      valueStatus: '',
      valueRole: '',
      tableData: [],
      fileCountryData: {

      },
      rules: {
        userName: [
          { required: true, message: '请输入人员名称', trigger: 'change' },
        ],
        loginAccount: [
          { required: true, message: '请输入人员手机号', trigger: 'change' },
          { pattern: /^[0-9]\d*$/, message: '请输入正整数' },
        ],
        roleCode: [
          { required: true, message: '请选择人员角色', trigger: 'change' },
        ],
      },
      deviceCode: '',
      // 国家表单数据
      countryFormData: {
        // upload: '',
        shangChuanNeiRong: []
      },
      // 校验数据
      rules: {
        // 文件类型
        fileType: [
          { required: true, message: '请选择文件' }
        ],
      },
      // 国家校验数据
      countryRules: {
        // 文件类型
        fileType: [
          { required: true, message: '请选择正确的文件类型' }
        ]
      },
      fileData: {
        // type : 'ts'
      },
      fileCountryData: {

      },
      dialogCountryVisible: false, // 国家弹出框
    }

  },

  mounted() {
    this.getDeviceType();
    this.search();
  },

  methods: {
    reset() {
      this.params.deviceType = '';
      this.params.deviceModel = '';
      this.params.deviceStatus = '';
      this.params.deviceBarCode = '';
      this.params.projectCode = '';
    },
    // 上传内容 国家上传失败
    fileListCountryError: function (err, file, fileList) {
      this.$message({
        message: '上传失败',
        type: 'error'
      });
    },
    handlesearch() {
      if (this.params.pageNo != 1) {
        this.params.pageNo = 1;
      } else {
        this.search();
      }

    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.deviceCode = ''
      for (var i = 0; i < val.length; i++) {
        this.deviceCode += val[i].deviceCode + ',';
      }
      if (this.deviceCode) {//根据deviceCode判断批量删除按钮状态
        this.delStatus = false;
        // this.background = '#F37327';
      } else {
        this.delStatus = true;
        // this.background = '#f3d19e';
      }
    },
    // 批量导入
    addBtn() {
      // index, row
      this.dialogFormVisible = true;
    },
    // 国家导入
    insertCountryFile() {
      this.dialogCountryVisible = true;
    },
    // 国家上传前回调
    neiRongCountryBeforeUpload: function (file) {
      let type = true;

      let nameArr = file.name.split('.');
      let name = nameArr[nameArr.length - 1];
      // 校验 格式
      if (['xlsx', 'xls'].indexOf(name) === -1) {
        type = false;
        this.$message.warning('上传格式错误');
        return type;
      }

      // 校验大小
      if (file.size / 1024 / 1024 > 5) {
        type = false;
        this.$message.warning('大小限制');
        return type;
      }

      this.countryFormData.shangChuanNeiRong.forEach((v, k) => {
        if (v.name === file.name) {
          type = false;
          this.$message.warning('文件上传重复');
        }
      });

      if (type) {
        this.loading = false;
      }

      return type;
    },
    // 上传的通用方法
    updateFile: function (data, fileList, type, verify, file) {
      if (data.success) {
        let verifyArr = [];
        fileList.map((v, k) => {
          let nameArr = v.name.split('.');
          let name = nameArr[nameArr.length - 1];
          let arr = verify;
          if (arr.indexOf(name) !== -1) {
            verifyArr.push(v);
          }
        });
        this.countryFormData[type] = verifyArr;
        // 重新校验数据
        this.$refs.countryForm.validateField(type);

      } else {
        // 如果格式存在问题
        this.countryFormData[type] = Object.assign([], this.countryFormData[type]);
      }
      // 解决 同一文件不能多次上传
      // $('[type="file"]').val('');
      this.loading = false;
    },
    // 上传内容 上传成功
    fileListSuccess: function (response, file, fileList) {
      this.updateFile(response, fileList, 'shangChuanNeiRong', ['xlsx', 'xls']);
      // 上传失败，提示
      if (!response.success) {
        let self = this;
        self.$message.warning({
          message: response.message,
          duration: 0,
          showClose: true
        });
      } else {
        console.log(response, 'response')
        if (response.data.exportUrl) {
          this.$confirm('要下载失败文件吗', '导入数据错误',
            { closeOnClickModal: false, }).then(() => {

              window.open(response.data.exportUrl);
            }).catch(() => {

            });
        } else {
          this.$message.success('上传成功');
        };
        this.dialogFormVisible = false;
        this.handlesearch();
      }
    },
    // 上传内容 国家 删除文件  file-当前删除的文件data
    fileCountryRemove: function (file, fileList) {
      this.deleteFile(file, () => {
        this.countryFormData.shangChuanNeiRong = fileList;
      });
    },
    // 删除的通用方法
    deleteFile: function (file, callback) {
      // 解决 ele bug 上传之前也会调用
      if (file) {
        let para = {
          dateFileName: file.response&&file.response.rows[0].dateFileName
        };
        importTrolley(para).then((res) => {
          if (res.data.success == true) {
            callback();
            this.$message.success('删除成功');
          } else {
            if (res.data.message) {
              this.$message.warning(res.data.message);
            }
          }
        }).catch((res) => {
        });
      }
    },
    /*
      *查询
    */
    //角色下拉框数据
    getOptions() {
      var self = this
      self.$http.post('role/selectAll', {}, result => {
        console.log(44, result);
        if (result.code == 200) {
          result.data.map(function (item, index) {
            self.options.push({
              value: item.roleId,
              label: item.roleName,
            })
          });
        } else {
          console.log(result.message);
        }
      });
    },
    //查询列表
    search(page) {//获取设备列表
      this.loading = false;
      var self = this;
      self.$http.post('/device/selectDeviceByParam.json', self.params, result => {
        if (result.code == 200) {
          self.totalCount = result.data.totalCount;
          self.tableData = result.data.data;
        } else {
          self.$message({
            message: result.message,
            type: 'warning'
          });
          console.log(result.message);
        }
      });
    },
    /*分页*/
    handleSizeChange(val) {
      this.params.pageSize = val;
    },
    handleCurrentChange(val) {
      this.params.pageNo = val;
    },
    // 根据设备类型查询
    handleSearchType(type) {
      var self = this;
      self.params.deviceType = type;
    },
    // 根据状态查询
    handleStatusChange(status) {
      var self = this;
      self.params.deviceStatus = status;
    },
    //查询重置按钮
    // onSubmit() {
    //   var self = this;
    //   self.search();
    //   console.log('submit!');
    // },



    /*
      *删除
    */
    //批量删除设备
    moreDelete() {
      var self = this;
      this.$confirm('确认要删除选择的设备?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function (value) {
        self.delItem(self.deviceCode);
      }).catch(function (value) {
        return;
      });
    },
    //根据ID删除设备
    handleDel(row) {
      var self = this;
      console.log(row);
      this.$confirm('此操作将删除该条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function (value) {
        self.delItem(row.deviceCode);
      }).catch(function (value) {
        return;
      });
    },
    // 删除设备
    delItem(deviceCode) {
      var self = this;
      self.$http.post('/device/deleteDevice.json', { "deviceCodes": deviceCode }, result => {
        if (result.code == 200) {
          self.$message({
            message: result.message,
            type: 'success'
          });
          console.log(result.message);
          self.handlesearch();
        } else {
          self.$message({
            message: result.message,
            type: 'warning'
          });
          console.log(result.message);
        }
      });
      this.loading = false;
    },
    // 设备类型
    getDeviceType() {
      var self = this;
      self.$http.post('/device/selectDeviceType.json', {}, result => {
        if (result.code == 200) {
          this.options = result.data;
          console.log(result.message);

        } else {
          self.$message({
            message: result.message,
            type: 'warning'
          });
        }
      });

    }

  },
  watch: {
    "params.pageSize": function (newVal) {
      this.params.pageSize = newVal;
      this.search();
    },
    "params.pageNo": function (newVal) {
      this.params.pageNo = newVal;
      this.search();
    }
  }
}
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.el-dialog {
  width: 540px;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.cell {
  text-align: left;
}

.ats-sale-main {
  background-color: #fff;
  border-radius: 2px;
  margin-top: 10px;
  padding: 20px;
}

.ats-sale-title {
  border-left: 2px solid #409eff;
  text-align: left;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #333333;
  line-height: 14px;
  margin-bottom: 20px;
  padding-left: 10px;
}

.ats-sale-form {
  border-bottom: 1px solid #F4F4F4;
}

.ats-sale-addBtn {
  text-align: left;
  margin-top: 10px;
}

.el-input__inner {
  height: 32px;
  line-height: 32px;
}
</style>
