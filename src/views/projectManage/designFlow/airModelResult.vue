<template>
  <div>
    <div style="width: 800px;margin: 0 auto;">
      <div style="display: flex">
        <div>
          <div style="text-align: left;margin-bottom: 10px;font-size: 14px;color: #666666;">
            333
          </div>
          <div style="height: 220px;width: 380px;margin-right: 40px;" id="googleMap">
              我问问
          </div>

        </div>
        <div>
          <div style="text-align: left;margin-bottom: 10px;font-size: 14px;color: #666666;">组件排布图</div>
          <div style="height: 220px;width: 380px;background: red"></div>
        </div>
      </div>

      <div style="text-align: left">
        <el-button  @click="retartBuild" style="color: #409eff;" type="text">重新建模</el-button>
      </div>
        <img style="width: 300px;height: 150px" alt="预览图" id="img"/>
    </div>
  </div>

</template>

<script>
  import html2canvas from 'html2canvas'
  import Vue from 'vue';
  export default {
        name: "airmodel-result",
        data(){
            return {
              crap: false,
              center: {lat: 10.0, lng: 10.0},
              markers: [{
                position: {lat: 10.0, lng: 10.0}
              }, {
                position: {lat: 11.0, lng: 11.0}
              }]
            }
        },
    mounted(){

    },
      methods:{
        /*重新建模*/
        retartBuild(){
            console.log('跳转到dat建模');
          //要转换为图片的dom对象
          let element = document.querySelector('#googleMap');
          //要显示图片的img标签
          let image = document.querySelector('#img');
          //调用html2image方法
          this.html2image(element,image);
        },
        /*下载*/
        downLoadFile(){

        },
        /**
         * create by lrj
         * @param source    要转换为图片的dom对象
         * @param image     要显示图片的img标签
         */
        html2image(source, image) {
          html2canvas(source).then(function (canvas) {
            let imageData = canvas.toDataURL(1);
            image.src = imageData;
            console.log(imageData)
          });
        },
      }
    }
</script>

<style scoped>
  .downLoadFile{
    display: flex;
    align-items: center;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #666666;
  }
  .el-button--primary{
    margin-top: 40px;
    background: #409eff;
    border-color:#409eff;
    border-radius: 4px;
    padding: 0px;
  }
  .el-button--text{
    font-family: PingFangSC-Regular;
    font-size: 12px;
    letter-spacing: -0.32px;
    line-height: 24px;
    padding: 0px;

  }
</style>
