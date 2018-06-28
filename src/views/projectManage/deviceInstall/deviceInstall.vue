<template>
  <div>

    <el-row style="margin-bottom: 20px" type="flex" class="row-bg" justify="space-between">
      <el-col style="min-width: 300px" :span="6">
        <div class="bg">基础照片</div>
        <div style="position: relative;z-index: 10">
          <big-img  v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
        </div>
        <el-row style="padding: 0 16px" type="flex" class="bg"  justify="space-between">
          <div>安装完成时间</div>
          <div>2018/04/16</div>
        </el-row>
        <div  style="padding: 16px 16px" class="bg">

          <div style="display: flex;justify-content: space-between;align-items: center;">
            <div  v-for="item in basePhotosList">
              <img style="margin-right: 10px" class="small" :src="item.imgOssUrl" @click="clickImg($event)"/>
            </div>
          </div>
        </div>
      </el-col>
      <el-col style="min-width: 300px" :span="6">
        <div class="bg">支架上部照片</div>
        <el-row style="padding: 0 16px" type="flex" class="bg"  justify="space-between">
          <div>安装完成时间</div>
          <div>2018/04/16</div>
        </el-row>
        <div  style="padding: 16px 16px" class="bg">
          <div style="display: flex;justify-content: space-between;align-items: center">
            <div  v-for="item in aboveBlacketPhotosList">
              <img style="margin-right: 10px" class="small" :src="item.imgOssUrl" @click="clickImg($event)"/>
            </div>
            <!--<img v-for="item in aboveBlacketPhotosList" :src="item.imgOssUrl"/>-->
          </div>
        </div>
      </el-col>
      <el-col style="min-width: 300px" :span="6">
        <div class="bg">支架下部照片</div>
        <el-row style="padding: 0 16px" type="flex" class="bg"  justify="space-between">
          <div>安装完成时间</div>
          <div>2018/04/16</div>
        </el-row>
        <div  style="padding: 16px 16px" class="bg">
          <div style="display: flex;justify-content: space-between;align-items: center">
            <div  v-for="item in underBlacketPhotosList">
              <img style="margin-right: 10px" class="small" :src="item.imgOssUrl" @click="clickImg($event)"/>
            </div>
            <!--<img v-for="item in underBlacketPhotosList" :src="item.imgOssUrl"/>-->
          </div>
        </div>
      </el-col>


    </el-row>
    <el-row style="margin-bottom: 20px" type="flex" class="row-bg" justify="space-between">
      <el-col style="min-width: 300px" :span="6">
        <div class="bg">安装完成图片</div>
        <el-row style="padding: 0 16px" type="flex" class="bg"  justify="space-between">
          <div>安装完成时间</div>
          <div>2018/04/16</div>
        </el-row>
        <div  style="padding: 16px 16px" class="bg">
          <div style="display: flex;justify-content: space-between;align-items: center">
            <div  v-for="item in finishPhotosList">
              <img style="margin-right: 10px" class="small" :src="item.imgOssUrl" @click="clickImg($event)"/>
            </div>
            <!--<img v-for="item in finishPhotosList" :src="item.imgOssUrl"/>-->
          </div>
        </div>
      </el-col>
      <el-col style="min-width: 300px" :span="6">
        <div class="bg">步管放线照片</div>
        <el-row style="padding: 0 16px" type="flex" class="bg"  justify="space-between">
          <div>安装完成时间</div>
          <div>2018/04/16</div>
        </el-row>
        <div  style="padding: 16px 16px" class="bg">
          <div style="display: flex;justify-content: space-between;align-items: center">
            <div  v-for="item in stepTubePhotosList">
              <img style="margin-right: 10px" class="small" :src="item.imgOssUrl" @click="clickImg($event)"/>
            </div>
            <!--<img v-for="item in stepTubePhotosList" :src="item.imgOssUrl"/>-->
          </div>
        </div>
      </el-col>
      <el-col style="min-width: 300px" :span="6">
        <div class="bg">安装组件照片</div>
        <el-row style="padding: 0 16px" type="flex" class="bg"  justify="space-between">
          <div>安装完成时间</div>
          <div>2018/04/16</div>
        </el-row>
        <div  style="padding: 16px 16px" class="bg">
          <div style="display: flex;justify-content: space-between;align-items: center">
            <div  v-for="item in assemblyPhotosList">
              <img style="margin-right: 10px" class="small" :src="item.imgOssUrl" @click="clickImg($event)"/>
            </div>
            <!--<img v-for="item in assemblyPhotosList" :src="item.imgOssUrl"/>-->
          </div>
        </div>
      </el-col>


    </el-row>

    <el-row style="margin-bottom: 20px" type="flex" class="row-bg" justify="space-between">
      <el-col style="min-width: 300px" :span="6">
        <div class="bg">逆变器</div>
        <el-row style="padding: 0 16px" type="flex" class="bg"  justify="space-between">
          <div>安装完成时间</div>
          <div>2018/04/16</div>
        </el-row>
        <div  style="padding: 16px 16px" class="bg">
          <div style="display: flex;justify-content: space-between;align-items: center">
            <div  v-for="item in inverterPhotosList">
              <img style="margin-right: 10px" class="small" :src="item.imgOssUrl" @click="clickImg($event)"/>
            </div>
            <!--<img v-for="item in inverterPhotosList" :src="item.imgOssUrl"/>-->
          </div>
        </div>
      </el-col>
      <el-col style="min-width: 300px" :span="6">
        <div class="bg">电气测试照片</div>
        <el-row style="padding: 0 16px" type="flex" class="bg"  justify="space-between">
          <div>安装完成时间</div>
          <div>2018/04/16</div>
        </el-row>
        <div  style="padding: 16px 16px" class="bg">
          <div style="display: flex;justify-content: space-between;align-items: center">
            <div  v-for="item in electricTestPhotosList">
              <img style="margin-right: 10px" class="small" :src="item.imgOssUrl" @click="clickImg($event)"/>
            </div>
            <!--<img v-for="item in electricTestPhotosList" :src="item.imgOssUrl"/>-->
          </div>
        </div>
      </el-col>
      <el-col style="min-width: 300px" :span="6">
        <div class="bg">全景图</div>
        <el-row style="padding: 0 16px" type="flex" class="bg"  justify="space-between">
          <div>安装完成时间</div>
          <div>2018/04/16</div>
        </el-row>
        <div  style="padding: 16px 16px" class="bg">
          <div style="display: flex;justify-content: space-between;align-items: center">
            <div  v-for="item in fullScreenPhotosList">
              <img style="margin-right: 10px" class="small" :src="item.imgOssUrl" @click="clickImg($event)"/>
            </div>
            <!--<img v-for="item in fullScreenPhotosList" :src="item.imgOssUrl"/>-->
          </div>
        </div>
      </el-col>


    </el-row>


  </div>
