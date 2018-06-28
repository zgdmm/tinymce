
<template>
    <div class="body">
        <!--<div class="tab">
            <div>
                <img src="../../assets/back.png" style="width: 24px;" alt="">
            </div>
            <div style="font-size: 17px;
                                color: rgba(0,0,0,0.80);
                                letter-spacing: -0.41px;
                                text-align: center;">项目展示</div>
            <div style="color:transparent">返回</div>
        </div>-->
        <header class="txt-center">
            {{projectName}}
        </header>
        <div class="base-info">
            <div class="head-info">基本信息
            </div>
            <div class="flex-box">
                <div>项目编号</div>
                <div>{{projectNumber}}</div>
            </div>
            <div class="flex-box">
                <div>业主姓名</div>
                <div>{{name}}</div>
            </div>
            <div class="flex-box">
                <div>联系方式</div>
                <div>{{phone}}</div>
            </div>
        </div>
        <div style="height:185px;background:#fff">
            <el-amap vid="amapDemo" :zoom="zoom" :center="center" class="amap-demo" :plugin="plugin">
                <!--<el-amap-info-window :position="mywindow.position" :content="mywindow.content" :visible="mywindow.visible" :events="mywindow.events"></el-amap-info-window>-->
                <el-amap-marker :position="marker.position" :events="marker.events" :visible="marker.visible" :dragEnable="false"></el-amap-marker>
                <!--<el-amap-circle :center="circle.center" :radius="circle.radius" :fillOpacity="circle.fillOpacity" :events="circle.events" :strokeColor="circle.strokeColor" :strokeStyle="circle.strokeStyle" :fillColor="circle.fillColor"></el-amap-circle>-->
    
            </el-amap>
        </div>
        <div class="address txt-center" style="height:68px;background:#fff;margin-bottom:12px;padding: 11px 0 10px 0;">
            <div style="color: #409eff;font-size: 12px;
                            letter-spacing: -0.27px;
                            line-height: 24px;">
                <img src="../../assets/address.png" style="width: 16px;position: relative;
    top: 2px;" alt=""> 详细地址：{{address}}
            </div>
            <div style="font-size: 12px;
                            color: rgba(0,0,0,0.60);
                            letter-spacing: -0.32px;
                            line-height: 24px;">经纬度:{{locationCoor}}
            </div>
            <!--东经 - {{dj}} 北纬 - {{bw}}-->
        </div>
        <div style="margin-bottom:12px;background:#fff">
            <div class="head-info">勘查情况
            </div>
            <div v-for="project in projectSurveyBuildingVOList">
                <div class="kancha-item">
                    <div class="cancha-head">{{project.roofName}}全景图</div>
                    <div class="flex-box">
                        <img v-for="item in project.roofPhotosList" :src="item.imgOssUrl" alt="">
                    </div>
                </div>
                <div class="kancha-item">
                    <div class="cancha-head">{{project.roofName}}勘察草图</div>
                    <div class="flex-box">
                        <img v-for="item in project.sketchImagesList" :src="item.imgOssUrl" alt="">
                    </div>
                </div>
            </div>
    
        </div>
        <div style="margin-bottom:12px;background:#fff">
            <div class="head-info">设计方案
            </div>
            <div class="kancha-item">
                <div class="cancha-head">组件排布图</div>
                <div class="flex-box" style="border-bottom: 1px solid #f1f1f1;
                            margin: 0 16px;
                            padding: 0 0 18px 0;">
                    <img v-for="item in componentPhotos" :src="item.imgOssUrl" alt="">
                </div>
            </div>
            <div class="kancha-item">
                <div class="cancha-head">组串接线图</div>
                <div class="flex-box">
                    <img v-for="item in electricPhotos" :src="item.imgOssUrl" alt="">
                </div>
            </div>
        </div>
        <div class="device" style="margin-bottom:12px;background:#fff">
            <div class="head-info">设备选项</div>
            <div style="padding:18px">
                <el-table :data="tableData" style="width: 100%" border>
                    <el-table-column label="设备" prop="deviceName">
                        <template slot-scope="scope">
                            {{scope.row.deviceName||'--'}}
                        </template>
                    </el-table-column>
                    <el-table-column label="型号" prop="deviceName">
                        <template slot-scope="scope">
                            {{scope.row.deviceName||'--'}}
                        </template>
                    </el-table-column>
                    <el-table-column label="条码" prop="deviceModel">
                        <template slot-scope="scope">
                            {{scope.row.deviceModel||'--'}}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="shigong" style="margin-bottom:12px;background:#fff">
            <div class="head-info">施工</div>
            <div class="shigong-item">
                <div class="cancha-head">
                    支架安装上部
                </div>
                <div class="flex-box" style="border-bottom: 1px solid #f1f1f1;
                            margin: 0 16px;
                            padding: 0 0 18px 0;">
                    <img v-for="item in aboveBlacketPhotos" :src="item.imgOssUrl" alt="">
                </div>
            </div>
            <div class="shigong-item">
                <div class="cancha-head">
                    支架安装下部
                </div>
                <div class="flex-box" style="border-bottom: 1px solid #f1f1f1;
                            margin: 0 16px;
                            padding: 0 0 18px 0;">
                    <img v-for="item in underBlacketPhotos" :src="item.imgOssUrl" alt="">
                </div>
            </div>
            <div class="shigong-item">
                <div class="cancha-head">
                    组件安装过程图
                </div>
                <div class="flex-box" style="border-bottom: 1px solid #f1f1f1;
                            margin: 0 16px;
                            padding: 0 0 18px 0;">
                    <img v-for="item in assemblyPhotos" :src="item.imgOssUrl" alt="">
                </div>
            </div>
            <div class="shigong-item">
                <div class="cancha-head">
                    项目完工照片
                </div>
                <div class="flex-box">
                    <img v-for="item in finishPhotos" :src="item.imgOssUrl" alt="">
                </div>
            </div>
        </div>
        <div class="bingwang-info" v-if="connectNetTime">
            <div class="head-info">并网信息</div>
            <div class="flex-box bingwang-item">
                <div>并网时间</div>
                <div>{{connectNetTime}}</div>
            </div>
        </div>
        <div class="bingwang-info" v-if="patrolPassTime">
            <div class="head-info">验收信息</div>
            <div class="flex-box bingwang-item">
                <div>验收时间</div>
                <div v-if="patrolPassTime">{{patrolPassTime}}</div>
            </div>
        </div>
        <div id="container" style="width:500px; height:300px"></div>
    </div>
