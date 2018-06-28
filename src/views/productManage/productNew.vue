<template>
    <div>
        <el-breadcrumb separator="/">
            <!--<el-breadcrumb-item :to="{ path: '/' }">账号管理</el-breadcrumb-item>-->
            <el-breadcrumb-item>
                <a style="
                                                    color: rgba(0,0,0,0.30);" @click='cancleAdd'>产品管理</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item>{{productCode?'编辑产品':'新增产品'}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="main-contain" style="background:#F5F5F5;">
            <div style="background:#fff;padding:20px">
                <div style="width: 60%;">
                    <p class="title">{{productCode?'编辑产品':'新增产品'}}</p>
                    <!--新增经销商-->
                    <el-form :label-position="labelPosition" ref="form" :model="dataForm" :rules="rules" label-width="120px">
                        <el-form-item label="产品类型" prop="productType">
                            <el-select style="width: 100%;" v-model="dataForm.productType" placeholder="请选择产品类型" @change="handleTypeChange">
                                <el-option v-for="item in options" :key="item.value" :label="item.value" :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="支架类型" v-if="dataForm.productType==8" prop="roofType">
                            <el-select style="width: 100%;" v-model="dataForm.roofType" placeholder="请选择产品类型" @change="handleroofTypeChange">
                                <el-option v-for="item in optionsRoofType" :key="item.value" :label="item.value" :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="产品型号" prop="productModel">
                            <el-input v-model="dataForm.productModel"></el-input>
                        </el-form-item>
                        <el-form-item label="产品主图" prop="imageUrl">
                            <upload-photo @getPhotos="getChildData" type='imageUrl' :image='dataForm.imageUrl'></upload-photo>
                        </el-form-item>
                        <el-form-item label="安装示意图" prop="diagramUrl" v-if="dataForm.productType==8">
                            <upload-photo @getPhotos="getChildData" type='diagramUrl' :image='dataForm.diagramUrl'></upload-photo>
                            <div style="font-size: 12px;
    color: #999999;text-align:left;">请上传支架系统安装示意图的高清大图</div>
                        </el-form-item>
                        <el-form-item label="产品参数" prop="productProperties" v-if="dataForm.productType!=8">
                            <el-table :data="productProperties" style="width: 100%" :border='true'>
                                <el-table-column label="参数名" prop="paramName">
                                    <template slot-scope="scope">
                                        {{scope.row.paramName||'--'}}
                                    </template>
                                </el-table-column>
                                <el-table-column label="参数内容" prop="paramValue">
                                    <template slot-scope="scope">
                                        {{scope.row.paramValue||'--'}}
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" prop="operation">
                                    <template slot-scope="scope">
                                        <el-button round type="text" @click="handleEdit(scope)" size="small">修改
                                        </el-button>
                                        <el-button round type="text" v-if="scope.row.paramName!='最大输出功率（Pmax）'" @click="handleDel(scope)" size="small">删除
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-button round type="text" @click="handleNewPara()" size="small">新增参数
                            </el-button>
                        </el-form-item>
                        <el-form-item label="产品描述" prop="productDesc" v-if="dataForm.productType!=8">
                            <wangEdit ref="wangeditor"></wangEdit>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="addAccount">确定</el-button>
                            <el-button @click="cancleAdd">取消</el-button>
                        </el-form-item>
                    </el-form>
                    <!-- 新增用户 -->
                    <el-dialog :before-close="handleClose" width="40%" :title="paramEdit?'编辑参数':'新增参数'" :visible.sync="dialogFormVisible">
                        <el-form :model="ruleFormAdd" :rules="rulesParam" ref="ruleFormAdd" label-width="130px" class="demo-ruleForm">
                            <el-form-item label="参数名" prop="paramName">
                                <el-input placeholder="请输入" v-model="ruleFormAdd.paramName"></el-input>
                            </el-form-item>
                            <el-form-item label="参数值" prop="paramValue">
                                <el-input placeholder="请输入" v-model="ruleFormAdd.paramValue"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('ruleFormAdd')">确定</el-button>
                                <el-button @click="handleClose('ruleFormAdd')">取消</el-button>
                            </el-form-item>
                        </el-form>
                    </el-dialog>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import uploadPhoto from "../../components/uploadPhotoSin.vue"