</template>

<script>
  import BigImg from '../../../components/photoPreview.vue';
  export default {
        name: "deviceInstall",
        components:{
          BigImg
        },
        data(){
            return {
              showImg:false,
              imgSrc: '',
              projectCode:'',
              basePhotosList:[],//基础照片
              aboveBlacketPhotosList:[],//支架上部照片
              underBlacketPhotosList:[],//支架下部照片
              finishPhotosList:[],//安装完成图片
              stepTubePhotosList:[],//步管放线照片
              assemblyPhotosList:[],//安装组件照片
              inverterPhotosList:[],//逆变器
              electricTestPhotosList:[],//电气测试照片
              fullScreenPhotosList:[],//全景图
              installFinishTime:'',//安装完成时间

            }
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
        getImageList(){
          this.$http.post('/deviceInstall/selectByProjectCode.json', {projectCode: 'CS33000024'}, response => {
            if (response.code == 200) {
              let data = response.data ? response.data : {};
              this.basePhotosList = data.basePhotosList;
              this.aboveBlacketPhotosList = data.aboveBlacketPhotosList;
              this.underBlacketPhotosList = data.underBlacketPhotosList;
              this.finishPhotosList = data.finishPhotosList;
              this.inverterPhotosList = data.inverterPhotosList;
              this.electricTestPhotosList = data.electricTestPhotosList;
              this.stepTubePhotosList = data.stepTubePhotosList;
              this.assemblyPhotosList = data.assemblyPhotosList;
              this.fullScreenPhotosList = data.fullScreenPhotosList;
              this.installFinishTime = data.installFinishTime
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

.bg{
  background: #F8F8F8;
  margin-bottom: 2px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #333333;
  letter-spacing: -0.37px;
  line-height: 24px;
  img{
    width: 60px;
    height: 60px;
  }
}
</style>
