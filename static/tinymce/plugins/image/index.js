tinymce.PluginManager.add('imageSelector', function(editor, url) {
    // Add a button that opens a window
    editor.addButton('imageSelector', {
        icon: 'image',
        tooltip:"select image from image lib",
        onclick: function() {
            editor.settings.imageSelectorCallback(function(r){
                console.log('inserting image to editor: '+ r);
                editor.execCommand('mceInsertContent', false, '<img alt="Smiley face" height="42" width="42" src="' + r + '"/>');
            });
        }
    });

});