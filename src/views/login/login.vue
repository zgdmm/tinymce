<template>
  <div class="container">
    <!--<div class="header">
          <img src="../../assets/atslogo.png" alt="atslogo"/>
        </div>-->
    <div class="content">
      <div class="login">
        <div style="margin: 0 auto">
          <div class="title-abel" style="text-align:center">
            杭州服务外包综合服务平台
          </div>
          <div class="login-container">
            <div style="text-align:center">
              <img src="../../assets/welcome.png" alt="" style="width:150px">
            </div>
            <div class="account">
              <img src="../../assets/username.png" alt="">
              <el-input  @keyup.enter.native="login" v-model="userName" placeholder="请输入用户名"></el-input>
            </div>
            <div class="passWord">
              <img src="../../assets/password.png" alt="">
              <el-input type="password" @keyup.enter.native="login" v-model="password" placeholder="请输入账号密码"></el-input>
            </div>
            <el-button @click="login" type="danger">登录</el-button>
          </div>
  
        </div>
      </div>
    </div>
    <!--<div class="footer">
          <div class="bottomTitle">阿特斯阳光电力集团有限公司 版权所有</div>
        </div>-->
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      //15957189464 asd123
      //13618181616  123456
      //CS31000003
      userName: 'admin',
      password: 'asd123',
    }
  },
  created() {
    let self = this;
  },
  computed: {
    userId() {
      return this.$store.state.baseData.userId;
    }
  },
  methods: {
    login() {
      this.$http.post('/user/login', { userName: this.userName, password: this.password }, response => {
        if (response.code) {
          this.$router.push("/notice");
          this.$message({
            message: response.message,
            type: 'success'
          });
        } else {
          this.$message({
            message: response.message,
            type: 'warning'
          });
        }
      });
    }
  }
}
</script>
<style>
.login .el-input__inner{
  background: none!important;
  border-color: transparent!important;
  color: #fff!important;
}
.login .el-input__inner:hover {
    border-color: transparent!important;
    background: none!important;
    color: #fff!important;
}
body,html,#app{
  height: 100%;
}
</style>

<style lang="less" scoped>
.passWord,.account{
  position: relative;
  padding-left: 60px;
  background: rgba(224,224,224,.3);
  border-radius: 14px;
  padding: 4px 20px 4px 58px;
  img{
    position: absolute;
    left: 20px;
    bottom: 10px;
    width: 20px;
  }
}
.el-button {
  width: 160px;
  border-radius: 20px;
  height: 40px;
  background: #409eff;
  margin: 0 auto;
  display: block;
  border-color: #409eff;
}
.el-button:hover{
  background: #409eff;
  border-color: #409eff;
}
.container {
  width: 100%;
  background: #fff;
  height: 100%;
  .header {
    height: 70px;
    display: flex;
    align-items: center;
    img {
      margin-left: 100px;
      width: 160px;
      height: 30px;
      display: block;
    }
  }

  .content {
    position: relative;
    // height: 800px;
    height: 100%;
    background: url("../../assets/bg1.png") no-repeat;
    background-size: cover;
    .login {
      position: absolute;
      top: 156px;
      right: calc(~'50% - 300px');
      width: 600px;
      height: 330px;
      box-sizing: border-box;
      
      .login-container{
        border-radius: 10px;
        padding: 30px 50px;
        background: rgba(33, 33, 33,.6);
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.10);
      }
      .title-abel {
        margin-top: 34px;
        margin-bottom: 30px;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #fff;
        text-align: center;
      }
      .account {
        margin-bottom: 16px;
      }
      .passWord {
        margin-bottom: 20px;
      }
    }
  }

  .footer {
    margin-bottom: 0px;
    height: 61px;
    display: flex;
    align-items: center;
    .bottomTitle {
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.60);
      text-align: left;
      margin: 0 auto;
      width: 208px;
      height: 17px;
    }
  }
}
</style>
