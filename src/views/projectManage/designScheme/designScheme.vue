<template>
    <div id="pdfDom" class="project-base-info">
      <div class="project-base-label">项目基本情况</div>
      <table>
        <tr>
          <td>客户需求</td>
          <td>{{info.customerDemand ? info.customerDemand :'--'}}</td>
          <td>房屋产权</td>
          <td>{{info.houseProperty ? info.houseProperty : '--'}}</td>
          <td>建筑年限</td>
          <td>{{info.houseYears ? info.houseYears : ''}}</td>
        </tr>
        <tr>
          <td>建筑荷载预判</td>
          <td>{{info.buidlLoad ? info.buidlLoad : '--'}}</td>
          <td>并网模式</td>
          <td>{{info.gridMode?(info.gridMode==1?'自发自用,余电上网':'全额上网'):'--'}}</td>
          <td></td>
          <td></td>
        </tr>
      </table>
      <div class="building-info">
        <div class="building-info-label">建筑情况概况</div>
        <div class="building-info-content">
          <div @click="roofClick(item)"  class="build-container" v-for="item in buildingList">
            <img  :src="item.roofPhotosList[0].imgOssUrl"/>
            <div class="build-desc">
              <div class="roof-name">{{item.roofName ? item.roofName : '--'}}</div>
              <div v-if="item.roofType" class="roof-type">{{item.roofType |Context(roofTypeArr)}}</div>
              <div v-else class="roof-type">--</div>

            </div>
          </div>
        </div>

        <div class="building-info-title">逆变器数量：{{designDetail.inverterNum?designDetail.inverterNum:'--'}}</div>
        <div class="project-status-desc">项目概况说明：
          光伏组件拟安装在{{projectBaseInfo.detailAddress ? projectBaseInfo.detailAddress :'--'}}屋顶，建筑物屋顶类型为{{roofTypeList ? roofTypeList : '--'}}，属于{{designDetail.projectType ? designDetail.projectType : '--'}}，除去屋顶{{coverInfoStr ? coverInfoStr:'--'}}等阴影遮挡部分，屋顶可利用面积约为{{designDetail.roofAvailAcreage ? designDetail.roofAvailAcreage:'--'}}平方米。根据屋顶类型采用{{designDetail.installType ? designDetail.installType :'--'}}的安装方式</div>

        <div class="building-info-label">光伏系统设计</div>
        <div class="system-principle">系统原理</div>
        <div class="imgContainer">
          <img  :src="designDetail.systemPrinPic"/>
        </div>
        <div class="system-principle">方案总述</div>
        <div style="border-bottom: none" class="project-status-desc">
          根据业主方面的要求和现场勘察的信息，光伏组件拟安装在{{projectBaseInfo.detailAddress ? projectBaseInfo.detailAddress : '--'}}屋顶，屋顶可利用面积约为{{designDetail.roofAvailAcreage ? designDetail.roofAvailAcreage : '--'}}平方米。考虑后续光伏系统的运维及组件的清洁，进行分组铺设，预留通道。屋顶可安装光伏组件{{designDetail.componetNum ? designDetail.componetNum : '--'}}片，安装面积约为{{designDetail.installAcreage ? designDetail.installAcreage : '--'}}平方米。光伏系统所发的电量{{info.gridMode==1?'优先供给自身消耗，多余电量馈送到公共电网':'全部馈送到公共电网​'}}。
        </div>
        <div class="system-principle">组件排布</div>
        <div class="imgContainer">
          <big-img  v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>

          <!--<img   :src="componentPhotos"/>-->
          <div  v-for="item in componentPhotos">
            <!--{{item.imgOssUrl}}-->
            <img style="margin-right: 10px" class="small" :src="item.imgOssUrl" @click="clickImg($event)">
          </div>
        </div>
        <div class="downLoadFile">
          <div>无人机模型：某某项目3D建模文件.3dx</div>
          <el-button style="color: red;" type="text">下载</el-button>
        </div>
        <div class="system-principle">组串接线图</div>
        <div class="wring-diagram">
            <img   :src="electricPhotos"/>
          <div style="width: 600px;border-bottom: none" class="project-status-desc">
            <p>{{designDetail.infoText?designDetail.infoText:'--'}}</p>
            <p>为了保证光伏系统正常高效运行，避免因雷击和电涌等对系统设备的造成损坏，光伏系统防雷必不可少</p>
            <p>1、垂直接地体，采用40*40*4mm热镀锌角钢，长度2.5m垂直打入土壤，且埋设深度不低于60cm，接地电阻不大于10Ω。</p>
            <p>2、水平接地体，采用40*4mm的热镀锌扁钢，焊接每一根垂直接地体，四面满焊，做好防腐，水平接地体沿墙体敷设至配电箱下端，做好黄黑标识。</p>
            <p>3、屋顶电站的金属支架和组件边框采用导电片、接地耳、黄绿接地线进行组网，形成可靠的电气连接，再经过单独接地干线接入建筑物接地系统或人工接地体.</p>
            <p>4、电气设备均配置了浪涌保护，所有电气设备外壳均应有良好的接地。</p>
          </div>
        </div>
        <div class="building-info-label">设备选型</div>
        <div v-for="item in euipmentSelectList" class="equipment-Container">
          <div class="equipment-header">
            <div class="equipment-header-left">
              <div style="display: flex;align-items: center">
                <img :src="item.imageUrl"/>
                <div class="equipment-icon-desc">
                  <div v-if="item.productType" class="equipment-title">{{item.productType | Context(productTypeList)}}</div>
                  <div v-else class="equipment-title">--</div>
                  <div class="equipment-type">{{item.productModel?item.productModel:'--'}}</div>
                </div>
              </div>
              <el-button @click="fold(item)" type="text">{{expands.indexOf(item.id)>-1?"收起":"展开"}}</el-button>
            </div>
          </div>
          <div v-show="expands.indexOf(item.id)>-1" class="equipment-desc">
            <div v-show="item.productProperties&&item.productType!=8" class="equipment-left">
              <div v-for="item in item.left">{{item}}</div>
            </div>
            <div v-show="item.productProperties&&item.productType!=8" class="equipment-right">
              <div v-for="item in item.right">{{item}}</div>
            </div>
            <div v-show="item.productType==8" class="imgContainer">
              <img   :src="item.diagramUrl"/>
            </div>
          </div>
        </div>
        <div style="display: flex;align-items: center;border-top: solid 1px #f4f4f4;padding-top: 20px">
          <div class="benefitAnalysisLabel">收益分析</div>
          <div class="remarks">（注：发电收益分析是根据现行的补贴政策，当地脱硫煤电价和用电均价或标杆电价进行计算，实际收益以供电公司结算为准！）</div>
        </div>
        <el-row style="padding-bottom: 20px;border-bottom: solid 1px #f4f4f4" type="flex"  justify="space-around">
          <el-col :span="8">
              <div class="tableLabel">发电量测算表</div>
              <el-table
                max-height="660"
                id="allProjects"
                border
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  align="center"
                  label="年次"
                  width="180">
                  <template slot-scope="scope">
                    <div v-if="scope.row.year">第{{scope.row.year}}年</div>
                    <div v-if="scope.row.power25">25年累计发电量</div>
                    <div v-if="scope.row.powerAve">25年年均发电量</div>

                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="capacity"
                  label="年发电量力（kw*h）"
                  width="180">
                  <template slot-scope="scope">
                    <div v-if="scope.row.capacity">{{scope.row.capacity}}</div>
                    <div v-if="scope.row.power25">{{scope.row.power25}}</div>
                    <div v-if="scope.row.powerAve">{{scope.row.powerAve}}</div>
                  </template>
                </el-table-column>
              </el-table>
          </el-col>
          <el-col :span="6">
              <div class="tableLabel">计算依据</div>
              <table v-if="gridMode==2">
                <tr>
                  <td>标杆电价（元/度）</td>
                  <td>{{calBy.bgElectricPrice?calBy.bgElectricPrice:'--'}}</td>
                </tr>
                <tr>
                  <td>执行时间</td>
                  <td>{{calBy.executionTime?calBy.executionTime:'--'}}</td>
                </tr>
                <tr>
                  <td>25年总发电量</td>
                  <td>{{calBy.power25?calBy.power25:'--'}}</td>
                </tr>
                <tr>
                  <td>25年年均发电量</td>
                  <td>{{calBy.powerAve?calBy.powerAve:'--'}}</td>
                </tr>
                <tr>
                  <td>每瓦年均发电量</td>
                  <td>{{calBy.powerPerWatt?calBy.powerPerWatt:'--'}}</td>
                </tr>
              </table>

            <table v-if="gridMode==1">
              <tr>
                <td>补贴政策</td>
                <td>补贴额度（元/度）</td>
                <td>补贴年限（年）</td>
              </tr>
              <tr v-for="item in subsidy">
                <td>{{item.subsidyLevel?item.subsidyLevel:'--'}}</td>
                <td>{{item.subsidyLimit?item.subsidyLimit:'--'}}</td>
                <td>{{item.subsidyYear?item.subsidyYear:'--'}}</td>
              </tr>
            </table>
          </el-col>
          <el-col :span="6">
              <div class="tableLabel">经济效益</div>
              <table>
                <tr>
                  <td>全额上网</td>
                  <td>{{economicBen.electricityRatio?economicBen.electricityRatio:'--'}}</td>
                </tr>
                <tr>
                  <td>25年总收益（元）</td>
                  <td>{{economicBen.revenueTotal?economicBen.revenueTotal:'--'}}</td>
                </tr>
                <tr>
                  <td>年均发电收益（元）</td>
                  <td>{{economicBen.revenueAve?economicBen.revenueAve:'--'}}</td>
                </tr>
                <tr>
                  <td>每瓦发电收益（元）</td>
                  <td>{{economicBen.revenuePerWatt?economicBen.revenuePerWatt:'--'}}</td>
                </tr>
              </table>
          </el-col>
        </el-row>
        <div style="margin-top: 20px;margin-bottom: 12px" class="benefitAnalysisLabel">设备清单</div>
        <el-table
          id="allProjects"
          border
          type="index"
          :data="equipmentList"
          style="width: 100%">
          <el-table-column
            prop="productType"
            label="设备名称"
            align="center"
            width="180">
            <span slot-scope="scope">{{scope.row.productType | Context(productTypeList)}}</span>
          </el-table-column>
          <el-table-column
            prop="deviceVersion"
            label="设备型号"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="deviceSum"
            align="center"
            label="数量">
          </el-table-column>
          <el-table-column
            align="center"
            label="单位">
            <template slot-scope="scope">
              <div v-show="scope.row.productType==2||scope.row.productType==3">台</div>
              <div v-show="scope.row.productType==1">片</div>
              <div v-show="scope.row.productType==4||scope.row.productType==5||scope.row.productType==6">米</div>
              <div v-show="scope.row.productType==7">对</div>
              <div v-show="scope.row.productType==8||scope.row.productType==9||scope.row.productType==10">套</div>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin: 0 auto">
          <el-button v-if="historyName!='previewDesign'"  @click="exportPDF" type="primary">导出方案</el-button>
        </div>
      </div>
    </div>
