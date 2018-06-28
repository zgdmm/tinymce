<template>
    <div>
      <el-breadcrumb style="margin: 8px 0;padding: 0 24px" separator="/">
        <el-breadcrumb-item :to="{ path: '/projectManage' }">项目管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/allProjectsDetail/'+projectStatus ,query:{projectCode:projectCode}}">设计方案</el-breadcrumb-item>
        <el-breadcrumb-item>屋面详情</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="container">
        <left-label  label-name="屋面详情"></left-label>
        <big-img  v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>

        <div class="layoutLeft">
          <div class="roof-left">屋面名：</div>
          <div class="roof-right">{{roofData.roofName?roofData.roofName:'--'}}</div>
        </div>
        <div class="layoutLeft">
          <div class="layoutLeft">
            <div class="roof-left">屋面照片：</div>
            <div v-for="item in roofData.roofPhotosList">
              <img style="width: 60px;height: 60px;margin-right: 10px" class="small" :src="item.imgOssUrl" @click="clickImg($event)">
            </div>

            <!--<img v-for="item in roofData.roofPhotosList" :src="item.imgOssUrl"/>-->
          </div>
          <div class="layoutLeft">
            <div class="roof-left">屋面草图：</div>
            <div v-for="item in roofData.sketchImagesList">
              <img style="width: 60px;height: 60px;margin-right: 10px" class="small" :src="item.imgOssUrl" @click="clickImg($event)">
            </div>
          </div>
        </div>
        <div class="layoutLeft">
          <div class="layoutLeft">
            <div class="roof-left">屋面朝向（度）：</div>
            <div class="roof-right">{{roofData.roofTowards?roofData.roofTowards:'--'}}</div>
          </div>
          <div class="layoutLeft">
            <div class="roof-left">屋面倾斜角度：</div>
            <div class="roof-right">{{roofData.tiltAngle?roofData.tiltAngle:'--'}}</div>
          </div>
        </div>

        <div class="layoutLeft">
          <div class="layoutLeft">
            <div class="roof-left">楼高（m）：</div>
            <div class="roof-right">{{roofData.buildingHeight?roofData.buildingHeight:'--'}}</div>
          </div>
          <div class="layoutLeft">
            <div class="roof-left">层数：</div>
            <div class="roof-right">{{roofData.floorNum?roofData.floorNum:'--'}}</div>
          </div>
        </div>

        <div class="layoutLeft">
          <div class="layoutLeft">
            <div class="roof-left">女儿墙：</div>
            <div class="roof-right">{{roofData.isParapet?roofData.isParapet:'--'}}</div>
          </div>
          <div class="layoutLeft">
            <div class="roof-left">女儿墙高度（mm）：</div>
            <div  class="roof-right">{{roofData.isParapet=='无'?'--':roofData.parapetHeight}}</div>
          </div>
        </div>
        <div class="layoutLeft">
          <div class="layoutLeft">
            <div class="roof-left">有无遮挡物：</div>
            <div class="roof-right">{{roofData.isCover?roofData.isCover:'--'}}</div>
          </div>
        </div>
        <div class="layoutLeft">
          <div class="roof-left">遮挡物信息：</div>
          <div class="roof-right">{{roofData.isCover!='无'?roofData.coverInfo:'--'}}</div>
        </div>
        <div class="layoutLeft">
          <div class="roof-left">遮挡物照片：</div>
          <div class="layoutLeft">
            <div v-for="item in roofData.coverPhotosList">
              <img v-if="roofData.isCover!='无'" style="width: 60px;height: 60px;margin-right: 10px" class="small" :src="item.imgOssUrl" @click="clickImg($event)">
            </div>
            <!--<img v-if="roofData.isCover!='无'" v-for="item in roofData.coverPhotosList" :src="item.imgOssUrl"/>-->
            <div v-if="roofData.isCover=='无'">--</div>
          </div>
        </div>
        <div class="layoutLeft">
          <div class="roof-left">屋面类型：</div>
          <div  v-if="roofData.roofType" class="roof-right">{{roofData.roofType | Context(roofTypeArr)}}</div>
          <div  v-else class="roof-right">--</div>

        </div>

        <!--1瓦屋面 2混凝土平屋面 3预制板平屋面 4彩钢瓦屋面 5阳光房-->

        <div v-if="roofData.roofType==1">
          <div class="layoutLeft">
            <div class="roof-left">瓦片类型：</div>
            <div class="roof-right">{{roofData.roofVO?roofData.roofVO.tileType:'--'}}</div>
          </div>
          <div class="layoutLeft">
            <div class="roof-left">瓦片尺寸（mm）：</div>
            <div class="roof-right">长：{{roofData.roofVO.tileSizeLength?roofData.roofVO.tileSizeLength:'--'}}、宽：{{roofData.roofVO.tileSizeWeight?roofData.roofVO.tileSizeWeight:'--'}}</div>
          </div>
          <div class="layoutLeft">
            <div class="roof-left">瓦垂直屋面高度（mm）：</div>
            <div class="roof-right">{{roofData.roofVO.tileHeight?roofData.roofVO.tileHeight:'--'}}</div>
          </div>
          <div class="layoutLeft">
            <div class="roof-left">瓦片上下搭接宽度（mm）：</div>
            <div class="roof-right">{{roofData.roofVO.tileWeight?roofData.roofVO.tileWeight:'--'}}</div>
          </div>

          <div class="layoutLeft">
            <div class="layoutLeft">
              <div class="roof-left">瓦片照片（含尺寸）：</div>
              <div v-if="roofData.roofVO.tileSizeImageList" v-for="item in roofData.roofVO.tileSizeImageList">
                <img style="width: 60px;height: 60px;margin-right: 10px" class="small" :src="item.imgOssUrl" @click="clickImg($event)"/>
              </div>
            </div>
            <div class="layoutLeft">
              <div class="roof-left">瓦下照片：</div>
              <div v-for="item in roofData.roofVO.tileImageList">
                <img style="width: 60px;height: 60px;margin-right: 10px" class="small" :src="item.imgOssUrl" @click="clickImg($event)">
              </div>
            </div>
          </div>
          <div class="layoutLeft">
            <div class="roof-left">结构类型：</div>
            <div class="roof-right">{{roofData.roofVO.tileStructureType==1?'混凝土瓦屋顶':'梁结构瓦屋顶'}}</div>
          </div>
          <div v-if="roofData.roofVO.tileStructureType==1">
            <div class="layoutLeft">
              <div class="roof-left">混凝土楼板厚度（mm）：</div>
              <div class="roof-right">{{roofData.roofVO.roofStructureVO.conFloorDeep?roofData.roofVO.roofStructureVO.conFloorDeep:'--'}}</div>
            </div>
            <div class="layoutLeft">
              <div class="roof-left">保鲜层厚度（mm）：</div>
              <div class="roof-right">{{roofData.roofVO.roofStructureVO.conInsulationDeep?roofData.roofVO.roofStructureVO.conInsulationDeep:'--'}}</div>
            </div>
            <div class="layoutLeft">
              <div class="roof-left">防水层厚度（mm）：</div>
              <div class="roof-right">{{roofData.roofVO.roofStructureVO.conAvoidWaterDeep?roofData.roofVO.roofStructureVO.conAvoidWaterDeep:'--'}}</div>
            </div>
            <div class="layoutLeft">
              <div class="roof-left">瓦片安装方式：</div>
              <div class="roof-right">{{roofData.roofVO.roofStructureVO.conTileInstallType?roofData.roofVO.roofStructureVO.conTileInstallType:'--'}}</div>
            </div>
          </div>

          <div v-if="roofData.roofVO.tileStructureType==2">
            <div class="layoutLeft">
              <div class="roof-left">瓦下覆盖物：</div>
              <div class="roof-right">{{roofData.roofVO.roofStructureVO.beamUnderTile?roofData.roofVO.roofStructureVO.beamUnderTile:'--'}}</div>
            </div>
            <div class="layoutLeft">
              <div class="roof-left">梁材质：</div>
              <div class="roof-right">{{roofData.roofVO.roofStructureVO.beamMaterial?roofData.roofVO.roofStructureVO.beamMaterial:'--'}}</div>
            </div>
            <div class="layoutLeft">
              <div class="roof-left">梁尺寸：</div>
              <div class="roof-right">{{roofData.roofVO.roofStructureVO.beamSize?roofData.roofVO.roofStructureVO.beamSize:'--'}}</div>
            </div>
            <div class="layoutLeft">
              <div class="roof-left">椽子尺寸：</div>
              <div class="roof-right">{{roofData.roofVO.roofStructureVO.beamRafterSize?roofData.roofVO.roofStructureVO.beamRafterSize:'--'}}</div>
            </div>
            <div class="layoutLeft">
              <div class="roof-left">梁跨度：</div>
              <div class="roof-right">{{roofData.roofVO.roofStructureVO.beamSpan?roofData.roofVO.roofStructureVO.beamSpan:'--'}}</div>
            </div>
            <div class="layoutLeft">
              <div class="roof-left">山墙厚度：</div>
              <div class="roof-right">{{roofData.roofVO.roofStructureVO.beamGableDeep?roofData.roofVO.roofStructureVO.beamGableDeep:'--'}}</div>
            </div>
            <div class="layoutLeft">
              <div class="roof-left">山墙材质：</div>
              <div class="roof-right">{{roofData.roofVO.roofStructureVO.beamGableMaterial?roofData.roofVO.roofStructureVO.beamGableMaterial:'--'}}</div>
            </div>
          </div>


        </div>
        <div v-if="roofData.roofType==2">
          <div class="layoutLeft">
            <div class="roof-left">屋顶结构：</div>
            <div class="roof-right">{{roofData.roofVO.concreteStructure?roofData.roofVO.concreteStructure:'--'}}</div>
          </div>
          <div class="layoutLeft">
            <div class="roof-left">楼板厚度：</div>
            <div class="roof-right">{{roofData.roofVO.concreteFloorDeep?roofData.roofVO.concreteFloorDeep:'--'}}</div>
          </div>
        </div>
        <div v-if="roofData.roofType==3">
          <div class="layoutLeft">
            <div class="roof-left">预制板尺寸：</div>
            <div class="roof-right">长:{{roofData.roofVO.plateLength?roofData.roofVO.plateLength:'--'}}、宽{{roofData.roofVO.plateWeight?roofData.roofVO.plateWeight:'--'}}、高:{{roofData.roofVO.plateHeight?roofData.roofVO.plateHeight:'--'}}</div>
          </div>
          <div class="layoutLeft">
            <div class="roof-left">预制板钢筋直径(mm)：</div>
            <div class="roof-right">{{roofData.roofVO.plateDiameter?roofData.roofVO.plateDiameter:'--'}}</div>
          </div>
          <div class="layoutLeft">
            <div class="roof-left">预制板孔数：</div>
            <div class="roof-right">{{roofData.roofVO.plateHoleNum?roofData.roofVO.plateHoleNum:'--'}}</div>
          </div>
          <div class="layoutLeft">
            <div class="roof-left">预制板孔尺寸(mm)：</div>
            <div class="roof-right">{{roofData.roofVO.plateHoleSize?roofData.roofVO.plateHoleSize:'--'}}</div>
          </div>
        </div>
        <div v-if="roofData.roofType==4">
          <div class="layoutLeft">
            <div class="roof-left"> 彩钢瓦型号：</div>
            <div class="roof-right">{{roofData.roofVO.colorTileMode?roofData.roofVO.colorTileMode:'--'}}</div>
          </div>
          <div class="layoutLeft">
            <div class="roof-left">彩钢瓦厚度(mm)：</div>
            <div class="roof-right">{{roofData.roofVO.colorTileDeep?roofData.roofVO.colorTileDeep:'--'}}</div>
          </div>
          <div class="layoutLeft">
            <div class="roof-left">彩钢瓦安装时间：</div>
            <div class="roof-right">{{roofData.roofVO.colorTileInstallDate?roofData.roofVO.colorTileInstallDate:'--'}}</div>
          </div>
          <div class="layoutLeft">
            <div class="roof-left">波峰间距(mm)：</div>
            <div class="roof-right">{{roofData.roofVO.colorTileGap?roofData.roofVO.colorTileGap:'--'}}</div>
          </div>
          <div class="layoutLeft">
            <div class="roof-left">腐蚀程度：</div>
            <div class="roof-right">{{roofData.roofVO.colorTileCorrode?roofData.roofVO.colorTileCorrode:'--'}}</div>
          </div>
          <div class="layoutLeft">
            <div class="roof-left"> 瓦片照片：</div>
            <div v-for="item in roofData.roofVO.colorTileImageList">
              <img style="width: 60px;height: 60px;margin-right: 10px" class="small" :src="item.imgOssUrl" @click="clickImg($event)">
            </div>
          </div>

        </div>
        <div v-if="roofData.roofType==5">
          <div class="layoutLeft">
            <div class="roof-left"> 需要建设主体：</div>
            <div class="roof-right">{{roofData.roofVO.sunSubject?roofData.roofVO.sunSubject:'--'}}</div>
          </div>
          <div class="layoutLeft">
            <div class="roof-left">坡度要求(度)：</div>
            <div class="roof-right">{{roofData.roofVO.sunSlope?roofData.roofVO.sunSlope:'--'}}</div>
          </div>
          <div class="layoutLeft">
            <div class="roof-left">防水要求：</div>
            <div class="roof-right">{{roofData.roofVO.sunAvoidWater?roofData.roofVO.sunAvoidWater:'--'}}</div>
          </div>
          <div class="layoutLeft">
            <div class="roof-left">逆光要求：</div>
            <div class="roof-right">{{roofData.roofVO.sunLight?roofData.roofVO.sunLight:'--'}}</div>
          </div>
          <div class="layoutLeft">
            <div class="roof-left">阳光房照片：</div>
            <div v-if="roofData.roofVO.sunImageList" v-for="item in roofData.roofVO.tileSizeImageList">
              <img style="width: 60px;height: 60px;margin-right: 10px" class="small" :src="item.imgOssUrl" @click="clickImg($event)"/>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import leftLabel from "../../../components/leftLabel"
  import BigImg from '../../../components/photoPreview.vue';
  export default {
    name: "roof-detail-info",
    data(){
      return {
          roofData:{},
          showImg:false,
          imgSrc: '',
        projectCode:'',
        projectStatus:'',
      }
    },
    components: {
      leftLabel,
      BigImg
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
    },
    created(){
      this.projectCode = this.$route.query.projectCode;
      this.projectStatus = this.$route.query.projectStatus;
      this.roofData = JSON.parse(this.$route.query.roofData) ;
    },
    computed:{
      roofTypeArr(){
        return this.$store.state.roofType;
      }
    }
  }
</script>

<style scoped lang="less">
  .el-button--primary{
    background: #409eff;
    border-color:#409eff;
    border-radius: 4px;
  }
  .layoutLeft{
    display: flex;
  }
  .container{
    background: #ffffff;
    margin: 24px;
    padding: 20px;
    .layoutLeft{
      margin-bottom: 12px;
    }
    .roof-left{
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #666666;
      text-align: right;
      line-height: 18px;
      width: 200px;
    }
    .small,img{
      width: 60px;
      height: 60px;
      margin-right: 5px;

    }
    .roof-right-title{
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #333333;
      line-height: 18px;

    }
    .roof-right-img{

    }

  }


</style>
