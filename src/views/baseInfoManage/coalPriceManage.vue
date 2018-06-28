<template>
    <div style="padding: 20px;">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>基础信息管理</el-breadcrumb-item>
            <el-breadcrumb-item>脱硫煤电价管理</el-breadcrumb-item>
        </el-breadcrumb>
        <template>
            <div class="main-contain">
                <div class="title"> 脱硫煤电价管理</div>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="provinceName" label="省份" width="180">
                    </el-table-column>
                    <el-table-column prop="price" label="脱硫煤电价" width="180">
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      width="100">
                      <template slot-scope="scope">
                        <el-button @click="editOption(scope.row)" type="text" size="small">修改</el-button>
                      </template>
                    </el-table-column>
                </el-table>
                <div class="pagination-position">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formInline.pageNo" :page-sizes="[10, 20, 50, 100]" :page-size="formInline.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="formInline.totalCount">
                    </el-pagination>
                </div>
            </div>
            
        </template>
        <!-- 修改电价 -->
      <el-dialog  width="40%" title="修改电价" :visible.sync="dialogFormVisible" >
        <el-form :model="editForm" label-width="130px">
            <el-form-item label="省份" prop="userName">
                <span style="width: 100%;display: inline-block;text-align: left;color: #999;">{{editForm.provinceName}}</span>
            </el-form-item>
            <el-form-item label="价格" prop="loginAccount">
                <el-input placeholder="请输入" v-model="editForm.price"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">确定</el-button>
                <el-button @click="resetForm()">取消</el-button>
            </el-form-item>
        </el-form>
      </el-dialog>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                tableData: [],
                formInline: {
                    pageNo: 1,
                    pageSize:10,
                    totalCount: 0
                },
                dialogFormVisible: false,
                editForm: {}
            }
        },
        mounted () {
            this.getListData();
            
        },
        methods: {
             //分页相关
            handleSizeChange(val) {
//              console.log(`每页 ${val} 条`);
                this.formInline.pageSize = val;
                this.getListData();
            },
            handleCurrentChange(val) {
//              console.log(`当前页: ${val}`);
                this.formInline.pageNo = val;
                this.getListData();
            },
            //获取数据列表
            getListData(){
                this.$http.post('/information/selectCoalPriceByPage',this.formInline, response => {
                   this.tableData = response.data.data;
                   this.formInline.pageNo = response.data.pageNo;
                   this.formInline.totalCount = response.data.totalCount;
               });
            },
            //编辑弹窗显示
            editOption(row) {
                this.dialogFormVisible = true;
                this.editForm= {
                    provinceName: row.provinceName,
                    priceCode: row.priceCode,
                    price: row.price
                }
            },
            //提交修改
            submitForm() {
                let regtest = /^[0-9]+(.[0-9]{1,5})?$/;
                if(!regtest.test(this.editForm.price)){
                    this.$message({
                        message: "脱硫煤价请输入整数或者四位以内小数",
                        type: 'warning'
                    });
                    return false;
                }
                this.$http.post('/information/updateCoalPriceByPrimaryKey',{
                    price: this.editForm.price,
                    priceCode: this.editForm.priceCode
                }, response => {
                   this.$message({
                        message: response.message,
                        type: 'success'
                    });
                   if(response.code == 200){
                       this.getListData();
                       this.editForm = {};
                       this.dialogFormVisible = false;
                   }
               });
            },
            resetForm() {
                this.editForm = {};
                this.dialogFormVisible = false;
            }
        }
    }
</script>

<style scoped lang="less">
    .main-contain {
        background: #fff;
        padding: 20px;
        margin-top: 15px;
        .title{
            border-left: 2px solid #409eff;
            text-align: left;
            padding-left: 10px;
            margin-bottom: 20px;
        }
    }
    

</style>