import E from 'wangeditor';
import wangEdit from '../../components/wangEdit.vue';
export default {
    name: "productNew",
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
                productType: '',
                productModel: '',
                productProperties: '',
                productDesc: '',
                imageUrl: '',
                diagramUrl: '',
                roofType:''
                // region: ''
            },
            productProperties: [],
            rules: {
                productType: [{
                    required: true,
                    message: '请选择产品类型',
                    trigger: 'change'
                },
                ],
                roofType: [{
                    required: true,
                    message: '请选择支架类型',
                    trigger: 'change'
                },
                ],
                productModel: [{
                    required: true,
                    message: '请输入产品型号',
                    trigger: 'blur'
                },
                {
                    min: 1,
                    max: 100,
                    message: '产品型号最大长度100',
                    trigger: 'blur'
                }
                ],
                imageUrl: [{
                    required: true,
                    message: '请上传产品主图',
                    trigger: 'change'
                }],
                diagramUrl: [{
                    required: true,
                    message: '请上传安装示意图',
                    trigger: 'change'
                }]
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
            options: [],//产品类型
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
            productCode: '',
            dialogFormVisible: false,
            paramEdit: false,
            paramIndex: '',
            optionsRoofType: [],//支架类型
        }
    },
    mounted() {
        // 产品类型
        this.getDeviceType();
        // 支架类型
        this.getRoofType();
        console.log(this.$route.query.productCode);
        if (this.$route.query.productCode) {
            this.queryProduct(this.$route.query.productCode);
            this.productCode = this.$route.query.productCode;
        }

    },
    methods: {
        // 支架类型
        getRoofType() {
            var self = this;
            self.$http.post('/project/selectRoofType.json ', {}, result => {
                if (result.code == 200) {
                    this.optionsRoofType = result.data;
                    console.log(result.message);
                } else {
                    self.$message({
                        message: result.message,
                        type: 'warning'
                    });
                }
            });
        },
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
        //新增成员提交
        submitForm(formName) {
            this.$refs['ruleFormAdd'].validate((valid) => {
                if (valid) {
                    var self = this;
                    console.log(this.ruleFormAdd, 'ruleFormAdd');
                    const { ...newObj } = this.ruleFormAdd;
                    // const newObj = this.deepCopy(this.ruleFormAdd);
                    if (this.paramEdit) {
                        let flag = true;
                        this.productProperties[this.paramIndex].paramName = newObj.paramName;
                        this.productProperties[this.paramIndex].paramValue = newObj.paramValue;
                        this.dialogFormVisible = false;
                    } else {
                        let flag = true;
                        this.productProperties.forEach(function (element) {
                            if (element.paramName == newObj.paramName) {
                                this.$message('参数名不能重复');
                                flag = false;
                                return false;
                            }
                        }, this);
                        if (flag) {
                            this.dialogFormVisible = false;
                            self.productProperties.push({ paramName: this.ruleFormAdd.paramName, paramValue: this.ruleFormAdd.paramValue });
                            self.$refs['ruleFormAdd'].resetFields();
                        }
                    }

                }
            })

        },
        // 新增参数
        handleNewPara() {
            const self = this;
            this.paramEdit = false;
            this.dialogFormVisible = true;
            self.$refs['ruleFormAdd'] && self.$refs['ruleFormAdd'].resetFields();
            console.log(this.dialogFormVisible);
        },
        // 查询产品
        queryProduct(code) {
            const self = this;
            self.$http.post('/product/selectByCode.json', { productCode: code }, result => {
                if (result.code == 200) {
                    this.dataForm.productType = result.data.productType;
                    this.dataForm.productModel = result.data.productModel;
                    this.dataForm.productProperties = result.data.productProperties;
                    this.dataForm.roofType = result.data.roofCode;
                    const [...productProperties] = JSON.parse(result.data.productProperties);
                    this.productProperties = productProperties;
                    console.log(this.productProperties);
                    this.dataForm.productDesc = result.data.productDesc;
                    this.dataForm.imageUrl = result.data.imageUrl;
                    this.dataForm.diagramUrl = result.data.diagramUrl;
                    if (this.dataForm.productType != 8) {
                        this.$refs.wangeditor.editor.txt.html(result.data.productDesc);
                    }
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
            self.dataForm.productType = status;
            this.$http.post('/product/selectProductProperties.json', { productType: status }, result => {
                // if (result.code == 200) {
                //  = result.data;
                this.productProperties = result;
                console.log(this.productProperties);
                // }
            })
        },
        handleroofTypeChange(status) {
            var self = this;
            self.dataForm.roofType = status;
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
        cancleAdd() {
            this.$router.push({ path: 'productManage' })
        },
        addAccount() {
            console.log(this.dataForm, 'this.dataForm');
            if (this.dataForm.productType != 8) {
                this.dataForm.productDesc = this.$refs.wangeditor.editor.txt.html();
            }
            if (!this.dataForm.imageUrl) {
                this.$message({
                    message: '请上传产品主图',
                    type: 'warning'
                });
                return false
            }
            if (this.dataForm.productType == 8 && !this.dataForm.diagramUrl) {
                this.$message({
                    message: '请上传安装示意图',
                    type: 'warning'
                });
            }
            if (this.dataForm.imageUrl.indexOf('http') > -1) {

                var index = this.dataForm.imageUrl.lastIndexOf("\/");
                this.dataForm.imageUrl = 'image/pc/' + this.dataForm.imageUrl.substring(index + 1, this.dataForm.imageUrl.length);
                console.log(this.dataForm.imageUrl);
            }
            if (this.dataForm.diagramUrl && this.dataForm.diagramUrl.indexOf('http') > -1) {

                var index = this.dataForm.diagramUrl.lastIndexOf("\/");
                this.dataForm.diagramUrl = 'image/pc/' + this.dataForm.diagramUrl.substring(index + 1, this.dataForm.diagramUrl.length);
                console.log(this.dataForm.diagramUrl);
            }
            if (this.productCode) {
                this.dataForm.productCode = this.productCode;
                let params = Object.assign(this.dataForm);
                params.productProperties = JSON.stringify(this.productProperties);
                console.log(this.dataForm, params);
                this.$http.post('/product/updateProduct.json', params, response => {
                    if (response.success) {
                        this.$router.push({ path: 'productManage' });
                    }
                    this.$message({
                        message: response.message,
                        type: 'warning'
                    });

                });
            } else {
                let params = Object.assign(this.dataForm);
                params.productProperties = JSON.stringify(this.productProperties);
                console.log(this.dataForm, params);
                this.$http.post('/product/addProduct.json', params, response => {
                    if (response.success) {
                        this.$router.push({ path: 'productManage' });
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
            this.productProperties.splice(scope.$index, 1)
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