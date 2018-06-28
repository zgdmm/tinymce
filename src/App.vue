<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      params:{
        userName:'admin',
        userPassword:'asd123'
      }
    }
  },
  mounted() {
      // this.$http.get('/user/login.json', this.params, response => {
    //     console.log(response);
    //   this.$store.dispatch('setBaseData',response.data);
    //
    // });
  },
}
</script>

<style>

</style>
