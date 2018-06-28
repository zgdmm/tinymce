<template>
  <div>
    <h1>{{count}}</h1>
    <el-button  @click="post" type="danger">axios请求</el-button>
  </div>


</template>

<script>
  import { mapActions } from 'vuex'

  export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      params:{
        loginAccount:'15957189464',
      loginPwd:'asd123'
      }
    }
  },
  computed:{
    count(){
      return this.$store.state.count;
    }



  },
  methods:{
    ...mapActions({
      setCount: 'setCount' // 将 `this.setCount()` 映射为 `this.$store.dispatch('setCount')`
    }),
    post() {
      this.setCount(5555555555555)

      let params2 = {
        newsTitle: '',
        newsType: '',
        isHavePic: '',
        langCode: '',
        pageSize: 10,
        pageNo: 1
      };
      var copy = Object.assign({}, this.params);
      copy.pageNo=2
      console.log(copy.pageNo)
      console.log(this.params.pageNo)
     //this.$store.dispatch('setCount',2222)
      //this.$store.commit('SET_COUNT',10000)
      this.$http.get('/user/login.json', this.params, response => {
        if (response.status >= 200 && response.status < 300) {
          console.log(response.data);
        } else {
          console.log(response.message);
        }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
