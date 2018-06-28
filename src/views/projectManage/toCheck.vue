<template>
  <div>
    <project-status></project-status>
  </div>
</template>

<script>
  import projectStatus from "../../components/projectStatus.vue"

  export default {
    name: "to-check",
    data() {
      return {}
    },
    components:{
      projectStatus
    }
  }
</script>

<style scoped>

</style>
