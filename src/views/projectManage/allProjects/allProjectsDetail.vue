<template>
  <div style="min-width: 1080px">
    <el-breadcrumb style="margin: 8px 0;padding: 0 24px" separator="/">
      <el-breadcrumb-item :to="{ path: '/projectManage' }">项目管理</el-breadcrumb-item>
      <el-breadcrumb-item>项目详情</el-breadcrumb-item>
    </el-breadcrumb>
  <div style="background: #ffffff;padding: 20px;margin: 24px;margin-top: 0px">
    <left-label  label-name="基本信息"></left-label>
    <base-info></base-info>

<div v-if="workFlowList.length>0">
  <left-label style="margin-top: 30px" label-name="项目信息"></left-label>
    <el-steps id="workFlow" style="margin-bottom: 30px;margin-top: 20px" :space="150" align-center :active="active" finish-status="wait"  process-status="success">
      <el-step v-for="(item,index) in workFlowList" v-bind:key="item" @click.native="on_click(index)" :title="item"></el-step>
    </el-steps>
    <!-- 失活的组件将会被缓存！-->
    <div  style="margin-left: 12px;">
      <keep-alive>
        <component v-bind:is="currentStepComponent"></component>
      </keep-alive>
    </div>
</div>
    <div style="width: 100%; height: 500px; align-items: center;display: flex;justify-content: center;flex-direction: column" v-else>
      <img style="width: 80px;height: 80px" src="../../../assets/noData.png"/>
      <div style="color: #888888;font-size: 12px;">暂无数据</div>
    </div>
</div>
  </div>

</template>

<script>
  import leftLabel from "../../../components/leftLabel"
  import baseInfo from "../baseInfo/baseInfo.vue"
  import sceneInvestigation from "../sceneInvestigation/sceneInvestigation.vue"
  import designScheme from "../designScheme/designScheme.vue"
  import contractAward from "../contractAward/contracAtward.vue"
  import deviceInstall from "../deviceInstall/deviceInstall.vue"
  import reform from "../reform/reform.vue"


  export default {
        name: "all-projects-detail",
        data() {
            return {
              active: 0,
              baseInfo:{},
              projectCode:'',
              workFlowList:[],
              currentStepComponent:'sceneInvestigation',//当前组件
            }
        },
    mounted(){
            this.projectCode = this.$route.query.projectCode;
            this.getWorkFlow();
    },


       components:{
         leftLabel,//左侧描述标签
         baseInfo,//基础信息
         sceneInvestigation,//现场勘查
         designScheme,//方案设计
         contractAward,//合同签约
         deviceInstall,//设备安装
         reform// 项目整改
       },
       methods:{
         getWorkFlow(){
           this.$http.post('/flow/getFlowForPc', {projectCode: this.projectCode}, response => {
             if (response.code == 200) {
               let data = response.data ? response.data : {};
               this.workFlowList = data;
               console.log(data);

             } else {
               this.$message({
                 message: response.message,
                 type: 'warning'
               });
             }
           });

         },
         on_click(e){
           this.active = e;
           switch(e)
           {
             case 0:
               this.currentStepComponent = 'sceneInvestigation';
               break;
             case 1:
               this.currentStepComponent = 'designScheme';
               break;
             case 2:
               this.currentStepComponent = 'contractAward';
               break;
             case 3:
               this.currentStepComponent = 'deviceInstall';
               break;
             case 4:
               this.currentStepComponent = 'reform';
               break;
             default:
           }
         },

       }

    }
</script>

<style scoped lang="less">
  .el-button {
    height: 24px;
    line-height: 24px;
    padding: 0px;
  }
  .el-button--text{
    font-family: PingFangSC-Regular;
    font-size: 12px;
    letter-spacing: -0.32px;
    line-height: 24px;
  }
  table tr td{
    border: 1px solid #E9E9E9;
  }
  table{
    padding: 10px;
  }
  td:nth-child(odd){
    background: #F8F8F8;
    width: 138px;
    font-family: PingFangSC-Semibold;
    font-size: 12px;
    color: rgba(0,0,0,0.75);
    line-height: 18px;

  }
  td:nth-child(even){
    background: #ffffff;
    width: 242px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: rgba(0,0,0,0.65);
    line-height: 18px;

  }
  td
  {
    padding: 10px 5px;
    font-size: 12px;
    .otherfile{
      display: flex;
      img{
        width: 32px;
        height: 32px;
        margin-right: 5px;

      }
    }
  }

  .project-base-info{
    .project-base-label{
      font-family: PingFangSC-Medium;
      font-size: 12px;
      color: #666666;
      text-align: left;
      margin-bottom: 12px;
    }
  }
  .building-info{
    .building-info-label{
      font-family: PingFangSC-Medium;
      font-size: 12px;
      color: #666666;
      text-align: left;
      margin-top: 21px;
      margin-bottom: 12px;
    }
    .building-info-content{
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      align-content: flex-start;
      /*justify-content: space-between;*/
      .build-container {
        height: 72px;
        background: #F8F8F8;
        flex: 0 0 31%;
        margin: 10px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        img{
          width: 52px;
          height: 52px;
          margin: 10px;
        }

        .build-desc{
          .roof-name{
            font-family: PingFangSC-Regular;
            font-size: 15px;
            color: #333333;
            letter-spacing: -0.24px;
            text-align: left;
            margin-bottom: 3px;

          }
          .roof-type{
            opacity: 0.5;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #666666;
            letter-spacing: 0;
            text-align: left;
            line-height: 14px;
          }

        }
      }

    }
    .designPdf{
      text-align: right;
      width:176px;
    }
    .designPdf-content{
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #333333;
      letter-spacing: -0.32px;
      line-height: 24px;
    }

  }

</style>
