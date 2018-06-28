<template>
    <div id="wangeditor">
    </div>
</template>

<script>
import E from 'wangeditor';

export default {
    data() {
        return {
            editor: null
        };
    },
    methods: {
    },
    mounted() {
        this.editor = new E('#wangeditor');
        // 配置服务器端地址
        this.editor.customConfig.uploadImgServer = '/imageMng/insertImg';
        // 将图片大小限制为 3M
        this.editor.customConfig.uploadImgMaxSize = 500 * 1024 * 1024;
        // 限制一次最多上传 5 张图片
        this.editor.customConfig.uploadImgMaxLength = 50;
        // 自定义传递一些参数  会拼接到 url 的参数中，也会被添加到formdata中。
        this.editor.customConfig.uploadImgParams = {
            // token: 'abcdef12345' // 属性值会自动进行 encode ，此处无需 encode
        };
        // 可自定义filename，即在使用formdata.append(name, file)添加图片文件时，自定义第一个参数。
        this.editor.customConfig.uploadFileName = 'fileItem';
        /* // 上传图片时刻自定义设置 header
        this.editor.customConfig.uploadImgHeaders = {
            'Accept': 'text/x-json'
        }; */
        // 可使用监听函数在上传图片的不同阶段做相应处理
        this.editor.customConfig.uploadImgHooks = {
            before: function (xhr, editor, files) {
                // 图片上传之前触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件

                // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
                // return {
                //     prevent: true,
                //     msg: '放弃上传'
                // }
            },
            success: function (xhr, editor, result) {
                // 图片上传并返回结果，图片插入成功之后触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
            },
            fail: function (xhr, editor, result) {
                // 图片上传并返回结果，但图片插入错误时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
            },
            error: function (xhr, editor) {
                // 图片上传出错时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
            },
            timeout: function (xhr, editor) {
                // 图片上传超时时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
            },

            // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
            // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
            customInsert: function (insertImg, result, editor) {
                // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

                // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                const url = result.data.url;
                insertImg(url);

                // result 必须是一个 JSON 格式字符串！！！否则报错
            }
        };

        // 上传图片的错误提示默认使用alert弹出，你也可以自定义用户体验更好的提示方式
        const self = this;
        this.editor.customConfig.customAlert = function (info) {
            // info 是需要提示的内容
            self.$message.warning(info);
        };
        // 自定义菜单配置
        this.editor.customConfig.menus = [
            'head', // 标题
            'bold', // 粗体
            'italic', // 斜体
            'underline', // 下划线
            'strikeThrough', // 删除线
            // 'foreColor', // 文字颜色
            // 'backColor', // 背景颜色
            // 'link', // 插入链接
            'list', // 列表
            'justify', // 对齐方式
            'quote', // 引用
            // 'emoticon', // 表情
            'image', // 插入图片
            // 'table', // 表格
            // 'video', // 插入视频
            // 'code', // 插入代码
            'undo', // 撤销
            'redo' // 重复
        ];
        // 隐藏“网络图片”tab
        this.editor.customConfig.showLinkImg = false;
        this.editor.create();
        // this.editor.txt.append('<img src="https://c1.mifile.cn/f/i/17/mi6/index/photos-group02_1.jpg"></img>')
    },
    created() {
    }
};

</script>

<style  lang="less">
#wangeditor {
    position: relative;
    z-index: 0;
    margin-bottom: 50px;
    .w-e-text-container{
        height: 500px!important;
        resize: vertical;
    }
}
</style>