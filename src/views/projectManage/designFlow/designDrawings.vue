<template>
    <div >
      <el-row style="width: 800px;margin: 0 auto" type="flex" justify="space-between">
        <el-col :span="8">
          <div style="margin-bottom: 10px">组件排布图</div>
          <upload-photo :componentPhotosList="componentPhotosList" @getPhotos="getChildData1"></upload-photo>
        </el-col>
        <el-col :span="8">
          <div style="margin-bottom: 10px">组串接线图</div>
          <upload-photo :electricPhotosList="electricPhotosList" @getPhotos="getChildData2"></upload-photo>
        </el-col>
      </el-row>
      <el-row style="margin-top: 46px" type="flex" justify="center">
        <el-row type="flex">
          <el-button  @click="submit('ruleForm')"  type="primary">提交方案</el-button>

            <el-button  @click="preview('ruleForm')">预览方案</el-button>
          <el-button  @click="lastStep()">上一步</el-button>
        </el-row>
      </el-row>
    </div>
</template>

<script>
  import uploadPhoto from "../../../components/uploadPhoto.vue"

  export default {
        name: "design-drawings",
        data(){
            return {
                drawPhotos:{
                  componentPhotos:'',
                  electricPhotos:'',
                },
                allParams:{},
              equipmentSelectData:{},
              projectCode:'',
              componentPhotosList:[],
              electricPhotosList:[],

            }
        },
    mounted(){
       this.projectCode = this.$route.query.projectCode;
       this.allParams = JSON.parse(localStorage.designOutline);
      let equipmentSelectData = JSON.parse(localStorage.equipmentSelectData);
      let editdata =JSON.parse(localStorage.editdata);
      if(editdata){
       this.componentPhotosList = editdata.componentPhotosList;
       this.electricPhotosList = editdata.electricPhotosList
      }

      this.allParams.deviceChoose =equipmentSelectData.list;
      this.allParams.componetNum = equipmentSelectData.obj.componetNum;
      this.allParams.comBunchNum = equipmentSelectData.obj.comBunchNum;
      this.allParams.installedCapacity = equipmentSelectData.obj.installedCapacity+'';


     // console.log('designOutline:',allParams);
      //console.log('equipmentSelectData:',equipmentSelectData)

    },
      methods:{
        getChildData1(val){
          this.drawPhotos.componentPhotos = val ? val.join(',') : '';
        },
        getChildData2(val){
          this.drawPhotos.electricPhotos = val ? val.join(',') : '';
        },
        lastStep(){
          this.$store.dispatch('setStepNumber',4);

        },
        submit(){//提交
          this.allParams.componentPhotos = this.drawPhotos.componentPhotos;
          this.allParams.electricPhotos  = this.drawPhotos.electricPhotos;
          console.log(this.allParams);
          this.submitDesign();
        },
        submitDesign(){
          this.$http.post('/design/submitDesign', this.allParams, response => {
            if(response.code==200){
              this.$message({
                message:'提交设计方案成功',
                type: 'success'
              });
              this.$router.push("/projectManage");
              localStorage.clear();
            }else {
              this.$message({
                message:response.message,
                type: 'warning'
              });
            }
          });

        },

        preview(){//预览
          this.allParams.componentPhotos = this.drawPhotos.componentPhotos;
          this.allParams.electricPhotos  = this.drawPhotos.electricPhotos;
          this.$http.post('/design/previewDesign', this.allParams, response => {
            if(response.code==200){

              let routeData = this.$router.resolve({ path: '/previewDesign', query: {projectCode:this.projectCode}});
              window.open(routeData.href, '_blank');
            }else {
              this.$message({
                message:response.message,
                type: 'warning'
              });
            }
          });
        }
      },
    components:{
      uploadPhoto
    }
    }
</script>

<style scoped>

</style>
