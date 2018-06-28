<template>
  <div class="baseInfoContainer">
    <el-row type="flex" justify="space-between">
      <el-col :span="7">
        <el-row type="flex">
          <div class="leftLabel">项目编号：</div>
          <div class="baseInfo-content">{{baseInfo.projectCode ? baseInfo.projectCode:'--'}}</div>
        </el-row>
      </el-col>
      <el-col :span="7">
        <el-row type="flex">
          <div class="leftLabel">业主姓名：</div>
          <div class="baseInfo-content">{{baseInfo.ownerName ? baseInfo.ownerName:'--'}}</div>
        </el-row>
      </el-col>
      <el-col :span="7">
        <el-row type="flex">
          <div class="leftLabel">联系方式：</div>
          <div class="baseInfo-content">{{baseInfo.ownerPhone ? baseInfo.ownerPhone:'--'}}</div>
        </el-row>
      </el-col>
    </el-row>
    <el-row type="flex"  justify="space-between">
      <el-col :span="7">
        <el-row type="flex">
          <div class="leftLabel">详细地址：</div>
          <el-tooltip v-if="baseInfo.detailAddress" :content="baseInfo.detailAddress" placement="top">
            <div style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis" class="baseInfo-content">{{baseInfo.detailAddress ? baseInfo.detailAddress : '--'}}</div>
          </el-tooltip>
        </el-row>
      </el-col>
      <el-col :span="7">
        <el-row type="flex">
          <div class="leftLabel">经纬度：</div>
          <div class="baseInfo-content">{{baseInfo.locationCoor ? baseInfo.locationCoor : '--'}}</div>
        </el-row>
      </el-col>
      <el-col :span="7">
        <el-row type="flex">
          <div class="leftLabel">项目状态：</div>
          <div class="baseInfo-content">{{baseInfo.projectStatus ? baseInfo.projectStatus : '--'}}</div>
        </el-row>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="7">
        <el-row type="flex">
          <div class="leftLabel">并网时间：</div>
          <div class="baseInfo-content">{{baseInfo.connectNetTime ? baseInfo.connectNetTime:'--'}}</div>
        </el-row>
      </el-col>
      <el-col :span="7">
        <el-row type="flex">
          <div class="leftLabel">巡检通过时间：</div>
          <div class="baseInfo-content">{{baseInfo.patrolPassTime ? baseInfo.patrolPassTime:'--'}}</div>
        </el-row>
      </el-col>
      <el-col :span="7">
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "base-info",
        data(){
            return {
              projectCode:'',
              baseInfo:{
                projectCode:'',
                ownerName:'',
                ownerPhone:'',
                detailAddress:'',
                locationCoor:'',
                projectStatus:'',
                connectNetTime:'',
                patrolPassTime:'',
              },
            }
        },
      mounted(){
        this.projectCode = this.$route.query.projectCode;
        this.getBaseInfo();

      },
      methods:{
          getBaseInfo(){
            this.$http.post('/survey/projectBaseInfo.json', {projectCode:this.projectCode}, response => {
              if(response.code==200){
                let data = response.data?response.data:{};
                this.baseInfo = data;
                this.$store.dispatch('setProjectBaseInfo',data);
              }else {
                this.$message({
                  message:response.message,
                  type: 'warning'
                });
              }
            });
          }
      }
    }
</script>

<style scoped lang="less">
  .baseInfoContainer{
    .leftLabel{
      min-width: 80px;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #888888;
      letter-spacing: 0;
      text-align: right;
      line-height: 21px;
    }
    .baseInfo-content {
      ont-family: PingFangSC-Regular;
      font-size: 12px;
      color: #333333;
      letter-spacing: 0;
      line-height: 21px;
    }
  }
</style>
