
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':3001/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function () {
  'use strict';

  /// <reference path="./tools.ts" />
  //  ts 中还有个重要的概念 命名空间
  // 用来解决文件命名冲突问题
  // 命名合并问题，  能合并的东西有  
  // （接口同名可以合并）   
  // （函数和命名空间可以合并） 
  // （相同的命名空间和命名空间可以合并）
  // （命名空间可以和类合并）（类和接口合并）
  // import {Zoo, Foo} from './namespace'
  // console.log(Zoo.m1)   // 相同的命名空间会合并
  // console.log(Zoo.m2)
  // console.log(Foo.x)
  function Fn() {
  }
  (function (Fn) {
      Fn.a = 1;
      Fn.b = 2;
  })(Fn || (Fn = {}));
  console.log(Fn.a);
  String.prototype.xxx = function () {
  };
  window.xxx = '89789789';
  $('').css('xxx');
  $.fn.extend();

})();
//# sourceMappingURL=bundle.js.map
