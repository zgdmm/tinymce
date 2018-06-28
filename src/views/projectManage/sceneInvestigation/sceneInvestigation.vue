<template>
    <div>
        <div class="project-base-info">
          <div class="project-base-label">项目基本情况</div>
          <big-img  v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>

          <table>
            <tr>
              <td>客户需求</td>
              <td>{{info.customerDemand?info.customerDemand:'--'}}</td>
              <td>房屋产权</td>
              <td>{{info.houseProperty?info.houseProperty:'--'}}</td>
              <td>建筑年限</td>
              <td>{{info.houseYears?info.houseYears:''}}</td>
            </tr>
            <tr>
              <td>建筑荷载预判</td>
              <td>{{info.buidlLoad?info.buidlLoad:'--'}}</td>
              <td>并网模式</td>
              <td>{{info.gridMode?(info.gridMode==1?'自发自用,余电上网':'全额上网'):'--'}}</td>
              <td></td>
              <td></td>
            </tr>
          </table>
        </div>

        <div class="building-info">
          <div class="building-info-label">建筑信息</div>
          <div class="building-info-content">
            <div @click="roofClick(item)" class="build-container" v-for="item in buildingList">
              <img  :src="item.roofPhotosList[0].imgOssUrl"/>
              <div class="build-desc">
                <div class="roof-name">{{item.roofName?item.roofName:'--'}}</div>
                <div v-if="item.roofType" class="roof-type">{{item.roofType|Context(roofTypeArr)}}</div>
                <div v-else class="roof-type">--</div>

              </div>
            </div>
          </div>
        </div>
        <div class="building-info">
          <div class="building-info-label">电气勘察</div>
          <table>
            <tr>
              <td>光伏组件类型</td>
              <td>{{electric.compontType ? electric.compontType : '--'}}</td>
              <td>并网点个数</td>
              <td>{{electric.gridConnectNum ? electric.gridConnectNum : '--'}}</td>
              <td>进户总开关容量</td>
              <td>{{electric.switchCapacity ? electric.switchCapacity : '--'}}</td>
            </tr>
            <tr>
              <td>进线电压等级</td>
              <td>{{electric.inlineVoltageLevel ? electric.inlineVoltageLevel : '--'}}</td>
              <td>并网电压等级</td>
              <td>{{electric.gridVoltageLevel ? electric.gridVoltageLevel : '--'}}</td>
              <td>并网点位置</td>
              <td>{{electric.gridLocation ? electric.gridLocation : '--'}}</td>
            </tr>
            <tr>
              <td>估计距离（m）</td>
              <td>{{electric.distance ? electric.distance : '--'}}</td>
              <td>屋顶防雷</td>
              <td>{{electric.isAvoidThunder ? electric.isAvoidThunder : '--'}}</td>
              <td>电气设备拟安装位置</td>
              <td>
                <div class="otherfile">

                  <!--<img v-for="item in electric.installSitePhotosList"  :src="item.imgOssUrl"/>-->
                  <div  v-for="item in electric.installSitePhotosList">
                    <img style="width: 32px;height: 32px;margin-right: 10px" class="small" :src="item.imgOssUrl" @click="clickImg($event)"/>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>


        <div class="building-info">
          <div class="building-info-label">其他文件</div>
          <table>
            <tr>
              <td>总平面</td>
              <td>
                <div class="otherfile">
                  <!--<img v-for="item in ext.sitePlanPhotosList"  :src="item.imgOssUrl"/>-->
                  <div  v-for="item in ext.sitePlanPhotosList">
                    <img style="width: 32px;height: 32px;margin-right: 10px" class="small" :src="item.imgOssUrl" @click="clickImg($event)"/>
                  </div>
                </div>
              </td>
              <td>建筑结构图</td>
              <td>
                <div class="otherfile">
                  <div  v-for="item in ext.structruePhotosList">
                    <img style="width: 32px;height: 32px;margin-right: 10px" class="small" :src="item.imgOssUrl" @click="clickImg($event)"/>
                  </div>
                </div>
              </td>
              <td>桥架/电缆沟走向图</td>
              <td>
                <div class="otherfile">
                  <!--<img v-for="item in ext.cableTowardsPhotosList"  :src="item.imgOssUrl"/>-->
                  <div  v-for="item in ext.cableTowardsPhotosList">
                    <img style="width: 32px;height: 32px;margin-right: 10px" class="small" :src="item.imgOssUrl" @click="clickImg($event)"/>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>电气系统图</td>
              <td>
                <div class="otherfile">
                  <!--<img v-for="item in ext.electricSystemPhotosList"  :src="item.imgOssUrl"/>-->
                  <div  v-for="item in ext.electricSystemPhotosList">
                    <img style="width: 32px;height: 32px;margin-right: 10px" class="small" :src="item.imgOssUrl" @click="clickImg($event)"/>
                  </div>
                </div>
              </td>
              <td>其他</td>
              <td>
                <div class="otherfile">
                  <!--<img v-for="item in ext.otherPhotosList"  :src="item.imgOssUrl"/>-->
                  <div  v-for="item in ext.otherPhotosList">
                    <img style="width: 32px;height: 32px;margin-right: 10px" class="small" :src="item.imgOssUrl" @click="clickImg($event)"/>
                  </div>
                </div>
              </td>
              <td></td>
              <td></td>
            </tr>
          </table>
          <!--<div style="display: flex;margin-top:13px;">-->
          <!--<div class="designPdf designPdf-content">建筑设计单位的结构载荷计算书：</div>-->
          <!--<div class="designPdf-content">-->
          <!--<el-button type="text">江苏建筑设计单位的结构载荷计算书.pdf-->
          <!--</el-button>-->
          <!--</div>-->
          <!--</div>-->
          <div style="display: flex;margin-top: 13px;margin-bottom: 39px">
            <div class="designPdf designPdf-content">满足安装光伏系统的需求：</div>
            <div class="designPdf-content">{{ext.isSuitable==1 ? "是":"否"}}</div>
          </div>
        </div>


    </div>
</template>

<script>
  import BigImg from '../../../components/photoPreview.vue';

  export default {
        name: "scene-investigation",
        data(){
            return {
              projectCode:"",
              buildingList:[],
              electric:{},//电气勘察
              ext:{},
              info:{},
              showImg:false,
              imgSrc: ''
            }
        },
      components:{
        BigImg
      },
      mounted(){
            this.projectCode = this.$route.query.projectCode;
            this.getdata();
      },
      computed: {
        roofTypeArr(){
          return this.$store.state.roofType;
        }
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
        getdata(){
          this.$http.post('/survey/selectSurvey.json', {projectCode:this.projectCode}, response => {
            if(response.code==200){
              let data = response.data?response.data:{};
              this.buildingList = data.buildingList;
              this.ext = data.ext;
              this.info = data.info;
              this.electric = data.electric;
              console.log(data)
            }else {
              this.$message({
                message:response.message,
                type: 'warning'
              });
            }
          });

        },
        roofClick(item){
          let projectStatus =  this.$route.params.id

          this.$router.push({path:'/roofDetailInfo',query:{projectStatus:projectStatus,roofData:JSON.stringify(item),projectCode:this.projectCode}})
        }
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