</template>

<script>
// import $ from 'jQuery';
// import AMap from 'AMap'
export default {
    data() {
        var self = this;
        return {
            projectName: '江苏省苏州市吴中区鹿山路343号1200kwp项目',
            projectNumber: '14596894783',
            name: '张明明',
            phone: '136****5418',
            address: '江苏省苏州市吴中区鹿山路343号',
            dj: '120.58',
            bw: '120.58',
            tableData: [],//设备选型
            wudingList: [
                // { image: 'https://csisolar-ygj.oss-cn-shanghai.aliyuncs.com/image/pc/fe9aa610ce96490e869e42f0cd321520.jpg' },
                // { image: 'https://csisolar-ygj.oss-cn-shanghai.aliyuncs.com/image/pc/fe9aa610ce96490e869e42f0cd321520.jpg' },
                // { image: 'https://csisolar-ygj.oss-cn-shanghai.aliyuncs.com/image/pc/fe9aa610ce96490e869e42f0cd321520.jpg' },
                // { image: 'https://csisolar-ygj.oss-cn-shanghai.aliyuncs.com/image/pc/fe9aa610ce96490e869e42f0cd321520.jpg' },
                // { image: 'https://csisolar-ygj.oss-cn-shanghai.aliyuncs.com/image/pc/fe9aa610ce96490e869e42f0cd321520.jpg' }
            ],//屋顶
            sketchImagesList: [],//勘察草图
            connectNetTime: '2018-04-12',//并网时间
            patrolPassTime: '2018-04-12',//验收时间
            finishPhotos: [],//支架完成图
            assemblyPhotos: [],//安装组件图
            projectName: '',
            aboveBlacketPhotos: [],//支架上部
            underBlacketPhotos: [],//支架下部
            componentPhotos: [],//	组件排布图
            electricPhotos: [],//组串接线
            projectSurveyBuildingVOList: [],//勘察情况
            locationCoor: '',
            zoom: 15,
            center: [116.3911008475784, 39.90192911932787],
            circle: {
                clickable: true,
                center: [121.5273285, 31.21515044],
                radius: 200,
                fillOpacity: 0.3,
                strokeStyle: 'dashed',
                fillColor: '#FFFF00',
                strokeColor: '#00BFFF'
            },
            marker: {
                position: [116.3911008475784, 39.90192911932787],
                // events: {
                //     click: () => {
                //         if (this.mywindow.visible === true) {
                //             this.mywindow.visible = false
                //         } else {
                //             this.mywindow.visible = true
                //         }
                //     },
                //     dragend: (e) => {
                //         this.markers[0].position = [e.lnglat.lng, e.lnglat.lat]
                //     }
                // },
                visible: true,
                draggable: false
            },
            mywindow: {
                position: [121.5273285, 31.21515044],
                content: '<h4>该点数据信息</h4><div class="text item">Information A: ...</div><div class="text item">Information B: ...</div>',
                visible: true,
                events: {
                    close() {
                        this.mywindow.visible = false
                    }
                }
            },
            plugin: {
                pName: 'Scale',
                events: {
                    init(instance) {
                        console.log(instance)
                    }
                }
            }
        }

    },

    mounted() {
        this.getProject();
        // this.init();
    },
    methods: {
        init: function () {
            console.log(AMap);
            //   var   map = new AMap.Map('container', {
            //     center: [116.397428, 39.90923],
            //     resizeEnable: true,
            //     zoom: 10
            //     })
            //     AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
            //     map.addControl(new AMap.ToolBar())
            //     map.addControl(new AMap.Scale())
            //     })
        },
        getParameterByName: function (name, url) {
            if (!url)
                url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results)
                return null;
            if (!results[2])
                return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        },
        getProject() {
            this.$http.posth5('/project/projectShow', {
                projectCode: this.getParameterByName('projectCode') || 'CS33000014', token:
                this.getParameterByName('token') || 'ff78861da888449db25378914fa0e888'
            }, response => {
                if (response.success) {
                    this.name = response.data.projectBaseInfo.ownerName;
                    this.phone = response.data.projectBaseInfo.ownerPhone;
                    this.phone = this.phone.substr(0, 3) + '****' +this.phone.substr(7);
                    this.projectNumber = response.data.projectBaseInfo.projectCode;
                    this.address = response.data.projectBaseInfo.detailAddress;
                    this.connectNetTime = response.data.projectBaseInfo.connectNetTime;
                    this.patrolPassTime = response.data.projectBaseInfo.patrolPassTime;
                    this.locationCoor = response.data.projectBaseInfo.locationCoor;
                    this.center = this.marker.center = [parseFloat(this.locationCoor.split('-')[1]),parseFloat(this.locationCoor.split('-')[2])];
                    this.projectSurveyBuildingVOList = response.data.projectSurveyBuildingVOList;
                    // this.sketchImagesList = response.data.projectSurveyBuildingVOList[0].sketchImagesList;
                    this.finishPhotos = response.data.finishPhotos;
                    this.assemblyPhotos = response.data.assemblyPhotos;
                    this.projectName = response.data.projectName;
                    this.aboveBlacketPhotos = response.data.aboveBlacketPhotos;
                    this.underBlacketPhotos = response.data.underBlacketPhotos;
                    this.componentPhotos = response.data.componentPhotos;
                    this.electricPhotos = response.data.electricPhotos;
                }
            });
        }
    },
    watch: {

    }
}
</script>

