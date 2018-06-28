<template>
  <div id="product-manage" style="padding: 20px">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">产品管理</el-breadcrumb-item>
      <el-breadcrumb-item>产品管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="ats-sale-main">
      <div class="ats-sale-title">产品管理</div>
      <el-form :model="params" ref="params" class="ats-sale-form" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="产品类型">
              <el-select style="width:100%" v-model="params.productType" placeholder="请选择" @change="handleTypeChange">
                <el-option v-for="item in options" :key="item.value" :label="item.value" :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="产品型号">
              <el-input v-model="params.productModel" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态">
              <el-select style="width:100%" v-model="params.productStatus" placeholder="请选择" @change="handleStatusChange">
                <el-option v-for="item in optionStatus" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-button class="el-button-primary" @click="search">查询</el-button>
            <el-button native-type='reset' @click="reset">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
      <div class="ats-sale-addBtn">
        <el-button class="el-button-primary" @click="addBtn()">新建产品</el-button>
      </div>
  
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="产品图片" prop="imageUrl">
          <template slot-scope="scope">
            <img :src="scope.row.imageUrl" alt="" style="width: 40px;height: 35px;">
          </template>
        </el-table-column>
        <el-table-column label="产品类型" prop="productType">
          <template slot-scope="scope">
            {{scope.row.productName||'--'}}
          </template>
        </el-table-column>
        <el-table-column label="产品型号" prop="productModel">
           <template slot-scope="scope">
            {{scope.row.productModel||'--'}}
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="productModel">
           <template slot-scope="scope">
            {{scope.row.gmtModifiedStr||'--'}}
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="productStatus">
          <template slot-scope="scope">
            {{scope.row.productStatus==0?'禁用':'启用'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="operation">
          <template slot-scope="scope">
            <el-button round @click="handleScan(scope.row)" type="text" size="small">
              查看
            </el-button>
            <el-button v-if="scope.row.productStatus==1" @click="statusChange(scope.row)" round type="text" size="small">
              禁用
            </el-button>
            <el-button v-if="scope.row.productStatus==0" @click="statusChange(scope.row)" round type="text" size="small">
              启用
            </el-button>
            <el-button v-if="scope.row.productStatus==0" round type="text" @click="handleEdit(scope.row)" size="small">修改
            </el-button>
            <el-button v-if="scope.row.productStatus==0" round type="text" @click="handleDel(scope.row)" size="small">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="text-align:right;margin-top:18px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.pageNo" :page-sizes="[10, 20, 30, 40]" :page-size="params.pageSize" layout=" sizes, prev, pager, next, jumper" :total="totalCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "product-manage",
  data() {
    var self = this;
    var loginAccountRules = function (rule, value, callback) {
      var newValue = self.ruleFormAdd.loginAccount;
      if (newValue.charAt(0) != '1') {
        callback(new Error('手机号第一位必须是1'));
      } else if (newValue.length != 11) {
        callback(new Error('手机号长度为11位'));
      } else {
        callback();
      }
    };
    return {
      dialogFormVisible: false,
      editVisible: false,
      editUserId: '',
      params: {
        productType: '',   //类型
        productModel: '',  //型号
        productStatus: '',  //状态
        pageNo:1,
        pageSize:10
      },
      ruleFormAdd: {
        userName: '',
        loginAccount: '',
        isAgency: '0',
        roleCode: '',
      },
      ruleFormEdit: {
        userId: '',
        userName: '',
        loginAccount: '',
        isAgency: '0',
        roleCode: '',
      },
      options: [],  //角色下拉框数据
      optionStatus: [{
        value: '0',
        label: '禁用'
      }, {
        value: '1',
        label: '启用'
      }],
      value: '',
      totalCount: 0,//设备数量
      valueStatus: '',
      valueRole: '',
      tableData: [],
      rules: {
        userName: [
          { required: true, message: '请输入人员名称', trigger: 'change' },
        ],
        loginAccount: [
          { required: true, message: '请输入人员手机号', trigger: 'change' },
          { pattern: /^[0-9]\d*$/, message: '请输入正整数' },
          { type: 'number', validator: loginAccountRules, trigger: 'change' },
        ],
        roleCode: [
          { required: true, message: '请选择人员角色', trigger: 'change' },
        ],
      },
    }
  },
  mounted() {
    this.getDeviceType();
    this.search();
  },
  methods:{
    reset() {
      this.params.productType = '';
      this.params.productModel = '';
      this.params.productStatus = '';
    },
    // 禁用 启用
    statusChange(row){
      let self = this;
      console.log(row.productStatus,'productStatus');
      row.productStatus = (row.productStatus=='0'?'1':'0');
      console.log(row.productStatus,'productStatus')
      this.$http.post('/product/updateState.json', {productCode:row.productCode,productStatus:row.productStatus}, result => {
        if (result.code == 200) {
          self.$message({
            message: row.productStatus=='0'?'禁用成功':'启用成功',
            type: 'warning'
          });
          self.search();
          console.log(result.message);

        } else {
          self.$message({
            message: result.message,
            type: 'warning'
          });
        }
      });
    },
    // 产品类型
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

    },
    
    /*分页*/
    handleSizeChange(val) {
      this.params.pageSize = val;
    },
    handleCurrentChange(val) {
      this.params.pageNo = val;
    },
    // 查看
    handleScan(row){
      this.$router.push({ path: 'productDetail',query:{
        productCode:row.productCode
      } })
    },
    // 修改
    handleEdit(row){
      this.$router.push({ path: 'productNew',query:{
        productCode:row.productCode
      } })
    },
    // 产品类型变化
    handleTypeChange(status){
      var self = this;
      self.params.productType = status;
    },
    handleStatusChange(status) {
      var self = this;
      self.params.productStatus = status;
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
        self.delItem(row.productCode);
      }).catch(function (value) {
        return;
      });
    },
     //查询列表
    search() {//获取设备列表
      this.loading = false;
      var self = this;
      self.$http.post('/product/selectProductByParam.json', self.params, result => {
        if (result.code == 200) {
          self.totalCount = result.data.totalCount;
          self.tableData = result.data.data;
          // self.currentPage=result.pageNo;
        } else {
          self.$message({
            message: result.message,
            type: 'warning'
          });
          console.log(result.message);
        }
      });
    },
    // 删除设备
    delItem(productCode) {
      var self = this;
      self.$http.post('/product/deleteByCode.json', { "productCode": productCode }, result => {
        if (result.code == 200) {
          self.$message({
            message: result.message,
            type: 'success'
          });
          console.log(result.message);
          self.search();
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
    // 新增人员
    addBtn(){
      this.$router.push({
                    name: 'productNew',
                    query: {
                        productCode: '',
                    }
                })
    },
  },
  watch: {
    "params.pageSize": function (newVal) {
      this.params.pageSize = newVal;
      this.search();
    },
    "params.pageNo": function (newVal) {
      this.params.pageNo = newVal;
      this.search(newVal);
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

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

#product-manage .cell {
  text-align: center;
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
  /*border-bottom: 1px solid #F4F4F4;*/
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
