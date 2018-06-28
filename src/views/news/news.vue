<template>
  <div id="product-manage" style="padding: 20px">
    <div class="ats-sale-title">行业动态管理</div>
    <div class="ats-sale-main">
      <div>
        <div>pc端行业动态</div>
        <div class="ats-sale-addBtn">
          <!--<el-button type="primary" style="margin-bottom: 20px;" @click="insert">导入微信行业动态列表</el-button>-->
        </div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="行业动态标题" min-width="150" prop="articleTitle" show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.title||'--'}}
            </template>
          </el-table-column>
          <!--<el-table-column label="图片" min-width="150" prop="imgsList">
            <template slot-scope="scope">
              <img style="width:30px" :src="scope.row.titleImage" />
            </template>
          </el-table-column>-->
          <!--<el-table-column label="行业动态内容" min-width="150"  prop="articleContent" show-overflow-tooltip>
              <template slot-scope="scope">
                {{scope.row.articleContent||'--'}}
              </template>
            </el-table-column>-->
          <el-table-column label="发布时间" prop="publishTime">
            <template slot-scope="scope">
              {{scope.row.addDateStr||'--'}}
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="operation" min-width="160">
            <template slot-scope="scope">
              <el-button round type="text" @click="handleScan(scope.row,scope.row.id)" size="small">查看
              </el-button>
              <el-button round type="text" @click="insert(scope.row)" size="small">导入微信行业动态列表
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" style="text-align:right;margin-top:18px">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.pageNo" :page-sizes="[10, 20, 30, 40]" :page-size="params.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
          </el-pagination>
        </div>
      </div>
      <div class="txt-right" style="margin-top:20px">
        <el-input style="width:160px" placeholder="输入关键字找一找" prefix-icon="el-icon-search" v-model="articleTitle" @keyup.enter.native="searchBot(1)" @change="setTitle">
        </el-input>
      </div>
      <div>
        <div>微信行业动态</div>
        <div class="ats-sale-addBtn">
          <el-button type="primary" @click="addClick()" style="margin-bottom: 20px;">添加</el-button>
        </div>
        <el-table :data="botList" style="width: 100%">
          <el-table-column label="行业动态标题" min-width="150" prop="articleTitle" show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.articleTitle||'--'}}
            </template>
          </el-table-column>
          <!--<el-table-column label="图片" min-width="150" prop="imgsList">
            <template slot-scope="scope">
              <img style="width:30px" :src="scope.row.imgsList&&scope.row.imgsList[0]&&scope.row.imgsList[0].url" />
            </template>
          </el-table-column>-->
          <!--<el-table-column label="行业动态内容" min-width="150"  prop="articleContent" show-overflow-tooltip>
              <template slot-scope="scope">
                {{scope.row.articleContent||'--'}}
              </template>
            </el-table-column>-->
          <el-table-column label="发布时间" prop="publishTime">
            <template slot-scope="scope">
              {{scope.row.publishTime||'--'}}
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="operation" min-width="160">
            <template slot-scope="scope">
              <el-button round type="text" @click="handleScan(scope.row,'')" size="small">查看
              </el-button>
              <el-button round type="text" @click="handleEdit(scope.row)" size="small">编辑
              </el-button>
              <el-button round type="text" @click="handleDel(scope.row)" size="small">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" style="text-align:right;margin-top:18px">
          <el-pagination background @size-change="handleSizeChangeBot" @current-change="handleCurrentChangeBot" :current-page="params.botNo" :page-sizes="[10, 20, 30, 40]" :page-size="params.botSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCountBot">
          </el-pagination>
        </div>
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
        pageNo: 1,
        pageSize: 10,
        botSize: 10,
        botNo: 1
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
      totalCountBot: 0,//下面列表的总数
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
      botList: [],
      topList: [],
      botloading: false,
      articleTitle: '',
      multipleSelection: []
    }
  },
  mounted() {
    this.search();
    this.searchBot();
  },
  methods: {
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    // 导入微信行业动态列表
    insert(row) {
      // let code =this.multipleSelection.map((el)=>{
      //   return el.articleCode;
      // })
      let url = '/news/getHtmlNewsDetail';
      let params = {};
      this.$http.post(url, { id: row.id }, result => {
        if (result.code) {
          console.log(result.data.title)
          params.publishTime = result.data.addDateStr;
          params.articleTitle = result.data.title;
          params.articleContent = result.data.content || '';
          params.articleImgs = result.data.titleImage && result.data.titleImage.split('/')[5];
          this.$http.post('/newsMng/insertNewsInfo', params, response => {
            if (response.success) {
              this.searchBot(1);
            }
            this.$message({
              message: response.message,
              type: 'success'
            });
          });
        }
      })



    },
    setTitle(val) {
      this.articleTitle = val;
    },
    reset() {
      this.params.productType = '';
      this.params.productModel = '';
      this.params.productStatus = '';
    },
    // 禁用 启用
    statusChange(row) {
      let self = this;
      console.log(row.productStatus, 'productStatus');
      row.productStatus = (row.productStatus == '0' ? '1' : '0');
      console.log(row.productStatus, 'productStatus')
      this.$http.post('/product/updateState.json', { articleCode: row.articleCode, productStatus: row.productStatus }, result => {
        if (result.code) {
          self.$message({
            message: row.productStatus == '0' ? '禁用成功' : '启用成功',
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

    /*分页*/
    handleSizeChange(val) {
      this.params.pageSize = val;
    },
    handleCurrentChange(val) {
      this.params.pageNo = val;
    },
    /*分页*/
    handleSizeChangeBot(val) {
      this.params.botSize = val;
    },
    handleCurrentChangeBot(val) {
      this.params.botNo = val;
    },
    // 查看
    handleScan(row, id) {
      this.$router.push({
        path: 'newsDetail', query: {
          articleCode: row.articleCode,
          id: id
        }
      })
    },
    // 修改
    handleEdit(row) {
      this.$router.push({
        path: 'newsNew', query: {
          articleCode: row.articleCode
        }
      })
    },
    // 添加
    addClick() {
      this.$router.push({
        path: 'newsNew'
      })
    },
    // 产品类型变化
    handleTypeChange(status) {
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
        self.delItem(row.articleCode);
      }).catch(function (value) {
        return;
      });
    },
    //查询列表
    // 
    search() {//获取设备列表
      this.loading = false;
      var self = this;
      self.$http.post('/news/getHtmlNewsList',
        { startPosition: ((this.params.pageNo - 1) * this.params.pageSize), maxLength: this.params.pageSize, type: 1 }, result => {
          if (result.code) {
            console.log(result.dataList, 'result.dataList');
            self.totalCount = result.count;
            self.tableData = result.dataList;
            // self.currentPage=result.pageNo;
          } else {
            self.$message({
              message: result.message,
              type: 'warning'
            });
          }
        });
    },
    searchBot(page) {
      this.botloading = false;
      var self = this;
      this.params.botNo = page || 1;
      self.$http.post('/newsMng/queryNewsInfoByCondition', { pageStart: ((this.params.botNo - 1) * this.params.botSize), pageSize: this.params.botSize, articleTitle: this.articleTitle || '' }, result => {
        // console.log(result);
        if (result.code) {
          self.totalCountBot = result.count;
          self.botList = result.dataList;
          // self.currentPage=result.pageNo;
        } else {
          self.$message({
            message: result.message,
            type: 'warning'
          });
        }
      })
    },
    // 删除设备
    delItem(articleCode) {
      var self = this;
      self.$http.post('/newsMng/deleteNewsInfo', { "articleCode": articleCode }, result => {
        if (result.code) {
          self.$message({
            message: result.message,
            type: 'success'
          });
          console.log(result.message);
          self.searchBot();
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
    addBtn() {
      this.$router.push({
        name: 'newsNew',
        query: {
          articleCode: '',
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
    },
    "params.botSize": function (newVal) {
      this.params.botSize = newVal;
      this.searchBot();
    },
    "params.botNo": function (newVal) {
      this.params.botNo = newVal;
      this.searchBot(newVal);
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
  text-align: left;
}

.ats-sale-main {
  background-color: #fff;
  border-radius: 2px;
  margin-top: 10px;
  padding: 20px;
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