<style scoped>
.tab {
    height: 24px;
    background: #fff;
    padding-top: 12px;
    padding: 12px 16px 10px 16px;
    margin-bottom: 12px;
}

.head-info {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.80);
    letter-spacing: 0;
    border-bottom: 1px solid #f1f1f1;
    height: 40px;
    line-height: 40px;
    padding: 0 16px;
    background: #fff;
}

.base-info {
    background: #fff;
}

.base-info .flex-box {
    height: 44px;
    line-height: 44px;
    padding: 0 16px;
    border-bottom: 1px solid #f1f1f1;
}

.base-info .flex-box div:nth-of-type(1) {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.60);
    letter-spacing: 0;
    line-height: 22px;
}

.base-info .flex-box div:nth-of-type(2) {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.60);
    letter-spacing: 0;
    text-align: right;
    line-height: 22px;
}

.cancha-head {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.60);
    letter-spacing: 0;
    line-height: 22px;
    height: 46px;
    line-height: 46px;
    padding: 0 16px;
}

.kancha-item .flex-box {
    padding: 0 16px 18px 16px;
    justify-content: flex-start;
}

.kancha-item .flex-box img {
    width: 60px;
    height: 60px;
    margin-right: 11px;
}

.txt-center {
    text-align: center;
}

.body {
    height: 100%;
    background: rgba(31, 56, 88, 0.06);
    padding-top: 45px;
}

.shigong-item .flex-box {
    padding: 0 16px 18px 16px;
    justify-content: flex-start;
}

.shigong-item .flex-box img {
    width: 60px;
    height: 60px;
    margin-right: 11px;
}

.flex-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.tab {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.bingwang-info {
    background: #fff;
}

.bingwang-info .bingwang-item {
    height: 40px;
    line-height: 40px;
    padding: 0 16px;
}

.bingwang-item div:nth-of-type(1) {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.60);
    letter-spacing: 0;
    line-height: 22px;
}

.bingwang-item div:nth-of-type(2) {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.60);
    letter-spacing: 0;
    text-align: right;
    line-height: 22px;
}

header {
    padding: 12px 69px 14px 69px;
    background: #fff;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.60);
    letter-spacing: 0;
    margin-bottom: 12px;
    line-height: 22px;
}
</style>
