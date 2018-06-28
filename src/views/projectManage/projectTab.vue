<template>
  <div>
    <div class="projectManage">项目管理</div>
    <div style="background: #ffffff;padding-left: 20px;margin:0 20px;margin-bottom: 24px;margin-top: 8px;min-width: 900px;">
      <left-label style="padding-top: 20px"  label-name="项目管理"></left-label>
      <all-projects></all-projects>
      <!--<el-tabs    v-model="activeName" @tab-click="handleClick">-->
        <!--<el-tab-pane label="待勘察" name="/toSurvey/survey-1"></el-tab-pane>-->
        <!--<el-tab-pane label="待设计方案" name="/toDesign/design-1"></el-tab-pane>-->
        <!--<el-tab-pane label="待方案审核" name="/toReview/design-2"></el-tab-pane>-->
        <!--<el-tab-pane label="待签约" name="/toContract/assign-1"></el-tab-pane>-->
        <!--<el-tab-pane label="待安装" name="/toInstall/install-1"></el-tab-pane>-->
        <!--<el-tab-pane label="待校验审核" name="/toCheck/check-1"></el-tab-pane>-->
        <!--<el-tab-pane label="待整改" name="/toCorrect/reform-check-1"></el-tab-pane>-->
        <!--<el-tab-pane label="已完成项目" name="/completedProject/patrol-2"></el-tab-pane>-->
        <!--<el-tab-pane label="待巡检审核" name="/toInspection/patrol-1"></el-tab-pane>-->
        <!--<el-tab-pane label="已关闭" name="/toClose/close"></el-tab-pane>-->
      <!--<el-tab-pane label="可并网" name="/toClose/finish-1"></el-tab-pane>-->
      <!--<el-tab-pane label="已并网" name="/toClose/finish-2"></el-tab-pane>-->

      <!--</el-tabs>-->
      <!--<router-view/>-->
    </div>
  </div>
</template>

<script>
  import leftLabel from "../../components/leftLabel"
  import allProjects from "./allProjects.vue"

  export default {
    name: "project-tab",
    data() {
      return {
        activeName: '/toSurvey/survey-1',
      }
    },
    methods: {
      handleClick(tab, event) {
        this.$router.push({path: '/projectManage' + tab.name})//不加斜杠会导致路由重叠
      },

    },
    components:{
      leftLabel,
      allProjects
    },
  }
</script>

<style scoped>
  .projectManage {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.30);
    text-align: left;
    line-height: 18px;
    margin: 8px 24px;
    text-align: left
  }
  .el-tabs__item.is-active{
    color: #409eff!important;

  }
</style>
