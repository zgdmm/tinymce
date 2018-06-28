<template>
    <div style="padding: 20px">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">账号管理</el-breadcrumb-item>
            <el-breadcrumb-item>
                <a href="/">经销商管理</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item>经销商账号管理</el-breadcrumb-item>
        </el-breadcrumb>

        <div id="traders">
            <!--<div>账号管理/经销商管理</div>经销商账号管理-->

            <el-form :label-position="labelPosition" :model="formInline" label-width="120px">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="经销商名称">
                            <el-input v-model="formInline.agencyName" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="经销商负责人">
                            <el-input v-model="formInline.userName" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="负责人手机号">
                            <el-input v-model="formInline.loginAccount" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="经销地区">
                            <!--<el-input v-model="formInline.user" placeholder="审批人"></el-input>-->
                            <el-select style="width: 100%;" v-model="formInline.agencyStatus" placeholder="请选择">
                                <el-option label="启用" value="1"></el-option>
                                <el-option label="禁用" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="状态">
                            <!--<el-input v-model="formInline.agencyStatus" placeholder="审批人"></el-input>-->
                            <el-select style="width: 100%;" v-model="formInline.agencyStatus" placeholder="请选择">
                                <el-option label="启用" value="1"></el-option>
                                <el-option label="禁用" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-button class="el-button-primary" @click="onSubmit">查询</el-button>
                        <el-button @click="onReset">重置</el-button>
                    </el-col>
                </el-row>
            </el-form>
            <div style="float: left;">
                <el-button class="el-button-primary" @click="addAcount(1)">新建经销商</el-button>
            </div>

            <el-table :data="tableData1" style="width: 100%" empty-text="暂无数据"  @expand-change="toggleRowExpansion">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-table :data="tableData2" style="width: 100%" header-row-class-name="none-head" empty-text="暂无数据" @expand-change="toggleRowExpansion">
                            <el-table-column type="expand">
                                <template slot-scope="props">
                                    <el-table :data="tableData3" style="width: 100%" header-row-class-name="none-head" empty-text="暂无数据">
                                        <el-table-column label="" prop="agencyName" :formatter="dataformatter">
                                        </el-table-column>
                                        <el-table-column label="" prop="agencyLevle" :formatter="dataformatter">
                                        </el-table-column>
                                        <el-table-column label="" prop="userName" :formatter="dataformatter">
                                        </el-table-column>
                                        <el-table-column label="" prop="loginAccount" :formatter="dataformatter">
                                        </el-table-column>
                                        <el-table-column label="" prop="salesNames" :formatter="dataformatter">
                                        </el-table-column>
                                        <el-table-column label="" prop="techniciansNames" :formatter="dataformatter">
                                        </el-table-column>
                                        <el-table-column label="" prop="agencyStatus" :formatter="dataformatter">
                                        </el-table-column>
                                        <el-table-column label="状态" prop="agencyStatus">
                                            <template slot-scope="scope">
                                                {{scope.row.agencyStatus | setagencyStatus}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="" prop="operation">
                                            <template slot-scope="scope">
                                                <el-button size="mini" type="text" @click="showMemberList(scope.row)">成员</el-button>
                                                <el-button v-if="scope.row.agencyStatus == 1" size="mini" type="text" @click="setItemStatus(scope.row, 0)">停用</el-button>
                                                <el-button v-if="scope.row.agencyStatus == 0" size="mini" type="text" @click="setItemStatus(scope.row, 1)">启用</el-button>
                                                <el-button size="mini" type="text" @click="editItem(scope.row)">修改</el-button>
                                                <el-button v-if="scope.row.agencyStatus == 0" size="mini" type="text" @click="deletItem(scope.row)">删除</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </template>
                            </el-table-column>
                            <el-table-column label="" prop="agencyName" :formatter="dataformatter">
                            </el-table-column>
                            <el-table-column label="" prop="agencyLevle" :formatter="dataformatter">
                            </el-table-column>
                            <el-table-column label="" prop="userName" :formatter="dataformatter">
                            </el-table-column>
                            <el-table-column label="" prop="loginAccount" :formatter="dataformatter">
                            </el-table-column>
                            <el-table-column label="" prop="salesNames" :formatter="dataformatter">
                            </el-table-column>
                            <el-table-column label="" prop="techniciansNames" :formatter="dataformatter">
                            </el-table-column>
                            <el-table-column label="" prop="agencyStatus" :formatter="dataformatter">
                            </el-table-column>
                            <el-table-column label="状态" prop="agencyStatus">
                                <template slot-scope="scope">
                                    {{scope.row.agencyStatus | setagencyStatus}}
                                </template>
                            </el-table-column>
                            <el-table-column label="" prop="operation">
                                <template slot-scope="scope">
                                    <el-button size="mini" type="text" @click="showMemberList(scope.row)">成员</el-button>
                                    <el-button size="mini" type="text" @click="addAcount(3,scope.row)">创建下级</el-button>
                                    <el-button v-if="scope.row.agencyStatus == 1" size="mini" type="text" @click="setItemStatus(scope.row, 0)">停用</el-button>
                                    <el-button v-if="scope.row.agencyStatus == 0" size="mini" type="text" @click="setItemStatus(scope.row, 1)">启用</el-button>
                                    <el-button size="mini" type="text" @click="editItem(scope.row)">修改</el-button>
                                    <el-button v-if="scope.row.agencyStatus == 0" size="mini" type="text" @click="deletItem(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-table-column>
                <el-table-column label="经销商名称" prop="agencyName" :formatter="dataformatter">
                </el-table-column>
                <el-table-column label="经销商级别" prop="agencyLevle" :formatter="dataformatter">
                </el-table-column>
                <el-table-column label="经销商负责人" prop="userName" :formatter="dataformatter">
                </el-table-column>
                <el-table-column label="负责人手机号" prop="loginAccount" :formatter="dataformatter">
                </el-table-column>
                <el-table-column label="指定销售" prop="salesNames" :formatter="dataformatter">
                    <!--<template slot-scope="scope">
                        <span v-for="item in scope.row.salesNames" style="margin-right: 5px;">{{item}}</span>
                    </template>-->
                </el-table-column>
                <el-table-column label="指定技术人员" prop="techniciansNames" :formatter="dataformatter">
                    <!--<template slot-scope="scope">
                        <span v-for="item in scope.row.techniciansNames" style="margin-right: 5px;">{{item}}</span>
                    </template>-->
                </el-table-column>
                <el-table-column label="经销地区" prop="agencyStatus" :formatter="dataformatter">
                    <!--{{agencyStatus | setagencyStatus}}-->
                </el-table-column>
                <el-table-column label="状态" prop="agencyStatus">
                    <template slot-scope="scope">
                        {{scope.row.agencyStatus | setagencyStatus}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" prop="operation" :formatter="dataformatter">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" @click="showMemberList(scope.row)">成员</el-button>
                        <el-button size="mini" type="text" @click="addAcount(2,scope.row)">创建下级</el-button>
                        <el-button v-if="scope.row.agencyStatus == 1" size="mini" type="text" @click="setItemStatus(scope.row, 0)">停用</el-button>
                        <el-button v-if="scope.row.agencyStatus == 0" size="mini" type="text" @click="setItemStatus(scope.row, 1)">启用</el-button>
                        <el-button size="mini" type="text" @click="editItem(scope.row)">修改</el-button>
                        <el-button v-if="scope.row.agencyStatus == 0" size="mini" type="text" @click="deletItem(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-position">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formInline.pageNo" :page-sizes="[10, 20, 50, 100]" :page-size="formInline.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="formInline.totalCount">
                </el-pagination>
            </div>

        </div>

        <!--查看人员弹窗-->
        <el-dialog title="查看名单" :visible.sync="numberListVisible">
            <el-table :data="gridData">
                <el-table-column property="userName" label="名称" width="150"></el-table-column>
                <el-table-column property="loginAccount" label="手机号" width="200"></el-table-column>
                <el-table-column label="操作" prop="operation1">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" @click="deleteUser(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="numberListVisible = false">取 消</el-button>
                <el-button type="primary" @click="numberListVisible = false">确定</el-button>
            </div>
        </el-dialog>

    </div>

</template>

<script>
    //  import Pagination from '../../components/pagination.vue'
    export default {
        name: "traders-account",
        data() {
            return {
                labelPosition: 'right',
                formInline: {
                    agencyLevle: 1,
                    agencyName: '',
                    userName: '',
                    loginAccount: '',
                    agencyStatus: '',
                    pageNo: 1,
                    pageSize: 10,
                    totalCount: 0
                },
//              getRowKeys(row) {
//                  return row.agencyCode;
//              },
                tableData1: [], //经销商列表
                tableData2: [], //经销商子级列表
                tableData3: [],
                gridData: [], //查看人员弹窗数据列表
                numberListVisible: false
            }
        },
        mounted() {
            // this.$http.get('/user/login.json', {
            //     loginAccount: '15957189464',
            //     loginPwd: 'asd123',
            // }, response => {
            //     console.log(response);
            // });
            this.getListData();
        },
        methods: {
            //处理空数据
            dataformatter(row, column, cellValue) {
                var date = row[column.property];
                if(date == "" || cellValue == null) {
                    return "暂无数据"
                } else {
                    return cellValue
                }
            },
            
            //查询
            onSubmit() {
                console.log('submit!');
                this.getListData();
            },
            //重置查询参数
            onReset() {
                this.formInline = {
                    agencyLevle: 1,
                    agencyName: '',
                    userName: '',
                    loginAccount: '',
                    agencyStatus: '',
                    pageNo: 1,
                    pageSize: 10,
                    totalCount: 0
                }
            },
            //新增
            addAcount(type, row) {
                //新增一级经销商，addType值传true，子级传FALSE
                this.$router.push({
                    name: 'tradersAccountAdd',
                    params: {
                        addType: type,
                        parentData: row || ''
                    }
                })
            },
            //编辑
            editAcount(type) {
                //新增一级经销商，addType值传true，子级传FALSE
                this.$router.push({ path: 'tradersAccountEdit',query:{
                    addType: type
                } })
            },
            //分页相关
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.formInline.pageSize = val;
                this.getListData();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.formInline.pageNo = val;
                this.getListData();
            },
            //请求列表接口方法
            getListData() {
                //经销商列表接口
                this.$http.post('/agency/selectByParam', this.formInline, response => {
                    if(response.data.data) {
                        this.tableData1 = response.data.data
                        this.formInline.pageNo = response.data.pageNo;
                        this.formInline.totalCount = response.data.totalCount;
                    }
                });
            },
            //经销商查看人员名单
            showMemberList(row) {
                this.$http.post('/user/selectAllUser', {
                    isAgency: 1,
                    isAgencyLeader: 0,
                    agencyCode: row.agencyCode //测试数据 001
                }, response => {
                    if(response.data && response.data.length > 0) {
                        this.gridData = response.data;
                        this.numberListVisible = true;
                    } else {
                        self.$message({
                            message: '当前没有该人员数据！',
                            type: 'warning'
                        });
                    }
                });
            },
            //删除经销商人员
            deleteUser(row) {
                let self = this;
                this.$confirm('此操作将删除该条记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function(value) {
                    self.$http.post('/user/deleteOneUser', {
                        "userId": row.userId
                    }, result => {

                    });
                }).catch(function(value) {
                    return;
                });
            },
            //经销商停用、启用  status 1启用 0 禁用
            setItemStatus(row, status) {
                const self = this;
                let tips = status == 1 ? "启用" : "停用";
                this.$http.post('/agency/updateStatus', {
                    agencyStatus: status,
                    agencyCode: row.agencyCode
                }, response => {
                    if(response.code == 200) {
                        self.$message({
                            message: response.message,
                            type: 'warning'
                        });
                        self.getListData();
                    } else {
                        self.$message({
                            message: response.message,
                            type: 'warning'
                        });
                    }
                });
            },
            //修改
            editItem(row) {
                this.$router.push({ path: 'tradersAccountEdit',query:{
                    rowId: row.agencyCode
                } })
            },
            //删除经销商
            deletItem(row) {
                let self = this;
                this.$confirm('此操作将删除该条记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function(value) {
                    self.$http.post('/agency/deleteOneAgency', {
                        'agencyCode': row.agencyCode
                    }, response => {
                        console.log(response);
                        if(response.code == 200) {
                            self.$message({
                                message: '删除成功！',
                                type: 'success'
                            });
                            self.getListData();
                        } else {
                            self.$message({
                                message: response.message,
                                type: 'warning'
                            });
                        }
                    });
                }).catch(function(value) {
                    console.log(value)
                    return;
                });
            },
            //展开表格
            toggleRowExpansion(row, expends) {
                // console.log(row,expends,',,')
                // this.tableData2 = expends[1].agencyVOs;
                // console.log(expends[1].agencyVOs,'jj');
                if(row.agencyLevle == 1) {
                    this.tableData2 = row.agencyVOs;
                    // console.log(row.agencyVOs,'00');
                }if(row.agencyLevle == 2) {
                        this.tableData3 = row.agencyVOs;
                    }
                }
        },
        filters: {
            setagencyStatus: function(value) {
                return value == 1 ? "启用" : "禁用";
            }
        }
    }
</script>

<style>
    #traders {
        background-color: #ffffff;
        padding: 20px;
        line-height: 30px;
        margin-top: 15px;
    }

    .none-head {
        display: none!important;
    }

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

    .pagination-position {
        text-align: right;
    }
</style>
