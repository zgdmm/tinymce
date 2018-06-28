<template>
  <div>
    <div class="layoutLeft">
      <div style="width: 100px;text-align: right">合同签约时间：</div>
      <div>2018/04/16</div>
    </div>
    <big-img  v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
    <div class="layoutLeft">
      <div style="width: 100px;text-align: right">合同图片：</div>
      <div  v-for="item in contactPhotosList">
        <img style="margin-right: 10px" class="small" :src="item.imgOssUrl" @click="clickImg($event)"/>
      </div>
      <!--<img style="margin-right: 10px" v-for="item in contactPhotosList" :src="item.imgOssUrl"/>-->
    </div>
  </div>

</template>

<script>
  import BigImg from '../../../components/photoPreview.vue';

  export default {
        name: "contrac-atward",
      data(){
        return {
          contactPhotosList: [],
          projectCode: '',
          showImg:false,
          imgSrc: ''
        }
      },
      components:{
        BigImg
      },

      mounted(){
          this.projectCode = this.$route.query.projectCode;
          this.getImageList();
      },
      methods: {
          clickImg(e) {
          this.showImg = true;
          // 获取当前图片地址
          this.imgSrc = e.currentTarget.src;
        },
        viewImg(){
          this.showImg = false;

        },
          getImageList(){//CS11000006
            this.$http.post('/assign/selectAssignByProjectAndStep', {projectCode: this.projectCode}, response => {
              if (response.code == 200) {
                let data = response.data ? response.data : {};
                this.contactPhotosList = data.contactPhotosList;
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
  .layoutLeft{
    display: flex;
    align-items: flex-start;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #333333;
    letter-spacing: 0;
    line-height: 24px;
    margin-right: 14px;
    flex-wrap: wrap;
    img{
      width: 180px;
      height: 180px;

    }
  }

</style>
