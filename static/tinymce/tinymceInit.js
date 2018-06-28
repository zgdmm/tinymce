var tinymceEdit = function(id){
    /**参数介绍
     * id: 绑定的DOM 格式如'#edittor'
     *
     */
    tinymce.init({
        selector: id,
        height: 500,
        theme: 'modern',
        language: 'zh_CN.GB2312',
        plugins: [
            'advlist autolink lists link image charmap print preview hr anchor pagebreak',
            'searchreplace wordcount visualblocks visualchars code fullscreen',
            'insertdatetime media nonbreaking save table contextmenu directionality',
            'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc help'
        ],
        toolbar1: 'undo redo | styleselect | fontsizeselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table link image media codesample | preview fullscreen',
        image_advtab: true,
        content_css: [
            '/alitech/static/css/github-markdown.css',
//      '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
//      '//www.tinymce.com/css/codepen.min.css'
        ],
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
    });
}

