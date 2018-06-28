(function () {
var code = (function () {
  'use strict';

  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var global$1 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

  var getMinWidth = function (editor) {
    return editor.getParam('code_dialog_width', 600);
  };
  var getMinHeight = function (editor) {
    return editor.getParam('code_dialog_height', Math.min(global$1.DOM.getViewPort().h - 200, 500));
  };
  var $_7mph0u9qjivb5cq9 = {
    getMinWidth: getMinWidth,
    getMinHeight: getMinHeight
  };

  var setContent = function (editor, html) {
    editor.focus();
    editor.undoManager.transact(function () {
      editor.setContent(html);
    });
    editor.selection.setCursorLocation();
    editor.nodeChanged();
  };
  var getContent = function (editor) {
    return editor.getContent({ source_view: true });
  };
  var $_c466lv9sjivb5cqb = {
    setContent: setContent,
    getContent: getContent
  };

  var open = function (editor) {
    var minWidth = $_7mph0u9qjivb5cq9.getMinWidth(editor);
    var minHeight = $_7mph0u9qjivb5cq9.getMinHeight(editor);
    var win = editor.windowManager.open({
      title: 'Source code',
      body: {
        type: 'textbox',
        name: 'code',
        multiline: true,
        minWidth: minWidth,
        minHeight: minHeight,
        spellcheck: false,
        style: 'direction: ltr; text-align: left'
      },
      onSubmit: function (e) {
        $_c466lv9sjivb5cqb.setContent(editor, e.data.code);
      }
    });
    win.find('#code').value($_c466lv9sjivb5cqb.getContent(editor));
  };
  var $_4861gx9pjivb5cq7 = { open: open };

  var register = function (editor) {
    editor.addCommand('mceCodeEditor', function () {
      $_4861gx9pjivb5cq7.open(editor);
    });
  };
  var $_d64atd9ojivb5cq5 = { register: register };

  var register$1 = function (editor) {
    editor.addButton('code', {
      icon: 'code',
      tooltip: 'Source code',
      onclick: function () {
        $_4861gx9pjivb5cq7.open(editor);
      }
    });
    editor.addMenuItem('code', {
      icon: 'code',
      text: 'Source code',
      onclick: function () {
        $_4861gx9pjivb5cq7.open(editor);
      }
    });
  };
  var $_e5m4rb9tjivb5cqd = { register: register$1 };

  global.add('code', function (editor) {
    $_d64atd9ojivb5cq5.register(editor);
    $_e5m4rb9tjivb5cqd.register(editor);
    return {};
  });
  function Plugin () {
  }

  return Plugin;

}());
})();
