(function(){

  'use strict';

  /**
   * @ngdoc overview
   * @name neuralquestApp
   * @description
   * # neuralquestApp
   *test
   * Main module of the application.
   */
  angular
    .module('neuralquestApp', [
      'firebase',
      'angular-md5',
      'ngSanitize',
      'ui.router',
      'ui.ace',
      'ui.bootstrap',
      'ngStorage',
      'ngAnimate',
      'toaster',
      'youtube-embed',
      'chart.js',
      'angularModalService'
    ])

    .run(["$rootScope", "$window", '$location', scrollToTop]);

      function scrollToTop($rootScope, $window,  $location) {

      $rootScope.$on('$stateChangeSuccess', function() {
         document.body.scrollTop = document.documentElement.scrollTop = 30;
      });
    }


})();


var lastScrollTop = 0;
$(window).scroll(function() {
  // event.preventDefault();
  var teaminfoPos = $('#teaminfo').offset();
  var techstackPos = $('#techstack').offset();
  var st = $(this).scrollTop();
  var page = $('html, body');
  var isHomepage = Boolean($('.homepagewrapper').length);

  // debugger;
  if(isHomepage){
    if (st > lastScrollTop){
      // downscroll code
      if (st > 10 && st < 100) {
        //move to teaminfo div
        page.stop();
        page.animate({
          scrollTop: teaminfoPos.top - 100
        },500);
      } 
      if(st > teaminfoPos.top - 90 && st < teaminfoPos.top){
        //move to techstack div
        page.stop();
        page.animate({
          scrollTop: techstackPos.top - 100
        },500);
      }
    } 
  }
  
  lastScrollTop = st;
});

