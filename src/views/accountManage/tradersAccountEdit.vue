<template>
    <div style="padding:20px">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">账号管理</el-breadcrumb-item>
            <el-breadcrumb-item>
                <a href="/">经销商管理</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item>编辑经销商账号</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="main-contain">
            <p class="title">编辑经销商</p>
            <div style="width: 60%;">
                <!--编辑经销商-->
                <el-form  :label-position="labelPosition" ref="form" :model="dataForm" :rules="rules" label-width="120px">
                    <el-form-item label="经销商名称" prop="name">
                        <el-input v-model="dataForm.agencyName"></el-input>
                    </el-form-item>
                    <el-form-item label="经销商负责人" prop="admin">
                        <el-input v-model="dataForm.userName" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人手机号" prop="phone">
                        <el-input v-model="dataForm.loginAccount" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="指定销售" prop="">
                        <el-select style="width: 100%;" multiple v-model="dataForm.agencySales" placeholder="指定销售">
                            <el-option
                              v-for="item in salersList"
                              :key="item.userId"
                              :label="item.userName"
                              :value="item.userId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="指定技术人员" prop="">
                        <el-select style="width: 100%;" multiple  v-model="dataForm.agencyTechnicians" placeholder="指定技术人员">
                            <el-option
                              v-for="item in technologist"
                              :key="item.userId"
                              :label="item.userName"
                              :value="item.userId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="经销地区" prop="">
                      <!-- <el-input v-model="dataForm.region" :disabled="true"></el-input> -->
                        <el-col :span="8" >
                            <el-select style="width: 100%;" :disabled="true" v-model="dataForm.agencyProvince" placeholder="请选择经销地区" @change="getCitys">
                                <el-option
                                v-for="item in addressList"
                                :key="item.addressCode"
                                :label="item.addressName"
                                :value="item.addressCode">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="8">
                            <el-select style="width: 100%;" :disabled="true" v-model="dataForm.agencyCity" placeholder="请选择经销地区">
                                <el-option
                                v-for="item in cityList"
                                :key="item.addressCode"
                                :label="item.addressName"
                                :value="item.addressCode">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="EditAccount">确定</el-button>
                        <el-button @click="cancleAdd">取消</el-button>
                    </el-form-item>
                </el-form>

            </div>
        </div>

    </div>

</template>
<script>
    export default {
        name: "traders-account-add",
        data() {

            return {
                level: false,
                labelPosition: 'right',
                dataForm: {
                    agencyName: '',
                    userName: '',
                    loginAccount: '',
                    agencySales: '',
                    agencyTechnicians: '',
                    agencyProvince: '',
                    agencyCity:''
                },
                rules: {
                    agencyName: [{
                            required: true,
                            message: '请输入经销商名称',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            max: 5,
                            message: '长度在 3 到 5 个字符',
                            trigger: 'blur'
                        }],
                    userName: [{
                            required: true,
                            message: '请输入负责人名称',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            max: 5,
                            message: '长度在 3 到 5 个字符',
                            trigger: 'blur'
                        }],
                    
                    required: [{
                        required: true,
                        message: ''}],
                    agencyProvince: [{
                        required: true,
                        message: '请选择经销地区',
                        trigger: 'change'
                    }]
                },
                //销售人员列表
                salersList: [],
                //技术人员列表
                technologist:[],
                //地区列表
                areaList: [],
                addressList:[],
                cityList:[],
            }
        },
        mounted(){
             this.getAddress();
            console.log(this.$route.params);
            //获取数据回显
             this.$http.post('/agency/selectByCode', {
                    agencyCode: this.$route.query.rowId
                }, response => {
//                  this.dataForm = response.data;
                    this.dataForm.agencyCode = response.data.agencyCode;
                    this.dataForm.agencyName = response.data.agencyName;
                    this.dataForm.parentCode = response.data.parentCode;
                    this.dataForm.agencyLevle = response.data.agencyLevle;
                    this.dataForm.userName = response.data.userName;
                    this.dataForm.loginAccount = response.data.loginAccount;
                    this.dataForm.agencySales = response.data.agencySales;
                    this.dataForm.agencyTechnicians = response.data.agencyTechnicians;
                    this.dataForm.agencyProvince = response.data.agencyProvince;
                    setTimeout(()=> {
                        this.getCitys(response.data.agencyProvince)
                        this.dataForm.agencyCity = response.data.agencyCity;
                    }, 500);

                    // this.dataForm.agencySales = response.data.salesNames;
                    // this.dataForm.agencyTechnicians = response.data.techniciansNames;
                    // this.dataForm.region = response.data.agencyProvinceName+'-'+ response.data.agencyCityName;
                });

            //获取销售人员列表
            this.$http.post('/user/selectAllUser', {
                    isAgency: 0,
                    roleId: 2
                }, response => {
//                  console.log(response);
                    this.salersList = response.data
                });

            //获取技术人员列表
            this.$http.post('/user/selectAllUser', {
                    isAgency: 0,
                    roleId: 3
                }, response => {
//                  console.log(response);
                    this.technologist = response.data
                });
        },
        methods: {
            // 省市
            getAddress(){
                this.$http.post('/address/queryAddressForFourLinkage', {addressLevel:1,parentId:'0'}, response => {
                    if(response.data) {
                        console.log(response.data);
                        this.addressList = response.data;
                    }
                });
            },
            getCitys(code){
                console.log(code);
                this.$http.post('/address/queryAddressForFourLinkage', {addressLevel:2,parentId:code}, response => {
                    if(response.data) {
                        console.log(response.data);
                        this.cityList = response.data;
                    }
                });
            },
            cancleAdd() {
                this.$router.push({ path: 'tradersAccount'});
            },
            EditAccount() {
                let submitData = {
                    "agencyCode": this.dataForm.agencyCode,
                    "agencyName": this.dataForm.agencyName,
                    "parentCode": this.dataForm.parentCode,
                    "agencyLevle": this.dataForm.agencyLevle,
                    "userName": this.dataForm.userName,
                    "loginAccount": this.dataForm.loginAccount,
                    "agencySales": this.dataForm.agencySales,
                    "agencyTechnicians": this.dataForm.agencyTechnicians,
                    "agencyCity":this.dataForm.agencyCity,
                     "agencyProvince": this.dataForm.agencyProvince,
                }
                this.$http.post('/agency/updateAgency', submitData, response => {
                    this.$message({
                        message: response.message,
                        type: 'warning'
                    });
                    this.$router.push({ path: 'tradersAccount'});
                });
            }
        }
    }
</script>
<style scoped="scoped">
    .main-contain {
        background: #fff;
        padding: 20px;
        margin-top: 15px;
    }
    .title{
        border-left: 2px solid #409eff;
        text-align: left;
        padding-left: 10px;
        margin-bottom: 20px;
    }
</style>
