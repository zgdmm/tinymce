<template>
  <div class="left-label">
    <div class="line"></div>
    <span class="manage">{{LabelName}}</span>
  </div>
</template>

<script>
    export default {
      props:['LabelName'],
        name: "left-label",
        data() {
            return {}
        }
    }
</script>

<style scoped lang="less">
  .left-label{
    text-align: left;
    display: flex;
    align-items: center;
    .line{
      background: #409eff;
      margin-right: 6px;
      height: 14px;
      width: 2px;
    }
    .manage{
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #333333;
      line-height: 21px;
    }

  }
</style>
