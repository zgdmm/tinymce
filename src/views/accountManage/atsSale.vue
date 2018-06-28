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

#ats-sale .cell {
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
<template>
  <div id="ats-sale" style="padding: 20px">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">账号管理</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">经销商管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>阿特斯人员管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="ats-sale-main">
      <div class="ats-sale-title">阿特斯人员管理</div>
      <el-form :model="params" ref="params" class="ats-sale-form" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="人员名称">
              <el-input v-model="params.userName" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="人员手机号">
              <el-input v-model="params.loginAccount" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="人员角色">
              <el-select v-model="params.roleId" placeholder="请选择" @change="handleSearchRole">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="状态">
              <el-select v-model="valueStatus" style="width:100%" placeholder="请选择" @change="handleStatusChange">
                <el-option v-for="item in optionStatus" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button class="el-button-primary" @click="search">查询</el-button>
            <el-button native-type='reset' @click="reset">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
      <div class="ats-sale-addBtn">
        <el-button class="el-button-primary" @click="addBtn()">新增人员</el-button>
      </div>
  
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="人员名称" prop="userName">
        </el-table-column>
        <el-table-column label="人员手机号" prop="loginAccount">
        </el-table-column>
        <el-table-column label="人员角色" prop="roleName">
        </el-table-column>
        <el-table-column label="状态" prop="userStatus">
          <template slot-scope="scope">
            {{scope.row.userStatus==0?'禁用':'启用'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="operation">
          <template slot-scope="scope">
            <el-button v-if="scope.row.userStatus==1" @click="statusChange(scope.row)" round type="text" size="small">
              禁用
            </el-button>
            <el-button v-if="scope.row.userStatus==0" @click="statusChange(scope.row)" round type="text" size="small">
              启用
            </el-button>
            <el-button round type="text" @click="getUserByCode(scope.row)" size="small">修改
            </el-button>
            <el-button round type="text" @click="handleDel(scope.row)" size="small">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增用户 -->
    <el-dialog :before-close="handleClose" width="40%" title="新增人员" :visible.sync="dialogFormVisible">
      <el-form :model="ruleFormAdd" :rules="rules" ref="ruleFormAdd" label-width="130px" class="demo-ruleForm">
        <el-form-item label="人员角色" prop="roleCode">
          <el-select v-model="value" placeholder="请选择" @change="handleNodeClick">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="人员名称" prop="userName">
          <el-input placeholder="请输入" v-model="ruleFormAdd.userName"></el-input>
        </el-form-item>
        <el-form-item label="人员手机号" prop="loginAccount">
          <el-input placeholder="请输入" v-model="ruleFormAdd.loginAccount"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleFormAdd')">确定</el-button>
          <el-button @click="resetForm('ruleFormAdd')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 修改用户 -->
    <el-dialog :before-close="handleCloseEdit" width="40%" title="修改人员" :visible.sync="editVisible">
      <el-form :model="ruleFormEdit" :rules="rules" ref="ruleFormEdit" label-width="130px" class="demo-ruleForm">
        <el-form-item label="人员角色" prop="roleCode">
          <el-select v-model="ruleFormEdit.roleCode" placeholder="请选择" disabled>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="人员名称" prop="userName">
          <el-input placeholder="请输入" v-model="ruleFormEdit.userName"></el-input>
        </el-form-item>
        <el-form-item label="人员手机号" prop="loginAccount">
          <el-input placeholder="请输入" v-model="ruleFormEdit.loginAccount" disabled></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitEditForm('ruleFormEdit')">确定</el-button>
          <el-button @click="resetEditForm('ruleFormEdit')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ats-sale",
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
        userName: '',   //用户昵称
        loginAccount: '',  //用户登录账号（手机号）
        isAgency: 0,  //是否是经销商,1-是 0-不是,写死传0
        userStatus: '',  //用户启用状态 1-启用0-禁用
        roleId: '',
        pageSize: 10,
        pageNo: 1,
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
      valueStatus: '',
      valueRole: '',
      tableData: [],
      rules: {
        userName: [
          { required: true, message: '请输入人员名称', trigger: 'change' },
          {
              min: 1,
              max: 20,
              message: '人员名称长度不超过20',
              trigger: 'blur'
          }
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
    this.search();
    this.getOptions();
  },

  methods: {
    reset() {
      this.params.userName = '';   //用户昵称
      this.params.loginAccount = '';  //用户登录账号（手机号）
      this.params.isAgency = 0; //是否是经销商,1-是 0-不是,写死传0
      this.params.userStatus = '';  //用户启用状态 1-启用0-禁用
      this.params.roleId = '';
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
    search() {//获取用户列表
      var self = this
      self.$http.post('/user/selectUserByParam', self.params, result => {
        if (result.code == 200) {
          self.totalNum = result.data.totalCount;
          self.tableData = result.data.data;
          // self.currentPage=result.pageNo;
        } else {
          console.log(result.message);
        }
      });
    },
    // 根据角色查询
    handleSearchRole(role) {
      var self = this;
      self.params.roleId = role;
    },
    // 根据状态查询
    handleStatusChange(status) {
      var self = this;
      self.params.userStatus = status;
    },
    //查询重置按钮
    // onSubmit() {
    //   var self = this;
    //   self.search();
    //   console.log('submit!');
    // },

    /*
      *新增
    */
    //新增角色选项
    handleNodeClick(data1) {
      var self = this;
      self.ruleFormAdd.roleCode = data1;
    },
    //新增按钮
    addBtn() {
      this.dialogFormVisible = true
    },
    //新增成员提交
    submitForm(formName) {
      var self = this;
      this.$refs[formName].validate(function (valid) {
        if (valid) {
          self.$http.post('/user/addUser', self.ruleFormAdd, result => {
            if (result.code == 200) {
              console.log(result.message);
              self.dialogFormVisible = false;
              self.search();
            } else {
              console.log(result.message);
            }
          });

        } else {
          // self.$message({
          //     // message: '请正确填写必填字段后提交',
          //     type: 'warning'
          // });
          return false;
        }

      })
    },
    //新增用户-取消按钮
    resetForm(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    },
    //新增弹框关闭
    handleClose(done) {
      this.dialogFormVisible = false;
      this.$refs['ruleFormAdd'].resetFields();
    },

    /*
      *删除
    */
    //根据ID删除成员
    handleDel(row) {
      var self = this;
      self.$confirm('此操作将删除该条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function (value) {
        self.$http.post('/user/deleteOneUser', { "userId": row.userId }, result => {
          console.log(33, result);
          if (result.code == 200) {
            console.log(result.message);
            self.search();
          } else {
            console.log(result.message);
          }
        });
      }).catch(function (value) {
        return;
      });
    },

    /*
      *停用启用
    */
    //设置启用，禁用
    statusChange(row) {
      var self = this;
      var userStatus = row.userStatus;
      self.$http.post('/user/updateStatus', { "userId": row.userId, "userStatus": userStatus == 0 ? 1 : 0 }, result => {
        console.log(33, result);
        if (result.code == 200) {
          console.log(result.message);
          self.search();
        } else {
          console.log(result.message);
        }
      });
    },


    /*
      *修改
    */
    //根据ID编辑成员回显
    getUserByCode(row) {
      var self = this;
      self.editUserId = row.userId;
      self.$http.post('user/selectByCode', { "userId": row.userId }, result => {
        if (result.code == 200) {
          self.editVisible = true;
          self.ruleFormEdit.userName = result.data.userName;
          self.ruleFormEdit.roleCode = result.data.roleCode;
          self.ruleFormEdit.loginAccount = result.data.loginAccount;
        } else {
          console.log(result.message);
        }
      });
    },
    //编辑成员提交
    submitEditForm() {
      console.log(22);
      var self = this;
      self.ruleFormEdit.userId = self.editUserId;
      self.$http.post('/user/updateUser', self.ruleFormEdit, result => {
        if (result.code == 200) {
          console.log(result.message);
          self.editVisible = false;
          self.search();
        } else {
          console.log(result.message);
        }
      });
    },
    //编辑弹框关闭
    handleCloseEdit(done) {
      this.editVisible = false;
      this.$refs['ruleFormEdit'].resetFields();
    },
    //编辑用户-取消按钮
    resetEditForm(formName) {
      this.editVisible = false;
      this.$refs[formName].resetFields();
    },

  }
}
</script>
