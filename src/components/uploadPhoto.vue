<template>
    <div>
      <!--<el-upload-->
        <!--class="avatar-uploader"-->
        <!--action="/oss/uploadImgFile.json"-->
        <!--:show-file-list="false"-->
        <!--:on-success="handleAvatarSuccess"-->
        <!--:before-upload="beforeAvatarUpload">-->
        <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
        <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
      <!--</el-upload>-->

<!--多张上传-->
      <el-upload
        action="/oss/uploadImgFile.json"
        list-type="picture-card"
        :file-list="fileList"
        class="avatar-uploader"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="imageUrl" alt="">
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "upload-photo",
        props:["componentPhotosList","electricPhotosList"],
        data(){
            return {
              imageUrl:'',
              imageKey:'',
              dialogVisible: false,
              imageKeyArr:[],
              closePhotos:'',
              fileList:[],
            }
        },
      mounted(){
            this.$nextTick(function () {
                if(this.componentPhotosList){
                    let arr = this.componentPhotosList;
                    for (let i=0;i<arr.length;i++){

                        this.fileList.push({name:arr[i].imgOssKey,url:arr[i].imgOssUrl})
                    }
                }
                if(this.electricPhotosList){
                  let arr = this.electricPhotosList;
                  for (let i=0;i<arr.length;i++){

                    this.fileList.push({name:arr[i].imgOssKey,url:arr[i].imgOssUrl})
                  }

                }


            })
      },
      methods:{
        handleRemove(file, fileList) {
          let imgObj = file.response.data;
          Array.prototype.remove = function(val) {
            let index = this.indexOf(val);
            if (index > -1) {
              this.splice(index, 1);
            }
          };
          this.imageKeyArr.remove(imgObj.ossImgKey);
        },
        handlePictureCardPreview(file) {
          this.imageUrl = file.url;
          this.dialogVisible = true;
        },
        handleAvatarSuccess(res, file) {
            let imgObj = file.response.data;
          this.imageUrl = imgObj.ossImgUrl;
          this.imageKeyArr.push(imgObj.ossImgKey)
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isGIF = file.type === 'image/gif';
          const isPNG = file.type === 'image/png';
          const isBMP = file.type === 'image/bmp';
          const isLt10M = file.size / 1024 / 1024 < 10;
          if (!isJPG && !isGIF && !isPNG && !isBMP) {
            this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!');
          }
          if (!isLt10M) {
            this.$message.error('上传图片大小不能超过 10MB!');
          }
          return (isJPG || isBMP || isGIF || isPNG) && isLt10M;
        }
      },
      watch: {
        "imageKeyArr": function (val) {
            this.$emit("getPhotos",val);

        }
      }
    }
</script>

<style >
  .avatar-uploader{
    text-align: left;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    align-items: center;
    display: flex;
    justify-content: center;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>
