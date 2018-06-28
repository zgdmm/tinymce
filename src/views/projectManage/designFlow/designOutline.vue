<template lang="html">
<div>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">

  <el-form-item label="项目类型" prop="projectType" >
    <el-select clearable v-model="ruleForm.projectType" size="small" style="width:360px;" placeholder="请选择项目类型">
      <el-option label="BAPV" value="BAPV"></el-option>
      <el-option label="BIPV" value="BIPV"></el-option>
    </el-select>
  </el-form-item>
   <el-form-item label="屋顶可利用面积(m²)"  prop="roofAvailAcreage">
    <el-input clearable v-model="ruleForm.roofAvailAcreage" size="small" style="width:360px;" placeholder="请填写屋顶可利用面积"></el-input>
  </el-form-item>
  <el-form-item label="安装面积(m²)"  prop="installAcreage">
   <el-input clearable v-model="ruleForm.installAcreage" size="small" style="width:360px;" placeholder="请填写安装面积"></el-input>
 </el-form-item>
 <el-form-item label="安装方式" prop="installType">
   <el-select multiple clearable v-model="ruleForm.installType" size="small" style="width:360px;" placeholder="请选择安装方式">
     <el-option label="挂钩连接" value="挂钩连接"></el-option>
     <el-option label="夹具连接" value="夹具连接"></el-option>
     <el-option label="混凝土立柱配重" value="混凝土立柱配重"></el-option>
   </el-select>
 </el-form-item>
  <el-form-item label="系统效率(%)"  prop="systemEffect">
   <el-input clearable v-model="ruleForm.systemEffect" size="small" style="width:360px;" placeholder="请填写系统效率"></el-input>
 </el-form-item>
 <el-form-item label="防雷垂直接地电阻" prop="earthingResistance">
   <el-select clearable v-model="ruleForm.earthingResistance" size="small" style="width:360px;" placeholder="请选择电阻">
     <el-option label="不大于10Ω" value="不大于10Ω"></el-option>
     <el-option label="不大于4Ω" value="不大于4Ω"></el-option>
   </el-select>
 </el-form-item>
 <el-form-item label="电气设计说明"  prop="infoText">
   <el-input clearable v-model="ruleForm.infoText" size="small" style="width:360px;" placeholder="请填写电气说明"></el-input>
 </el-form-item>
 <el-form-item>
   <el-row style="margin-top: 46px" type="flex" justify="center">
        <el-row type="flex">
          <el-button  @click="nextFlow('ruleForm')"  type="primary">下一步</el-button>
          <el-button  @click="goBack()">上一步</el-button>
          <el-button  @click="reset('ruleForm')">重置</el-button>
        </el-row>
      </el-row>
  </el-form-item>
</el-form>

</div>
</template>
<script>
export default {
  data() {
     return {
       ruleForm: {
         projectType: '', //项目类型
         roofAvailAcreage: '', //屋顶可利用面积
         earthingResistance: '',  //电阻
         installAcreage: '', //安装面积
         installType: [], //安装方式
         systemEffect: '', //系统效率
         infoText:'',//电气设计说明
         projectCode:'',//项目编码
       },
       rules: {
         projectType: [
           { required: true, message: '项目类型是必选项', trigger: 'blur' }
         ],
         earthingResistance: [
           { required: true, message: '防雷垂直接地电阻是必填项', trigger: 'change' }
         ],
         roofAvailAcreage: [
           { required: true, message: '屋顶可利用面积是必填项', trigger: 'change' }
         ],
         installAcreage: [
           {required: true, message: '安装面积是必填项', trigger: 'change' }
         ],
         installType: [
           {required: true, message: '安装方式是必选项', trigger: 'change' }
         ],
         systemEffect: [
           { required: true, message: '系统效率是必选项', trigger: 'change' }
         ],
         infoText: [
           { required: true, message: '电气说明是必选项', trigger: 'change' }
         ],

       }
     };
  },
  mounted(){
    this.ruleForm.projectCode= this.$route.query.projectCode;
    this.getEditData();
  },
   methods: {
     getEditData(){
       this.$http.post('/design/selectDesignForUpdate', {projectCode:'CS11000023'}, response => {
         if(response.code==200){
           let data = response.data?response.data:{};
           console.log(data);
           this.ruleForm.projectType=data.projectType;
           this.ruleForm.roofAvailAcreage=data.roofAvailAcreage;
           this.ruleForm.earthingResistance=data.earthingResistance;
           this.ruleForm.installAcreage=data.installAcreage;
           this.ruleForm.installType=data.installType.split(',');
           this.ruleForm.systemEffect=data.systemEffect;
           this.ruleForm.infoText=data.infoText;
           let editdata = JSON.stringify(data);
           localStorage.setItem('editdata',editdata+'');
         }else {
           this.$message({
             message:response.message,
             type: 'warning'
           });
         }
       });

     },
     nextFlow(formName) {
       let installType =this.ruleForm.installType?this.ruleForm.installType.join(','):'';
       //this.ruleForm.installType = installType;
       console.log('+++++',installType);

       let obj = Object.assign({},this.ruleForm);
       obj.installType = installType;
       console.log("installType",obj);
       this.$refs[formName].validate((valid) => {
         if (valid) {
             let ruleForm =  JSON.stringify(obj);
           localStorage.setItem('designOutline',ruleForm+'');
           this.$store.dispatch('setStepNumber',4);
         } else {
           console.log('error submit!!');
           return false;
         }
       });
     },
     reset(formName) {
       this.$refs[formName].resetFields();
     },
     onSubmit() {
       console.log('submit!');
     },
     goBack(){
       this.$store.dispatch('setStepNumber',2);

     }
   },
  watch:{

  }
}
</script>

<style scoped  lang="less">
.demo-ruleForm{
  width:600px;
  margin:0 auto;
}
</style>
