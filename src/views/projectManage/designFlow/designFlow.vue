<template>

  <div class="design-flow">
    <el-breadcrumb style="margin: 8px 0;font-size: 12px;margin-left: 24px" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>设计方案</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="design-flow-container">
      <left-label style="padding-top: 10px;margin-left: 20px;margin-bottom: 30px" label-name="设计方案"></left-label>
      <div style="margin: 0 auto;width: 80%">
        <el-steps :active="active" :space="150" align-center process-status="wait"  finish-status="success">
          <el-step title="基本信息"></el-step>
          <el-step title="无人机建模"></el-step>
          <el-step title="设计概要"></el-step>
          <el-step title="设备选型"></el-step>
          <el-step title="设计图纸"></el-step>

        </el-steps>
      </div>
      <!--<router-view/>-->
        <keep-alive>
          <component  v-bind:is="currentStepComponent"></component>
        </keep-alive>

    </div>

  </div>

</template>

<script>
  import leftLabel from "../../../components/leftLabel"
  import airModel from "../designFlow/airModel"
  import designBaseInfo from "../designFlow/designBaseInfo"
  import designDrawings from "../designFlow/designDrawings"
  import designOutline from "../designFlow/designOutline"
  import equipmentSelect from "../designFlow/equipmentSelect"


  export default {
        name: "design-flow",
        data(){
            return {
              active: 1,
              projectCode:'',
              projectStatus:'',
              currentStepComponent:'',

            }

        },
        mounted(){
          this.projectCode = this.$route.query.projectCode;
          this.projectStatus = this.$route.params.id;
          this.currentStepComponent = 'designBaseInfo';


        },
    computed:{
      stepNumer(){
          return this.$store.state.stepNumer;
      }
    },
    components:{
      leftLabel,
      airModel,
      designBaseInfo,
      designDrawings,
      designOutline,
      equipmentSelect
    },
    watch:{
       "stepNumer":function (val) {
           this.active = val;
         switch(val)
         {
           case 1:
             this.currentStepComponent = 'designBaseInfo';
             break;
           case 2:
             this.currentStepComponent = 'airModel';
             break;
           case 3:
             this.currentStepComponent = 'designOutline';
             break;
           case 4:
             this.currentStepComponent = 'equipmentSelect';
             break;
           case 5:
             this.currentStepComponent = 'designDrawings';
             break;
           default:
         }
       }
    }
    }
</script>

<style  lang="less">
  .design-flow{
    .demo-ruleForm{
      width: 600px;
      margin: 0 auto;
    }
    .el-form-item__content{
      text-align: left;
    }
    .design-flow-container{
      margin: 24px;
      background: #ffffff;
      margin-top: 0;
      padding-bottom: 194px
    }
    .el-button--primary{
      background: #409eff;
      border-color:#409eff;
      border-radius: 4px;
    }
  }

</style>
