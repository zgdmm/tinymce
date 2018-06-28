<template>
<div>
  <div class="container">
    <el-row style="margin-bottom: 16px" type="flex"  justify="space-between">
      <el-row class="itemWidth" type="flex" align="middle">
        <div class="itemLabel">项目编号</div>
        <el-input clearable v-model.trim="searchParams.projectCode" size="small" placeholder="请输入"></el-input>
      </el-row>
      <el-row class="itemWidth" type="flex" align="middle">
        <div class="itemLabel">业主名称</div>
        <el-input clearable v-model.trim="searchParams.customerName" size="small" placeholder="请输入"></el-input>
      </el-row>
      <el-row class="itemWidth" type="flex" align="middle">
        <div class="itemLabel">业主手机号</div>
        <el-input clearable v-model.trim="searchParams.customerPhone" size="small" placeholder="请输入"></el-input>
      </el-row>
    </el-row>

    <el-row type="flex"  justify="space-between">
      <el-row class="itemWidth" type="flex" align="middle">
        <div class="itemLabel">所属经销商</div>
        <el-input clearable v-model.trim="searchParams.agencyName"  size="small" placeholder="请输入"></el-input>
      </el-row>
      <el-row class="itemWidth" type="flex" align="middle">
        <div class="itemLabel">状态</div>
        <el-select clearable size="small" v-model="searchParams.projectStatus" placeholder="请选择">
          <el-option
            v-for="item in projectStatus"
            :key="item.key"
            :label="item.value"
            :value="item.key">
          </el-option>
        </el-select>
        <!--<el-input clearable v-model="searchParams.status" size="small" placeholder="请输入"></el-input>-->
      </el-row>
      <el-row class="itemWidth" type="flex">
        <div class="itemLabel" ></div>
        <el-button  @click="search"  type="primary">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </el-row>
    </el-row>

    <div  style="margin-top: 20px">
      <el-table
        v-loading="loading"

        id="allProjects"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          align="center"
          prop="projectName"
          show-overflow-tooltip

          label="项目">
        </el-table-column>
        <el-table-column
          align="center"
          prop="customerName"
          label="业主名称"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="customerPhone"
          show-overflow-tooltip
          label="业主手机号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="customerAddress"
          show-overflow-tooltip
          label="项目地址">
        </el-table-column>
        <el-table-column
          align="center"
          prop="agencyDetail"
          show-overflow-tooltip
          label="所属经销商">
        </el-table-column>
        <el-table-column
          align="center"
          show-overflow-tooltip
          label="项目状态">
          <template slot-scope="scope">

            <span v-if="scope.row.isClosed==1">
              已关闭
            </span>

               <span v-else-if="scope.row.projectStatus=='design-3'">
              待设计({{scope.row.projectStatus | Context(projectStatusList)}})
            </span>
            <span v-else-if="scope.row.projectStatus=='design-1'">
              待设计
            </span>
            <span v-else>{{scope.row.projectStatus | Context(projectStatusList)}}</span>

          </template>

        </el-table-column>
        <el-table-column
          fixed="right"
          min-width="300px"
          align="center"
          label="操作"
          >
          <template slot-scope="scope">
            <el-row type="flex">
              <el-button @click="look(scope.row)" type="text" size="small">查看</el-button>
              <el-button v-show="scope.row.projectStatus=='design-1'||scope.row.projectStatus=='design-3'" @click="design(scope.row)" type="text" size="small">设计方案</el-button>
              <el-button v-show="(scope.row.projectStatus=='survey-1'||scope.row.projectStatus=='assign-1'||scope.row.projectStatus=='design-1'||scope.row.projectStatus=='design-3')&&scope.row.isClosed!=1" @click="closeProject(scope.row)" type="text" size="small">关闭项目</el-button>
              <el-button v-show="scope.row.projectStatus=='design-3'"  @click="refuseResaon(scope.row)" type="text" size="small">驳回原因</el-button>
              <el-button v-show="scope.row.projectStatus=='reform-check-1'" @click="needImproveInfo(scope.row)" type="text" size="small">需整改信息</el-button>
              <el-button v-show="scope.row.isClosed==1"  @click="recover(scope.row)" type="text" size="small">恢复项目</el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="searchParams.pageNo"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="searchParams.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount">
          </el-pagination>
        </div>
      <el-dialog title="关闭项目" :visible.sync="dialogFormVisible">
        <el-form :rules="rules" ref="ruleForm" :model="form">
          <el-form-item prop="closeReason" label="关闭原因：" :label-width="formLabelWidth">
            <el-input type="textarea"
                      :rows="3"
                      v-model="form.closeReason"
                      auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="说明原因图片：" :label-width="formLabelWidth">
            <upload-photo @getPhotos="getChildData"></upload-photo>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="sure('ruleForm')">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog
        id="reason"
        title="驳回原因"
        :visible.sync="dialogVisible"
        width="60%">

        <div style="padding: 20px;background: #F8F8F8;">
          <div style="display: flex;justify-content: space-between;margin-bottom: 5px">
            <div>驳回原因</div>
            <div>{{gmtModifiedStr}}</div>
          </div>
          <div style="text-align: left">{{rejectReason}}</div>
        </div>
      </el-dialog>
      <el-dialog
        title="需整改信息"
        :visible.sync="reformDialogVisible"
        width="50%">
        <div style="padding: 20px;background: #F8F8F8;margin-bottom: 1px">
          <div style="display: flex;justify-content: space-between;margin-bottom: 5px">
            <div>需增改信息</div>
            <div>{{reformTime}}</div>
          </div>
          <div style="text-align: left">{{modifyReason}}</div>
        </div>
        <div style="padding: 20px;background: #F8F8F8;">
          <div style="text-align: left">需增改图片</div>
          <div class="imgContainer">
            <img v-for="item in modifyResultPhotosList" :src="item.modifyResultPhotosList"/>
          </div>
        </div>
      </el-dialog>


    </div>
  </div>


