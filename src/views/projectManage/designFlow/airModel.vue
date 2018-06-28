<template>
    <div>无人机建模
      <el-row style="margin-top: 46px" type="flex" justify="center">
        <el-row type="flex">
          <el-button  @click="nextFlow()"  type="primary">下一步</el-button>
          <el-button  @click="goBack()">上一步</el-button>

          <el-button  @click="reset()">重置</el-button>
        </el-row>
      </el-row>
    </div>

</template>

<script>
  export default {
    name: "air-model",
    data(){
      return {}
    },
    methods: {
      nextFlow(){
          this.$store.dispatch("setStepNumber",3)
      },
      goBack(){
        this.$store.dispatch('setStepNumber',1);
      }
    }
  }
</script>

<style scoped>

</style>
