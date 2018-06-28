<template>
    <div>
      <project-design :designStatus="designStatusList"></project-design>
    </div>
</template>

<script>
  import projectDesign from "./allProjects.vue"

  export default {
        name: "wait-design",
        data() {
            return {
              designStatusList:[
                {key:'design-1',value:"草稿"},/*待设计*/
                {key:'design-3',value:"驳回"},
              ],

            }
        },
    components:{
      projectDesign
    }
    }
</script>

<style scoped>

</style>


