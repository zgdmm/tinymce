<template>
    <div style="padding: 20px">
      <design-scheme></design-scheme>
    </div>
</template>

<script>
  import designScheme from "../designScheme/designScheme.vue"

  export default {
        name: "preview-design",
        data(){
            return {}
        },
        components:{
          designScheme
        },


    }
</script>

<style scoped>

</style>