</template>

<script>
  import BigImg from '../../../components/photoPreview.vue';

  export default {
      name: "design-scheme",
        components:{
          BigImg
        },
        data(){
            return {
              showImg:false,
              imgSrc: '',
              htmlTitle: '页面导出PDF文件名',
              expands: [],//需要展开的行
              info: {},
              projectCode: '',//项目编码
              buildingList: [],
              designDetail: {},
              projectBaseInfo: {},
              subsidy:[],
              roofTypeList: '',
              coverInfoStr: '',
              electricPhotos:'',//组串接线图
              componentPhotos:[],//组件排布
              euipmentSelectList:[],//设备选型,
              tableData:[],
              equipmentList:[],//设备清单
              economicBen:{},//经济效益
              gridMode:'',//上网模式
              /*计算依据*/
              calBy:{
                executionTime:"",//执行时间
                power25:'',//25年发电总和
                bgElectricPrice:'',//标杆电价
                powerAve:'',//平均发电量
                powerPerWatt:'',//每瓦年均发电量
              },
              historyName:''

            }
        },
      mounted(){
        this.historyName= this.$router.history.current.name;
        this.projectCode = this.$route.query.projectCode;
        this.projectBaseInfo = this.$store.state.projectBaseInfo;
        this.getBaseInfo();
        this.getDesignDetail();
        this.getsubSystemDetail();
        this.getTableData();
        this.getEquipmentList();//获取设备清单
      },
      computed:{
        roofTypeArr(){
            return this.$store.state.roofType;
        },
        productTypeList(){
          return this.$store.state.productTypeList;
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
        roofClick(item){
          let projectStatus =  this.$route.params.id

          this.$router.push({path:'/roofDetailInfo',query:{projectStatus:projectStatus,roofData:JSON.stringify(item),projectCode:this.projectCode}})
        },
        getBaseInfo(){
          this.$http.post('/survey/selectSurveyForDesign.json', {projectCode: this.projectCode}, response => {
            if (response.code == 200) {
              let data = response.data ? response.data : {};
              this.info = data;
              this.buildingList = data.buildingVOList;
              let roofTypeList=[];
              let coverInfoList = [];
              let roofTypeArr = this.roofTypeArr ? this.roofTypeArr:[];
              for(let i=0;i<this.buildingList.length;i++){
                  coverInfoList.push(this.buildingList[i].coverInfo);

                for(let j=0;j<roofTypeArr.length;j++){
                      if(this.buildingList[i].roofType==roofTypeArr[j].key){
                        roofTypeList.push(roofTypeArr[j].value);
                      }
                  }

              }
              this.roofTypeList = roofTypeList.join(',');
              this.coverInfoStr = coverInfoList.join('、');

            } else {
              this.$message({
                message: response.message,
                type: 'warning'
              });
            }
          });
        },
        getDesignDetail(){
          this.$http.post('/design/selectDesignDetailPage', {projectCode: this.projectCode}, response => {
            if (response.code == 200) {
              let data = response.data ? response.data : {};
              this.designDetail = data;
              this.electricPhotos= data.electricPhotos[0].imgOssUrl;
              this.componentPhotos=data.componentPhotos;
            } else {
              this.$message({
                message: response.message,
                type: 'warning'
              });
            }
          });
        },
        /*光伏设计*/
        getsubSystemDetail(){
          this.$http.post('/design/selectDesignProduct', {projectCode: this.projectCode}, response => {
            if (response.code == 200) {
              let data = response.data ? response.data : [];
              this.euipmentSelectList = data;

              console.log('-----',data);
              for(let i=0;i<data.length;i++){
                let left=[],right=[];
                let props = JSON.parse(data[i].productProperties);
                for(let i in props){
                  let p = props[i];
                  console.log(p)
                  left.push(p.paramName);
                  right.push(p.paramValue);
//                  for(let j in p){
//                    left.push(j);
//                    right.push(p[j]);
//                  }
                }
                data[i].left = left;
                data[i].right = right;
              }

            } else {
              this.$message({
                message: response.message,
                type: 'warning'
              });
            }
          });
        },
        getTableData(){
          this.$http.post('/design/benefitAnalysis', {projectCode: this.projectCode}, response => {
            if (response.code == 200) {
              let data = response.data ? response.data : {};
              this.tableData = data.generatingCapacityVOList;
               let arr = [];
              arr.push({power25:data.power25});
              arr.push({powerAve:data.powerAve});
              this.tableData=this.tableData.concat(arr);
              this.gridMode = data.gridMode;//上网模式
              if(data.gridMode==1){
                this.subsidy=data.subsidy;
              }
              this.economicBen = data.economicBen[0];
              this.calBy.executionTime=data.executionTime;
              this.calBy.power25=data.power25;
              this.calBy.bgElectricPrice=data.bgElectricPrice;
              this.calBy.powerAve=data.powerAve;
              this.calBy.powerPerWatt=data.powerPerWatt;
            } else {
              this.$message({
                message: response.message,
                type: 'warning'
              });
            }
          });
        },
        getEquipmentList(){
          this.$http.post('/design/selectDeviceByByProjectAndDesign', {projectCode: this.projectCode}, response => {
            if (response.code == 200) {
              let data = response.data ? response.data : {};
              console.log(data);
              this.equipmentList = data;
            } else {
              this.$message({
                message: response.message,
                type: 'warning'
              });
            }
          });
        },
        //导出pdf
        exportPDF(){
          window.location.href="/design/exportDesignDetailForPDF?projectCode="+this.projectCode;
        },
        fold(row){
          Array.prototype.remove = function (val) {
            let index = this.indexOf(val);
            if (index > -1) {
              this.splice(index, 1);
            }
          };
          if (this.expands.indexOf(row.id) < 0) {
            this.expands.push(row.id);
          } else {
            this.expands.remove(row.id);
          }
        }

      }
    }
</script>

<style scoped lang="less">

  .el-button--primary{
    margin-top: 40px;
    background: #409eff;
    border-color:#409eff;
    border-radius: 4px;
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
    img {
      width: 32px;
      height: 32px;
      margin-right: 5px;
    }
  }
  }
  .remarks{
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #999999;
    text-align: left;
  }
  .tableLabel{
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #666666;
    text-align: left;
    margin: 12px 0;
  }
  .benefitAnalysisLabel{
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #666666;
    text-align: left;
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
    .wring-diagram{
      display: flex;
      justify-content: space-between;
      padding-bottom: 20px;
      border-bottom: solid 1px #f4f4f4;
      img{
        width: 340px;
        height: 230px;
      }
    }
    .downLoadFile{
      display: flex;
      align-items: center;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #666666;
    }
    .imgContainer{
      background: #FFFFFF;
      border: 1px solid #EAEAEA;
      width: 360px;
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        width: 341px;
        height: 104px;
      }
    }
    .system-principle{
      text-align: left;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #333333;
      letter-spacing: 0;
      line-height: 16px;
      margin-bottom: 8px;
    }
    .project-status-desc{
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #666666;
      letter-spacing: 0;
      line-height: 20px;
      text-align: left;
      padding-bottom: 20px;
      border-bottom: solid 1px #f4f4f4;
    }
    .building-info-title{
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #666666;
      letter-spacing: -0.32px;
      line-height: 24px;
      text-align: left;

    }
    .building-info-label {
      font-family: PingFangSC-Medium;
      font-size: 12px;
      color: #666666;
      text-align: left;
      margin-top: 21px;
      margin-bottom: 12px;
    }
    .equipment-Container {
      background: #F8F8F8;
      width: 343px;
      padding-left: 16px;
      margin-bottom: 10px;
      .equipment-header {
        padding-right: 16px;
        margin: 0 16px;
        padding: 16px 0;
        img{
          width: 50px;
          height: 50px;
        }
        .equipment-header-left{
          display: flex;
          justify-content: space-between;
          align-items: center;
          .equipment-icon-desc{
            display: flex;
            margin-left: 20px;
            flex-direction: column;
            align-items: center;
            .equipment-title{
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: rgba(0,0,0,0.80);
              letter-spacing: 0;
              margin-bottom: 4px;
            }
            .equipment-type{
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: rgba(0,0,0,0.60);
              letter-spacing: 0;
            }
          }
        }
      }
      .equipment-desc {
        padding-bottom: 10px;
        border-top: solid 1px rgba(31, 56, 88, 0.10);
        display: flex;
        justify-content: space-between;
        .imgContainer{
          margin: 18px 0;
          margin-right: 18px;
          margin-bottom: 0px;
        }
        .equipment-left {
          display: flex;
          flex-direction: column;
          width: 50%;
          >div{
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: rgba(0,0,0,0.40);
            letter-spacing: 0;
            text-align: right;
            line-height: 26px;
          }
        }
        .equipment-right {
          display: flex;
          flex-direction: column;
          width: 40%;
          >div{
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: rgba(0,0,0,0.60);
            letter-spacing: 0;
            line-height: 26px;
            text-align: left;
          }
        }
      }
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
