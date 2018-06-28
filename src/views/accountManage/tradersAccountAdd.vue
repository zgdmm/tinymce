<template>
    <div style="padding:20px">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">账号管理</el-breadcrumb-item>
            <el-breadcrumb-item>
                <a href="/">经销商管理</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item>新增经销商</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="main-contain">
            <p class="title">新增<span v-show="this.$route.params.addType != 1">下级</span>经销商</p>
            <div style="width: 60%;">
                <!--新增经销商-->
                <el-form v-if="this.$route.params.addType == 1" :label-position="labelPosition" ref="form" :model="dataForm" :rules="rules" label-width="120px">
                    <el-form-item label="经销商名称" prop="agencyName">
                        <el-input v-model="dataForm.agencyName"></el-input>
                    </el-form-item>
                    <el-form-item label="经销商负责人" prop="userName">
                        <el-input v-model="dataForm.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人手机号" prop="loginAccount">
                        <el-input v-model="dataForm.loginAccount"></el-input>
                    </el-form-item>
                    <el-form-item label="指定销售" prop="">
                        <el-select style="width: 100%;" multiple v-model="dataForm.agencySales" placeholder="请选择经销地区">
                            <el-option
                              v-for="item in salersList"
                              :key="item.userId"
                              :label="item.userName"
                              :value="item.userId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="指定技术人员" prop="">
                        <el-select style="width: 100%;" multiple  v-model="dataForm.agencyTechnicians" placeholder="请选择经销地区">
                            <el-option
                              v-for="item in technologist"
                              :key="item.userId"
                              :label="item.userName"
                              :value="item.userId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item label="经销地区" prop="">
                        <el-col :span="8">
                            <el-select style="width: 100%;" v-model="dataForm.agencyProvince" placeholder="请选择经销地区" @change="getCitys">
                                <el-option
                                v-for="item in addressList"
                                :key="item.addressCode"
                                :label="item.addressName"
                                :value="item.addressCode">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="8">
                            <el-select style="width: 100%;" v-model="dataForm.agencyCity" placeholder="请选择经销地区">
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
                        <el-button type="primary" @click="addAccount">确定</el-button>
                        <el-button @click="cancleAdd">取消</el-button>
                    </el-form-item>
                </el-form>

                <!--新增二级三级经销商-->
                <el-form v-if="this.$route.params.addType != 1" :label-position="labelPosition" ref="form" :model="dataForm" :rules="rules" label-width="150px">
                    <el-form-item label="上级经销商" prop="name">
                        <span style="width: 100%;display: inline-block;text-align: left;color: #999;">{{this.$route.params.parentData&&this.$route.params.parentData.agencyName}}</span>
                    </el-form-item>
                    <el-form-item label="下级经销商名称" prop="agencyName">
                        <el-input v-model="dataForm.agencyName"></el-input>
                    </el-form-item>
                    <el-form-item label="经销商负责人" prop="userName">
                        <el-input v-model="dataForm.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人手机号" prop="loginAccount">
                        <el-input v-model="dataForm.loginAccount"></el-input>
                    </el-form-item>
                    <el-form-item label="经销地区" prop="">
                        <el-col :span="8">
                            <el-select style="width: 100%;" v-model="dataForm.agencyProvince" placeholder="请选择经销地区" @change="getCitys">
                                <el-option
                                v-for="item in addressList"
                                :key="item.addressCode"
                                :label="item.addressName"
                                :value="item.addressCode">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="8">
                            <el-select style="width: 100%;" v-model="dataForm.agencyCity" placeholder="请选择经销地区">
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
                        <el-button type="primary" @click="addAccount">确定</el-button>
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
          var self = this;
            var loginAccountRules = function(rule, value, callback) {
                var newValue=self.dataForm.loginAccount;
                if(newValue.charAt(0)!='1'){
                    callback(new Error('手机号第一位必须是1'));
                }else if(newValue.length!=11){
                    callback(new Error('手机号长度为11位'));
                }else {
                    callback();
                }
            };
            return {
                level: false,
                labelPosition: 'right',
                dataForm: {
                    agencyLevle: 1,
                    parentCode: '',
                    agencyName: '',
                    userName: '',
                    loginAccount: '',
                    agencySales: '',
                    agencyTechnicians: '',
                    agencyProvince: '',
                    agencyCity:''
                },
                addressList:[],
                cityList:[],
                rules: {
                    agencyName: [{
                            required: true,
                            message: '请输入经销商名称',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            max: 20,
                            message: '长度在 3 到 20 个字符',
                            trigger: 'blur'
                        }],
                    userName: [{
                            required: true,
                            message: '请输入负责人名称',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            max: 20,
                            message: '长度在 3 到 20 个字符',
                            trigger: 'blur'
                        }],
                    loginAccount: [
                        {required: true, message: '请输入负责人电话', trigger: 'blur'},
                        {pattern:/^[0-9]\d*$/, message:'请输入正整数'},
                        {type:'number',  validator: loginAccountRules, trigger: 'blur'},
                    ],
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
                salersList: [{
                    label: "销售1",
                    value: 1
                },{
                    label: "销售2",
                    value: 2
                },{
                    label: "销售3",
                    value: 3
                }],
                //技术人员列表
                technologist:[{
                    label: "技术1",
                    value: 1
                },{
                    label: "技术2",
                    value: 2
                }],
                //地区列表
                areaList: []
            }
        },
        mounted(){
            if(this.$route.params.addType == 1){
                this.dataForm.agencyLevle = 1;
            }else if(this.$route.params.addType == 2){
                this.dataForm.agencyLevle = 2;
            }else{
                this.dataForm.agencyLevle = 3;
            }
            this.getAddress();
            //获取销售人员列表
            this.$http.post('/user/selectAllUser', {
                    isAgency: 0,
                    roleId: 2
                }, response => {
//                  console.log(response);
                    if(response.data && response.data.length> 0){
                        this.salersList = response.data
                    }
                });

            //获取技术人员列表
            this.$http.post('/user/selectAllUser', {
                    isAgency: 0,
                    roleId: 3
                }, response => {
//                  console.log(response);
                    if(response.data && response.data.length> 0){
                        this.technologist = response.data
                    }
                });
        },
        methods: {
            // 产品类型变化
            handleagencyProvinceChange(agencyProvince) {
                var self = this;
                self.dataForm.agencyProvince = agencyProvince;
            },
            cancleAdd() {
                this.$router.push({ path: 'tradersAccount'})
            },
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
                this.dataForm.agencyCity = '';
                console.log(code);
                this.$http.post('/address/queryAddressForFourLinkage', {addressLevel:2,parentId:code}, response => {
                    if(response.data) {
                        console.log(response.data);
                        this.cityList = response.data;
                    }
                });
            },
            addAccount() {
                console.log(this.dataForm)
                if(this.$route.params.parentData){
                    this.dataForm.parentCode = this.$route.params.parentData.agencyCode
                }
                this.$http.post('/agency/addAgency', this.dataForm, response => {
                  console.log(response);
                  if(response.code==200){
                    //this.$message({
                    //    message: response.message,
                    //    type: 'warning'
                    //});
                    this.$router.push({ path: 'tradersAccount'})
                  }else{
                    this.$message({
                        message: response.message,
                        type: 'warning'
                    });
                  }

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