</div>
</template>

<script>
  import uploadPhoto from "../../components/uploadPhoto.vue"

  export default {
      name: "all-projects",

      props:["designStatus"],
      components:{
        uploadPhoto
      },
      data() {
        return {
          totalCount:0,
          loading:true,//是否显示加载
          rejectReason:'',
          gmtModifiedStr:'',
          modifyReason:'',
          searchParams: {
            pageNo:1,
            pageSize:10,
            projectCode: '',
            customerName: '',
            customerPhone: '',
            agencyName: '',
            projectStatus: ''
          },
          tableData: [],
          dialogFormVisible:false,//关闭项目弹窗
          dialogVisible: false,//驳回原因弹窗
          reformDialogVisible:false,//整改信息
          form: {
            closeReason: '',
            closePhotos: '',
            projectCode:'',
          },
          formLabelWidth: '120px',
          closePhotos:'',
          rules: {
            closeReason: [
              { required: true, message: '请输入关闭原因', trigger: 'change' }
            ],
          },
          reformTime:'',
          modifyResultPhotosList:[],//待增改信息图片列表
        }
      },
      mounted(){
          this.search();

      },

      computed:{
        projectStatus(){
//          let tempArr = Object.assign([], this.$store.state.projectStatus);
//          console.log(tempArr);
//          tempArr=tempArr.splice(0, 8);
//          console.log(tempArr);
//
//          let addArr = [{key: 'design-1', value: '待设计方案'}, {key: 'design-2', value: '待方案审核'}, {
//            key: 'close',
//            value: '已关闭'
//          }];
//          tempArr = tempArr.concat(addArr);
          return this.$store.state.projectStatusList;
        },
        projectStatusList(){
            return this.$store.state.projectStatus;
        }

      },
      methods:{
        recover(row){
          this.$confirm('此操作将恢复该项目, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success'
          }).then(() => {
              this.recoverItem(row);
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消恢复'
            });
          });

        },
        recoverItem(row){
          this.$http.post('/project/updateCustomerStatusFromLose', {pcCode:row.pcCode}, response => {
            if(response.code==200){
              this.searchParams.pageNo=1;
              this.search();
              this.$message({
                message:response.message,
                type: 'success'
              });
            }else {
              this.$message({
                message:response.message,
                type: 'warning'
              });
            }
          });
        },
        sure(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              if(this.closePhotos.length>5){
                this.$message({
                  message:'最多只能上传5张图片！',
                  type: 'warning'
                });
                return;
              }
              this.dialogFormVisible = false;
              this.$http.post('/close/closeProject', this.form, response => {
                if(response.code==200){
                  let data = response.data.data?response.data.data:[];
                  if(data){
                    this.searchParams.pageNo=1;//搜索结果返回首页
                    this.search();
                    this.$message({
                      message:response.message,
                      type: 'success'
                    });
                  }
                }else {
                  this.$message({
                    message:response.message,
                    type: 'warning'
                  });
                }
                this.loading=false;
              });
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        /*关闭项目*/
        closeProject(item){
          this.dialogFormVisible = true;
          this.form.projectCode = item.projectCode;
          this.searchParams.pageNo=1;//搜索结果返回首页
          this.search();
        },
        getChildData(val){
          this.closePhotos = val;
          this.form.closePhotos = val.join(',');
        },
        trims(str){
          return str.replace(/[ ]/g, ""); //去除字符算中的空格
        },
        /*查询*/
        search(){
          this.$http.post('/project/selectProjectByPage', this.searchParams, response => {
            this.loading=false;
            if(response.code==200){
              let data = response.data.data?response.data.data:[];
              this.totalCount = response.data.totalCount;
              this.tableData = data;
            }else {
              this.$message({
                message:response.message,
                type: 'warning'
              });
            }
          });

        },
        /*重置*/
        reset(){
          this.searchParams.projectCode='';
          this.searchParams.customerName='';
          this.searchParams.customerPhone='';
          this.searchParams.agencyName='';
          this.searchParams.projectStatus='';
        },
        /*查看*/
        look(item){
          this.$router.push({path:'/allProjectsDetail/'+item.projectStatus,query:{projectCode:item.projectCode}});

        },
        /*设计方案*/
        design(item){
          this.$http.post('/design/checkCanDesign', {projectCode:item.projectCode}, response => {
            if(response.code==200){
                if(response.data){
                  this.$router.push({path:'/designFlow/designBaseInfo/'+item.projectStatus,query:{projectCode:item.projectCode}});
                }else {
                  this.$message({
                    message:'您没有该项目设计权限',
                    type: 'warning'
                  });
                    return;
                }
              //let data = response.data?response.data:[];

            }else {
              this.$message({
                message:response.message,
                type: 'warning'
              });
            }
          });
        },
        /*驳回原因*/
        refuseResaon(item){
          this.$http.post('/design/selectRejectReason', {projectCode:item.projectCode}, response => {
            this.loading=false;
            if(response.code==200){
              let data = response.data?response.data:[];

              this.gmtModifiedStr = data[0].gmtModifiedStr;
              this.rejectReason = data[0].rejectReason;
            }else {
              this.$message({
                message:response.message,
                type: 'warning'
              });
            }
          });
             this.dialogVisible = true;

        },
        /*需整改信息*/
        needImproveInfo(item){
          this.$http.post('/reform/waitRefromList.json', {projectCode:item.projectCode}, response => {
            this.loading=false;
            if(response.code==200){
              let data = response.data?response.data:[];
              this.reformTime = data[0].gmtModifiedStr.substring(0,10);
              this.modifyReason = data[0].modifyReason;
              this.modifyResultPhotosList = data[0].modifyResultPhotosList;

            }else {
              this.$message({
                message:response.message,
                type: 'warning'
              });
            }
          });
            this.reformDialogVisible=true;

        },
        /*分页*/
        handleSizeChange(val) {
          this.searchParams.pageSize=val;

        },
        handleCurrentChange(val) {
          this.searchParams.pageNo=val;

        }
      },
      watch:{
        "searchParams.pageSize": function (newVal) {
          this.search();
        },
        "searchParams.pageNo": function (newVal) {
          this.search();
        }
      }

    }
</script>

<style scoped lang="less">
  .imgContainer{
    display: flex;
    align-items: center;
    margin-right: 10px;
    img{
      width: 60px;
      height: 60px;
    }
  }
  #reason .el-dialog__body{
    padding: 10px;
  }
.el-button--primary{
  background: #409eff;
  border-color:#409eff;
  border-radius: 4px;
}
.container{
  .block{
    margin-top: 20px;
    text-align: right;
    padding-bottom: 24px;

  }
  padding-left: 20px;
  padding-right: 30px;
  /*min-width: 1000px;*/
  border-radius: 2px;
  .itemWidth{
    width: 300px;
    .itemLabel{
      min-width:100px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #666666;
      text-align: right;
      padding-right: 14px;
    }

  }
}
</style>
