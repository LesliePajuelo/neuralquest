(function() {
  'use strict';

  angular
      .module('neuralquestApp')
      .controller('AceCtrl', ['$localStorage','$timeout', 'Ace', AceCtrl]);

  /* @ngInject */
  function AceCtrl($localStorage, $timeout, Ace) {
    var vm = this;
    var editor;

    vm.getValue = getValue;
    vm.reset = reset;
    vm.run = run;

    // var nqConsole = function() {
    //   return({
    //       log: function(msg) {
    //         consoleDiv = document.getElementById('result');
    //         para = document.createElement('p');
    //         text = document.createTextNode(msg);
    //         para.appendChild(text);
    //         consoleDiv.appendChild(para);
    //       }
    //   });
    // }();

    init();

    ////////////////

    function init() {
      initCodeEditor();
      trackCode();
      console.log('editor', editor)
    };

    function trackCode() {
      editor.on("change", function(posObj){
        $localStorage.codeObj = editor.getValue();
      });
    };

    function initCodeEditor() {
      editor = ace.edit("code-editor");
      editor.setTheme("ace/theme/monokai");
      editor.getSession().setMode("ace/mode/javascript");
      editor.setValue("//your code start here. \n");
    };

    function getValue() {
      console.log('getValue called');
      vm.result = $localStorage.codeObj;
      console.log(vm.result);
    };

    function reset() {
      editor.setValue("//your code start here. \n");
      editor.getSession().setUndoManager(new ace.UndoManager());
      $localStorage.codeObj = '';
    };

    function run() {
      //change the console.log behavior
      document.getElementById('result').innerHTML = '';
      consoleLog();
      nqConsole();

      $timeout(function(){
        appendToScript($localStorage.codeObj);
      },100);
      
    }

    //append a given code to in the script tag. it will run the given code
    function appendToScript(code){
      var script = document.createElement('script');
      try {
        script.appendChild(document.createTextNode(code));
        document.body.appendChild(script);
      } catch (e) {
        script.text = code;
        document.body.appendChild(script);
      }
    }

    function consoleLog(){
      if(!console){
        console = {};
      };
      var old = console.log;
      var logger = document.getElementById('result');
      console.log = function (message) {
          if (typeof message == 'object') {
              logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
          } else {
              logger.innerHTML += message + '<br />';
          }
      }
    }
  }
})();


