<template>
    <div style="margin-top: 44px" class="laout-center">
      <el-row type="flex">
        <div class="leftFont">项目地址</div>
        <div class="right-content">{{baseInfo.projectName?baseInfo.projectName:'--'}}</div>
      </el-row>
      <el-row type="flex">
        <div style="margin-top: 20px;" class="leftFont">屋面信息</div>
        <div class="building-info">
          <div class="building-info-content">
            <div @click="roofClick(item)" class="build-container" v-for="item in baseInfo.buildingVOList">
              <img  :src="item.roofPhotosList[0].imgOssUrl"/>
              <div class="build-desc">
                <div class="roof-name">{{item.roofName?item.roofName:'--'}}</div>
                <div v-if="item.roofType" class="roof-type">{{item.roofType|Context(roofTypeArr)}}</div>
                <div v-else class="roof-type">--</div>
              </div>
            </div>
          </div>
        </div>
      </el-row>
      <el-row type="flex">
        <div class="leftFont">并网模式</div>
        <div class="right-content" v-show="baseInfo.gridMode==1">自发自用,余电上网</div>
        <div class="right-content" v-show="baseInfo.gridMode==2">全额上网</div>
      </el-row>
      <el-row style="margin-top: 46px" type="flex" justify="center">
        <el-row type="flex">
          <el-button  @click="nextFlow()"  type="primary">下一步</el-button>
        </el-row>
      </el-row>
    </div>
</template>

<script>
  import leftLabel from "../../../components/leftLabel"

  export default {
    name: "design-BaseInfo",
    data(){
      return {
        projectCode:'',
        projectStatus:'',
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        baseInfo:{},
      }
    },
    mounted(){
      this.projectStatus = this.$route.params.id;
      this.projectCode=this.$route.query.projectCode;
      this.getdesignBaseInfo();
    },
    components: {
      leftLabel
    },
    computed: {
      roofTypeArr(){
        return this.$store.state.roofType;
      }
    },
    methods:{
      roofClick(item){
        this.$router.push({path:'/roofDetailInfo',query:{id:item.buildTitle,roofData:item}})
      },
      nextFlow(){
        this.$store.dispatch('setStepNumber',2);

      },
      getdesignBaseInfo(){
        this.$http.post('/survey/selectSurveyForDesign.json', {projectCode:this.projectCode}, response => {
          if(response.code==200){
            let data = response.data?response.data:{};
            this.baseInfo = data;
            console.log(data);
          }else {
            this.$message({
              message:response.message,
              type: 'warning'
            });
          }
        });
      },
    },

  }
</script>

<style scoped  lang="less">
  .laout-center{
    width:600px;
    margin:0 auto;
    .leftFont{
      ont-family: PingFangSC-Regular;
      font-size: 14px;
      color: #606266;
      min-width: 56px;
    }
    .right-content{
      ont-family: PingFangSC-Regular;
      font-size: 14px;
      color: #333333;
      margin-left: 14px;
    }
  }
  .building-info{
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
        padding-right: 80px;
        /*width: 355px;*/
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
  }
</style>
