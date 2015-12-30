// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-03-11 using
// generator-karma 0.9.0

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // frameworks: ['mocha', 'chai-as-promised', 'chai'],
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/ace-builds/src-min-noconflict/ace.js',
      'bower_components/ace-builds/src-min-noconflict/mode-javascript.js',
      'bower_components/ace-builds/src-min-noconflict/theme-monokai.js',
      'bower_components/angular-ui-ace/ui-ace.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/firebase/firebase.js',
      'bower_components/angularfire/dist/angularfire.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-md5/angular-md5.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/ngstorage/ngStorage.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/AngularJS-Toaster/toaster.js',
      'bower_components/Chart.js/Chart.js',
      'bower_components/angular-chart.js/dist/angular-chart.js',
      'bower_components/angular-modal-service/dst/angular-modal-service.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/mockfirebase/browser/mockfirebase.js',
      // endbower
      // 'app/scripts/**/*.js',
      'test/mock/**/*.js',

      //out app code
      'app/*.js',
      'app/**/*.js',
      'app/**/**/*.js',

      //spec files
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS',
      // 'Chrome'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine'
      // 'karma-mocha',
      // 'karma-chai',
      // 'karma-chai-as-promised'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
