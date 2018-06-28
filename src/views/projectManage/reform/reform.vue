<template>
    <div>
      <div v-for="item in datalist" style="height: 560px;">
        <el-row style="margin-bottom: 1px;" type="flex">
          <div class="containerBlock">
            <el-row class="needReform-Info" style="margin-top:16px" type="flex"  justify="space-between">
              <div>需整改信息</div>
              <div>2018/04/06</div>
            </el-row>
            <div class="needReform-content">{{item.modifyReason ? item.modifyReason : '--'}}</div>
          </div>
          <div style="height: 135px;width: 4px"></div>
          <div class="containerBlock">
            <el-row class="needReform-Info" style="margin-top:16px" type="flex"  justify="space-between">
              <div>整改结果信息</div>
              <div>2018/04/06</div>
            </el-row>
            <div class="needReform-content">{{item.modifyResult ? item.modifyResult : '--'}}</div>
          </div>
        </el-row>
        <el-row type="flex">
          <div class="containerBlock">
            <div class="needReform-Info imgLabel">需整改图片</div>
            <big-img  v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>

            <div class="imgContainer">
              <div  v-for="item in item.modifyPhotosList">
                <img style="margin-right: 10px" class="small" :src="item.imgOssUrl" @click="clickImg($event)"/>
              </div>
              <!--<img v-for="photo in item.modifyPhotosList" :src="photo.imgOssUrl"/>-->
            </div>
          </div>
          <div style="height: 135px;width: 4px"></div>
          <div class="containerBlock">
            <div style="text-align: left" class="needReform-Info imgLabel">整改结果图片</div>
            <div class="imgContainer">
              <div  v-for="item in item.modifyResultPhotosList">
                <img style="margin-right: 10px" class="small" :src="item.imgOssUrl" @click="clickImg($event)"/>
              </div>
              <!--<img v-for="photoRes in item.modifyResultPhotosList	" :src="photoRes.imgOssUrl"/>-->
            </div>
          </div>
        </el-row>
      </div>
    </div>
</template>

<script>
  import BigImg from '../../../components/photoPreview.vue';

  export default {
    name: "reform",
    components:{
      BigImg
    },
    data(){
      return {
        projectCode: '',
        datalist: [],
        showImg:false,
        imgSrc: ''
      }
    },
    mounted(){
      this.projectCode = this.$route.query.projectCode;
      this.getDataList();

    },
      methods:{
        clickImg(e) {
          this.showImg = true;
          // 获取当前图片地址
          this.imgSrc = e.currentTarget.src;
        },
        viewImg(){
          this.showImg = false;

        },
          getDataList(){
            this.$http.post('/reform/historyRecord.json', {projectCode: 'CS33000006'}, response => {
              if (response.code == 200) {
                let data = response.data ? response.data : {};
                this.datalist=data;
                console.log(this.datalist)
              } else {
                this.$message({
                  message: response.message,
                  type: 'warning'
                });
              }
            });
          }

      }
    }
</script>

<style scoped lang="less">
  .containerBlock{
    height: 135px;
    width: calc((100% - 4px) / 2);
    padding: 0 16px;
    background: #F8F8F8;
    .imgLabel{
      text-align: left;
      margin-top: 12px;
      margin-bottom: 8px;
    }
    .needReform-Info{
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #333333;
      letter-spacing: 0;
      line-height: 24px;
    }
    .needReform-content{
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #666666;
      letter-spacing: 0;
      line-height: 20px;
      text-align: left;
    }
    .imgContainer{
      display: flex;
      align-items: center;
      margin-right: 10px;
      img{
        width: 60px;
        height: 60px;
      }
    }
  }

</style>
