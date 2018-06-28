<template>
    <div>
        <div style="padding:20px">
            <div class="ats-sale-title" @click="$router.push('/notice')">通知公告管理</div>
            <div style="background:#fff;padding:20px">
                <div style="width: 100%;">
                    <p class="title">{{articleCode?'编辑通知公告':'新增通知公告'}}</p>
                    <!--新增经销商-->
                    <el-form :label-position="labelPosition" ref="form" :model="dataForm" :rules="rules" label-width="120px">
                        <el-form-item label="通知公告标题" prop="articleTitle">
                            <el-input v-model="dataForm.articleTitle"></el-input>
                        </el-form-item>
                        <el-form-item label="通知公告来源" prop="articleOrigin">
                            <el-input v-model="dataForm.articleOrigin"></el-input>
                        </el-form-item>
                        <el-form-item label="发布时间" prop="publishTime">
                            <el-date-picker :clearable='false' type="date"  value-format="yyyy年MM月dd日" placeholder="选择日期" v-model="dataForm.publishTime" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                        <!--<el-form-item label="通知公告类型" prop="articleType">
                            <el-select style="width: 100%;" v-model="dataForm.articleType" placeholder="请选择" @change="handleTypeChange">
                                <el-option v-for="item in options" :key="item.value" :label="item.value" :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>-->
                        <el-form-item label="通知公告内容" prop="articleContent">
                             <wangEdit  ref="wangeditor"></wangEdit>
                            <!--<editor id='tinymce' v-model='dataForm.articleContent' :init='init'></editor>-->
                            <!--<tinymceEdit></tinymceEdit>-->
                        </el-form-item>
                        
                        <el-form-item>
                            <el-button type="primary" @click="addAccount">确定</el-button>
                            <el-button @click="cancleAdd">取消</el-button>
                        </el-form-item>
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
import tinymceEdit from '../../components/tinymceEdit.vue';
export default {
    name: "noticeNew",
    components: {
        uploadPhoto, wangEdit,tinymceEdit
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
                plugins: "image imagetools",
                image_caption: true,
                image_advtab: true,
                content_css: [
                '/alitech/static/css/github-markdown.css',],
                // menubar: "insert",
                // image_list:[],
                // plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
                // toolbar:
                // 'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
                branding: false,
                file_browser_callback: function (field_name, url, type, win) {
                    console.log(field_name);
                    if (type == 'media') return false;
                    var accept = {
                        image: 'image/png, image/gif, image/jpg, image/jpeg',
                        media: 'audio/mpeg, audio/wav, video/mp4, video/webm, video/ogg'
                    };

                    var eleFile = $('<input type="file" accept="' + accept[type] + '">');
                    eleFile.click();

                    eleFile.on('change', function () {
                        var file = this.files[0];
                        var name = file.name || 'screenshot.png';
                        var data = new FormData();
                        data.append('file', file, name);
                        $.ajax('/oss/upload.json', {
                            data: data,
                            type: 'POST',
                            processData: false,
                            contentType: false
                        }).done(function (res) {
                            if (res.code == 200) {
                                $('#' + field_name).val(res.data.url);
                            } else {
                                alert(res.message);
                            }
                        }).fail(function (xhr) {
                            if (xhr.responseText) {
                                alert(xhr.responseText);
                            }
                        });
                    });
             }
            },
            level: false,
            labelPosition: 'right',
            dataForm: {
                articleContent: '',
                publishTime: '',
                articleTitle: '',
                articleOrigin:''
                // region: ''
            },
            productProperties: [],
            rules: {
                articleType: [{
                    required: true,
                    message: '请选择产品类型',
                    trigger: 'change'
                },
                ],
                publishTime: [{
                    required: true,
                    message: '请选择发布时间',
                    trigger: 'change'
                }
                ],
                articleContent:[{
                    required: true,
                    message: '请输入通知公告内容',
                    trigger: 'change'
                }],
                articleOrigin: [{
                    required: true,
                    message: '请输入通知公告来源',
                    trigger: 'blur'
                }],
               articleTitle: [{
                    required: true,
                    message: '请输入通知公告标题',
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
            articleCode: '',
            dialogFormVisible: false,
            paramEdit: false,
            paramIndex: '',
        }
    },
    mounted() {
        console.log(this.Editor)
        // 产品类型
        // this.getDeviceType();
        console.log(this.$route.query.articleCode);
        if (this.$route.query.articleCode) {
            this.queryProduct(this.$route.query.articleCode);
            this.articleCode = this.$route.query.articleCode;
        }
     
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
            self.$http.post('/noticeMng/queryNoticeInfoByCode', { articleCode: code }, result => {
                if (result.code) {
                    this.dataForm.publishTime = result.data.publishTime;
                    this.dataForm.articleTitle = result.data.articleTitle;
                    this.dataForm.articleContent = result.data.articleContent;
                    this.$refs.wangeditor.editor.txt.html(result.data.articleContent||'');
                    this.dataForm.articleOrigin = result.data.articleOrigin;
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
            self.dataForm.articleType = status;
        },

        cancleAdd() {
            this.$router.push({ path: 'notice' })
        },
        addAccount() {
            var self = this;
            console.log(tinymce.get('tinymce').getContent(), 'this.dataForm');
            this.dataForm.articleContent=this.$refs.wangeditor.editor.txt.html();
            self.$refs['form'].validate((valid) => {
                if (valid) {
                    if (this.articleCode) {
                        this.dataForm.articleCode = this.articleCode;
                        let params = Object.assign(this.dataForm);
                        console.log(this.dataForm, params);
                        this.$http.post('/noticeMng/updateNoticeInfo', params, response => {
                            if (response.success) {
                                this.$router.push({ path: 'notice' });
                            }
                            this.$message({
                                message: response.message,
                                type: 'warning'
                            });

                        });
                    } else {
                        let params = Object.assign(this.dataForm);
                        console.log(this.dataForm, params);
                        this.$http.post('/noticeMng/insertNoticeInfo', params, response => {
                            if (response.success) {
                                this.$router.push({ path: 'notice' });
                            }
                            this.$message({
                                message: response.message,
                                type: 'warning'
                            });

                        });
                    }
                }
            })
            
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