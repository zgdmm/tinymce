<template>
    <div>
        <div style="padding:20px">
            <div class="ats-sale-title" @click="$router.push('/activity')">活动管理</div>
            <div style="background:#fff;padding:20px">
                <div style="width: 100%;">
                    <p class="title">活动详情</p>
                    <!--新增经销商-->
                    <!--v-if="!$route.query.id" -->
                    <el-form :label-position="labelPosition" ref="form" :model="dataForm" label-width="120px">
                        <el-form-item label="活动标题" prop="activityTitle">
                            <!--<el-input v-model="dataForm.activityTitle"></el-input>-->
                            <div>{{!this.$route.query.id ? dataForm.activityTitle:dataForm.title}}</div>
                        </el-form-item>
                        <!--<el-form-item label="活动发起人" prop="activitySponsor">
                                <div>{{!this.$route.query.id ? dataForm.activitySponsor||'--':dataForm.activitySponsor}}</div>
                            </el-form-item>-->
                        <el-form-item label="发布时间" prop="activityTime">
                            <div>{{!this.$route.query.id ?dataForm.activityTime:dataForm.addDateStr}}</div>
                            <!--<el-date-picker type="date"  value-format="yyyy年MM月dd日" placeholder="选择日期" v-model="dataForm.activityTime" style="width: 100%;"></el-date-picker>-->
                        </el-form-item>
                        <!--<el-form-item label="活动类型" prop="activityType">
                            <div>{{dataForm.activityType=='meeting' ?'会议':'培训'}}</div>
                        </el-form-item>-->
                        <el-form-item label="活动内容" prop="activityContent">
                            <!--<editor id='tinymce' v-model='dataForm.activityContent' :init='init'></editor>-->
                            <div v-html="!this.$route.query.id ? dataForm.activityContent:dataForm.content"></div>
                        </el-form-item>
    
                        <!--<el-form-item>
                                <el-button type="primary" @click="addAccount">确定</el-button>
                                <el-button @click="cancleAdd">取消</el-button>
                            </el-form-item>-->
                    </el-form>
                    <!--content-->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import uploadPhoto from "../../components/uploadPhotoSin.vue";
import E from 'wangeditor';
import wangEdit from '../../components/wangEdit.vue';
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
            level: false,
            labelPosition: 'right',
                dataForm: {
                    activityType: '',
                    activityContent: '',
                    activityTime: '',
                    activityTitle: '',
                    activitySponsor: ''
                    // region: ''
                },
                productProperties: [],
                rules: {
                    activityType: [{
                        required: true,
                        message: '请选择产品类型',
                        trigger: 'change'
                    },
                    ],
                    activityTime: [{
                        required: true,
                        message: '请选择发布时间',
                        trigger: 'change'
                    }
                    ],
                    activityContent: [{
                        required: true,
                        message: '请输入活动内容',
                        trigger: 'change'
                    }],
                    activitySponsor: [{
                        required: true,
                        message: '请输入活动发起人',
                        trigger: 'blur'
                    }],
                    activityTitle: [{
                        required: true,
                        message: '请输入活动标题',
                        trigger: 'blur'
                    }],
                },
                rulesParam: {
                    paramName: [{
                        required: true,
                        message: '请输入参数名',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 20,
                        message: '参数名最大长度为20',
                        trigger: 'blur'
                    }
                    ],
                    paramValue: [{
                        required: true,
                        message: '请输入参数值',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 50,
                        message: '参数值最大长度为50',
                        trigger: 'blur'
                    }
                    ],
                },
                options: [{ value: '培训', code: 'training' }, { value: '会议', code: 'meeting' }],//产品类型
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
                activityCode: '',
                dialogFormVisible: false,
                paramEdit: false,
                paramIndex: '',
            }
        },
            mounted() {
            
            // 产品类型
            // this.getDeviceType();
            console.log(this.$route.query.activityCode);
            this.queryProduct(this.$route.query.activityCode);
            this.activityCode = this.$route.query.activityCode;

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
                let param = { activityCode: code };
                let url = '/activityMng/queryActivityInfoByCode';
                if (this.$route.query.id) {
                    param = { id: this.$route.query.id };
                    url = '/activity/getHtmlActivityDetail';
                }
                self.$http.post(url, param, result => {
                    if (result.code) {
                        // this.dataForm.activityType = result.data.activityType;
                        // this.dataForm.activityTime = result.data.activityTime;
                        // this.dataForm.activityTitle = result.data.activityTitle;
                        // this.dataForm.activityContent = result.data.activityContent;
                        // this.dataForm.activitySponsor = result.data.activitySponsor;
                        this.dataForm = result.data;
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
                console.log(this.dataForm.imageUrl, 'type')
            },
            // 产品类型变化
            handleTypeChange(status) {
                var self = this;
                self.dataForm.activityType = status;
            },

            cancleAdd() {
                this.$router.push({ path: 'activity' })
            },
            addAccount() {
                console.log(this.dataForm, 'this.dataForm');
                if (this.activityCode) {
                    this.dataForm.activityCode = this.activityCode;
                    let params = Object.assign(this.dataForm);
                    console.log(this.dataForm, params);
                    this.$http.post('/activityMng/updateActivityInfo', params, response => {
                        if (response.success) {
                            this.$router.push({ path: 'activity' });
                        }
                        this.$message({
                            message: response.message,
                            type: 'warning'
                        });

                    });
                } else {
                    let params = Object.assign(this.dataForm);
                    console.log(this.dataForm, params);
                    this.$http.post('/activityMng/insertActivityInfo', params, response => {
                        if (response.success) {
                            this.$router.push({ path: 'activity' });
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