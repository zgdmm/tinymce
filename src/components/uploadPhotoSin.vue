<template>
  <div>
    <!--<el-upload-->
    <!--class="avatar-uploader"-->
    <!--action="/oss/uploadImgFile.json"-->
    <!--:show-file-list="false"-->
    <!--:on-success="handleAvatarSuccess"-->
    <!--:before-upload="beforeAvatarUpload">-->
    <!--<img v-if="image" :src="image" class="avatar">-->
    <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
    <!--</el-upload>-->
  
    <!--多张上传-->
    <el-upload class="avatar-uploader1" :action="url||'/imageMng/insertImg'" list-type="picture" name='fileItem' :on-success="handleAvatarSuccess" :on-remove="handleRemove" :before-upload="beforeAvatarUpload">
      <img v-if="articleImgs||image" :src="articleImgs||image" class="avatar">
      <i class="el-icon-plus"></i>
    </el-upload>
  
  </div>
</template>

<script>
// import $ from 'jquery'
export default {
  props: ['type', 'image', 'label','url'],
  name: "upload-photo",
  data() {
    return {
      imageKey: '',
      dialogVisible: false,
      imageKeyArr: [],
      closePhotos: '',
      articleImgs: this.image,
      originImage: this.image,
      labels: this.label
    }
  },
  mounted() {
    this.$nextTick(function () {
      if (this.image) {
        this.articleImgs = this.image;
      }
      console.log(this.image, this.articleImgs, '哈哈哈哈')
    })
  },
  methods: {
    handleRemove(file, fileList) {
      // let imgObj = file.response.data;
      // Array.prototype.remove = function (val) {
      //   let index = this.indexOf(val);
      //   if (index > -1) {
      //     this.splice(index, 1);
      //   }
      // };
      // this.imageKeyArr.remove(imgObj.ossImgKey);
      this.articleImgs = '';
    },
    handlePictureCardPreview(file) {
      this.articleImgs = file.url;
      this.dialogVisible = true;
    },
    // handleAvatarSuccess(res, file) {
    //     this.articleImgs = URL.createObjectURL(file.raw);
    //   },
    handleAvatarSuccess(res, file, fileList) {
      let imgObj = file.response.data;

      this.articleImgs = imgObj.url;
      this.originImage = imgObj.imageCode;
      this.labels = imgObj.mediaId;
      console.log(res, file, fileList, 'why');

      // this.imageKeyArr.push(imgObj.ossImgKey)
    },
    buildFormData(params) {
      if (params) {
        const data = new FormData()
        let flag = false
        for (let p in params) {
          if (p) {
            flag = true;
            console.log(p,'p',params[p],'params[p]');
            if(p=='name'){
              data.append('fileItem', params[p])
            }else{
            data.append(p, params[p])
            }
          }
        }
        return data;
      }
    },
    beforeAvatarUpload(file) {
      //  if (file) file = this.buildFormData(file)
      const isJPG = file.type === 'image/jpeg';
      const isGIF = file.type === 'image/gif';
      const isPNG = file.type === 'image/png';
      const isBMP = file.type === 'image/bmp';
      const isLt10M = file.size / 1024 / 1024 < 10;
      // if (!isJPG && !isGIF && !isPNG && !isBMP) {
      //   this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!');
      // }
      // if (!isLt10M) {
      //   this.$message.error('上传图片大小不能超过 10MB!');
      // }
      console.log(file, 'this.labels1');
      if (this.label == 'policy') {
        // var formData=new filFileInputStreame(file);
        // formData.append('file',file);
        // console.log(formData,'fd')
        // console.log(new FormData().append('file',file.raw),'yumen')
        var self = this;
          if (file) file = this.buildFormData(file)
      }
      return (isJPG || isBMP || isGIF || isPNG) && isLt10M;
    }
  },
  watch: {
    // "imageKeyArr": function (val) {
    //   if (val) {
    //     this.$emit("getPhotos", val, this.type);
    //   }
    // },
    "articleImgs": function (val) {
      this.$emit("getPhotos", val, this.type, this.originImage,this.labels);
    },
  }
}
</script>

<style>
.avatar-uploader1 {
  text-align: left;
}

.avatar-uploader1 .el-upload {
  line-height: 180px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 178px;
  height: 178px;
}

.avatar-uploader1 .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader1-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
