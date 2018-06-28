<template>
    <div>
        <div style="padding:20px">
            <div class="ats-sale-title" @click="$router.push('/parkmerchants')">园区招商</div>
            <div style="background:#fff;padding:20px">
                <div style="width: 100%;">
                    <p class="title">园区招商详情</p>
                    <!--新增经销商-->
                    <el-form :label-position="labelPosition" ref="form" :model="dataForm" label-width="120px">
                        <el-form-item label="园区名称" prop="parkName">
                            <!--<el-input v-model="dataForm.parkName"></el-input>-->
                            <div>{{!$route.query.id ? dataForm.parkName :dataForm.name}}</div>
                        </el-form-item>
                        <el-form-item label="发展定位" prop="developPosition">
                            <!--<el-input v-model="dataForm.developPosition"></el-input>-->
                            <div>{{!$route.query.id ?dataForm.developPosition:dataForm.type}}</div>
                        </el-form-item>
                        <el-form-item label="园区面积" prop="parkArea">
                            <!--<el-input v-model="dataForm.parkArea"></el-input>-->
                             <div>{{!$route.query.id ?dataForm.parkArea:dataForm.area}}</div>
                        </el-form-item>
                        <el-form-item label="园区地址" prop="parkAddress">
                            <!--<el-input v-model="dataForm.parkAddress"></el-input>-->
                            <div>{{!$route.query.id ?dataForm.parkAddress:dataForm.address}}</div>
                        </el-form-item>
                        <el-form-item label="运营商" prop="parkOperator">
                            <!--<el-input v-model="dataForm.parkOperator"></el-input>-->
                            <div>{{!$route.query.id ?dataForm.parkOperator:dataForm.operator}}</div>
                        </el-form-item>
                         <el-form-item label="联系方式" prop="phone">
                            <!--<el-input v-model="dataForm.phone"></el-input>-->
                            <div>{{!$route.query.id ?dataForm.phone:dataForm.contactInformation}}</div>
                        </el-form-item>
                        <el-form-item label="园区简介" prop="parkIntroduction">
                            <div v-html="!$route.query.id ?dataForm.parkIntroduction:dataForm.introduction"></div>
                            <!--<editor id='tinymce' v-model='dataForm.parkIntroduction' :init='init'></editor>-->
                        </el-form-item>
                        <el-form-item label="图片" prop="articleImgs">
                            <!--<upload-photo @getPhotos="getChildData" type='articleImgs' :image='dataForm.articleImgs'></upload-photo>-->
                            <img :src="dataForm.parkImgs" alt="">
                        </el-form-item>
                        <!--<el-form-item>
                            <el-button type="primary" @click="addAccount">确定</el-button>
                            <el-button @click="cancleAdd">取消</el-button>
                        </el-form-item>-->
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import uploadPhoto from "../../components/uploadPhotoSin.vue";
import E from 'wangeditor';
import wangEdit from '../../components/wangEdit.vue';
import Editor from '@tinymce/tinymce-vue'
export default {
    name: "noticeNew",
    components: {
        uploadPhoto, wangEdit
    },
    data() {
        return {
            ruleFormAdd: {
                paramName: '',
                paramValue: '',
            },
            init: {
                language_url: '/static/tinymce/langs/zh_CN.js',
                language: 'zh_CN',
                skin_url: '/static/tinymce/skins/lightgray',
                height: 100,
                // plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
                // toolbar:
                // 'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
                branding: false
            },
            level: false,
            labelPosition: 'right',
            dataForm: {
                parkIntroduction: '',
                developPosition: '',
                parkName: '',
                phone:'',
                parkAddress:'',
                parkArea:'',
                parkOperator:'',
                // region: ''
            },
            productProperties: [],
            rules: {
                parkName: [{
                    required: true,
                    message: '请输入园区名称',
                    trigger: 'blur'
                },
                ],
                developPosition: [{
                    required: true,
                    message: '请输入发展定位',
                    trigger: 'blur'
                }
                ],
                parkIntroduction:[{
                    required: true,
                    message: '请输入园区简介',
                    trigger: 'blur'
                }],
                parkAddress: [{
                    required: true,
                    message: '请输入园区地址',
                    trigger: 'blur'
                }],
               parkArea: [{
                    required: true,
                    message: '请输入园区面积',
                    trigger: 'blur'
                }],
                phone: [{
                    required: true,
                    message: '请输入联系方式',
                    trigger: 'blur'
                }],
                parkOperator: [{
                    required: true,
                    message: '请输入运营商',
                    trigger: 'blur'
                }],
            },
            options: [{value:'培训',code:'training'},{value:'会议',code:'meeting'}],//产品类型
            //销售人员列表
            salersList: [{
                label: "销售1",
                value: 1
            }, {
                label: "销售2",
                value: 2
            }, {
                label: "销售3",
                value: 3
            }],
            //技术人员列表
            technologist: [{
                label: "技术1",
                value: 1
            }, {
                label: "技术2",
                value: 2
            }],
            //地区列表
            areaList: [],
            parkCode: '',
            dialogFormVisible: false,
            paramEdit: false,
            paramIndex: '',
        }
    },
    mounted() {
        
        // 产品类型
        // this.getDeviceType();
        console.log(this.$route.query.parkCode);
        this.queryProduct(this.$route.query.parkCode);
        this.parkCode = this.$route.query.parkCode;
     
    },
    methods: {
        //新增弹框关闭
        handleClose(done) {
            const self = this;
            this.dialogFormVisible = false;
            self.$refs['ruleFormAdd'] && self.$refs['ruleFormAdd'].resetFields();
        },
        //新增用户-取消按钮
        resetForm(formName) {
            const self = this;
            this.dialogFormVisible = false;
            self.$refs['ruleFormAdd'] && self.$refs['ruleFormAdd'].resetFields();
        },
        // 查询产品
        queryProduct(code) {
            const self = this;
            let param = { parkCode: code };
            let url = '/parkMerchantsMng/queryParkMerchantsInfoByCode';
            if(this.$route.query.id){
                param = { id: this.$route.query.id };
                url = '/parkinvestment/getHtmlParkInvestmentDetail';
            }
            self.$http.post(url, param, result => {
                if (result.code) {
                    // this.dataForm.phone = result.data.phone;
                    // this.dataForm.parkAddress = result.data.parkAddress;
                    // this.dataForm.parkName = result.data.parkName;
                    // this.dataForm.parkIntroduction = result.data.parkIntroduction;
                    // this.dataForm.parkArea = result.data.parkArea;
                    // this.dataForm.parkOperator = result.data.parkOperator;
                    // this.dataForm.developPosition = result.data.developPosition;        
                    this.dataForm = result.data;  
                    // this.dataForm.parkImgs =result.data.parkImgs;
                    this.dataForm.parkImgs= result.data.imgsList&&result.data.imgsList[0]&&result.data.imgsList[0].url||'';          
                } else {
                    self.$message({
                        message: result.message,
                        type: 'warning'
                    });
                }
            });
        },
        // 上传回调
        getChildData(val, type) {
            //   this.closePhotos = val.join(',');
            console.log(val, type, '啦啦啦啦');
            this.dataForm[type] = val || '';
            console.log(this.dataForm.articleImgs, 'type')
        },
        // 产品类型变化
        handleTypeChange(status) {
            var self = this;
            self.dataForm.articleType = status;
        },

        cancleAdd() {
            this.$router.push({ path: 'parkmerchants' })
        },
        addAccount() {
            console.log(this.dataForm, 'this.dataForm');
            if (this.parkCode) {
                this.dataForm.parkCode = this.parkCode;
                let params = Object.assign(this.dataForm);
                console.log(this.dataForm, params);
                this.$http.post('/parkMerchantsMng/updateParkMerchantsInfo', params, response => {
                    if (response.success) {
                        this.$router.push({ path: 'parkmerchants' });
                    }
                    this.$message({
                        message: response.message,
                        type: 'warning'
                    });

                });
            } else {
                let params = Object.assign(this.dataForm);
                console.log(this.dataForm, params);
                this.$http.post('/parkMerchantsMng/insertParkMerchantsInfo', params, response => {
                    if (response.success) {
                        this.$router.push({ path: 'parkmerchants' });
                    }
                    this.$message({
                        message: response.message,
                        type: 'warning'
                    });

                });
            }
        },
        handleEdit(scope) {
            console.log(scope, 'scope')
            this.paramEdit = true;
            this.paramIndex = scope.$index;
            this.dialogFormVisible = true;
            this.ruleFormAdd.paramName = scope.row.paramName;
            this.ruleFormAdd.paramValue = scope.row.paramValue;
        },
        handleDel(scope) {
            // this.productProperties = this.productProperties.filter(function (item) {
            //     return row.paramValue != item.paramValue
            // })
        },
    }
}
</script>
<style scoped="scoped">
.main-contain {
    background: #fff;
    padding: 0px 24px 24px 24px;
    /*margin-top: 15px;*/
}

.el-breadcrumb {
    height: 34px;
    line-height: 34px;
    background: #f5f5f5;
    padding-left: 24px;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.30);
}
</style>