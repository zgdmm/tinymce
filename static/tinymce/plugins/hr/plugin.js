(function () {
var hr = (function () {
  'use strict';

  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var register = function (editor) {
    editor.addCommand('InsertHorizontalRule', function () {
      editor.execCommand('mceInsertContent', false, '<hr />');
    });
  };
  var $_cqf7hicbjivb5d59 = { register: register };

  var register$1 = function (editor) {
    editor.addButton('hr', {
      icon: 'hr',
      tooltip: 'Horizontal line',
      cmd: 'InsertHorizontalRule'
    });
    editor.addMenuItem('hr', {
      icon: 'hr',
      text: 'Horizontal line',
      cmd: 'InsertHorizontalRule',
      context: 'insert'
    });
  };
  var $_3gchocccjivb5d5c = { register: register$1 };

  global.add('hr', function (editor) {
    $_cqf7hicbjivb5d59.register(editor);
    $_3gchocccjivb5d5c.register(editor);
  });
  function Plugin () {
  }

  return Plugin;

}());
})();
