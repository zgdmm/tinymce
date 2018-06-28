<template>
    <div>
        <div style="min-width: 1080px">
            <el-row style="padding: 0px 24px;height: 54px;background: #ffffff" type="flex" align="middle" justify="space-between">
                <el-col :span="6">
                    <div class="roleName">杭州服务外包综合服务平台</div>
                </el-col>
                <el-col :span="6">
                    <div style="display: flex;justify-content: flex-end;align-items: center">
                        <img style="width: 30px;height: 30px;margin-right: 10px" src="../../assets/user.svg" />
                        
                        <el-dropdown @command="handleCommand">
                            
                            <div class="user-name">{{userData.userName||'管理员'}}，您好<i class="el-icon-arrow-down el-icon--right"></i></div>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="logout">退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-container>
    
            <el-aside width="200px">
                <el-col>
                    <!--<div style="margin:20px 0;color: #fff;background: #404040">阿特斯用户云管家平台</div>-->
                    <el-menu default-active="2" @open="handleOpen" @close="handleClose" :router="true" background-color="#404040" text-color="#fff" active-text-color="#409EFF">
                        <el-menu-item index="/notice">
    
                            <span slot="title">通知公告管理</span>
                        </el-menu-item>
                        <el-menu-item index="/news">
    
                            <span slot="title">行业动态管理</span>
                        </el-menu-item>
                        <el-menu-item index="/activity">
    
                            <span slot="title">活动管理</span>
                        </el-menu-item>
                        <el-menu-item index="/policy">
    
                            <span slot="title">政策法规管理</span>
                        </el-menu-item>
                        <el-submenu index="2">
                            <template slot="title">
                                <span>协会服务</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="/parkmerchants">园区招商</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </el-col>
            </el-aside>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
    name: "navMenu",
    data() {
        return {
            show: true,
            userData: {}
        }
    },
    mounted() {
        // this.getUser();
    },
    computed: {
        //            userinfo() {
        //                let temp =  JSON.stringify(this.$store.state.baseData);
        //              if (temp=="{}") {
        //                let baseData = JSON.parse(localStorage.baseData);;
        //                this.$store.dispatch('setBaseData', baseData);
        //              }
        //                return this.$store.state.baseData;
        //            }
    },
    methods: {
        getUser() {
            this.$http.post('/user/getUser', {}, response => {
                if (response.code == 200) {
                    console.log(response.data);
                    this.userData = response.data;

                } else {
                    this.$message({
                        message: response.message,
                        type: 'warning'
                    });
                }
            });
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        handleCommand(command) {
            this.$http.post('/user/logout', {}, response => {
                console.log(response.code);
                if (response.code) {
                    this.$message({
                        message: response.message,
                        type: 'success'
                    });
                    this.$router.push('/login');
                    localStorage.clear();
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

<style scoped>
.transition-box {
    background: #409EFF;
    width: 100px;
}

.roleName {
    text-align: left;
    font-size: 12px;
    color: #409EF3;
    font-size: 21px
}

.user-name {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
    line-height: 21px;
    text-align: right
}

.el-header,
.el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
}

.el-aside {
    background-color: #404040;
    color: #333;
    text-align: center;
}



body>.el-container {
    margin-bottom: 40px;
}

.el-container {
    /*height: 100vh;*/
}

.el-menu {
    border-right: none;
}

.el-menu-item:hover {
    background: #409EFF !important;
}

.el-submenu .el-menu-item:hover {
    background: #409EFF !important;
}

.el-menu-item .is-active {
    background: #409EFF !important;
}

.el-menu-item-group {
    background: #333333 ;
}

.el-submenu .el-menu-item {
    background: #333333;
}

</style>
