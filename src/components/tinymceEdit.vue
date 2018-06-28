<template>
    <editor id='tinymce' :init='init'></editor>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';
import tinymce from '../../static/tinymce/tinymce.min.js';
import '../../static/tinymce/themes/modern/theme';
import '../../static/tinymce/plugins/image/plugin';
import '../../static/tinymce/plugins/imagetools/plugin';
import $ from 'jquery';
export default {
    components: {
       Editor
    },
    data() {
        return {
            editor: null,
            init: { 
                language_url: '/static/tinymce/langs/zh_CN.js',
                language: 'zh_CN',
                skin_url: '/static/tinymce/skins/lightgray',
                height: 100,
                plugins: "image imagetools",
                image_caption: true,
                image_advtab: true,
                // content_css: [
                // '/alitech/static/css/github-markdown.css',],
                // menubar: "insert",
                // image_list:[],
                // plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
                // toolbar:
                // 'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
                branding: false,
                file_browser_callback: function (field_name, url, type, win) {

                    console.log(field_name);
                    if (type == 'media') return false;
                    var accept = {
                        image: 'image/png, image/gif, image/jpg, image/jpeg',
                        media: 'audio/mpeg, audio/wav, video/mp4, video/webm, video/ogg'
                    };

                    var eleFile = $('<input type="file" accept="' + accept[type] + '">');
                    eleFile.click();

                    eleFile.on('change', function () {
                        var file = this.files[0];
                        var name = file.name || 'screenshot.png';
                        var data = new FormData();
                        data.append('file', file, name);
                        $.ajax('/oss/upload.json', {
                            data: data,
                            type: 'POST',
                            processData: false,
                            contentType: false
                        }).done(function (res) {
                            if (res.code == 200) {
                                $('#' + field_name).val(res.data.url);
                            } else {
                                alert(res.message);
                            }
                        }).fail(function (xhr) {
                            if (xhr.responseText) {
                                alert(xhr.responseText);
                            }
                        });
                    });
             }
            },
        };
    },
    methods: {
    },
    mounted() {
       
    },
    created() {
    }
};

</script>

<style  lang="less">
#tinymce {
    position: relative;
    z-index: 0;
    margin-bottom: 50px;
    .w-e-text-container{
        height: 500px!important;
        resize: vertical;
    }
}
</style>