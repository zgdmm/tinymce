<template>
    <!-- 过渡动画 -->
    <transition name="fade">
        <div class="backdrop" @click="bigImg">
            <img :src="imgSrc" />
        </div>
    </transition>
</template>
<script>
    export default {
        name: 'photo-preview',
        props: ['imgSrc'],
        methods: {
            bigImg() {
                // 发送事件
                this.$emit('clickit')
            }
        }
    }
</script>
<style scoped>
    /*动画*/
    
    .fade-enter-active,
    .fade-leave-active {
        transition: all .2s linear;
        transform: translate3D(0, 0, 0);
    }
    
    .fade-enter,
    .fade-leave-active {
        transform: translate3D(100%, 0, 0);
    }
    
    .backdrop {
        position: fixed;
        z-index: 998;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, .3);
    }
    
    .backdrop img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        -khtml-transform: translate(-50%, -50%);
    }
</style>