// Angular CLI's test runner configuration for the Angular 8 toolchain.
module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: { clearContext: false },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage/ion-angular-study-playground'),
      reports: ['html', 'lcovonly', 'text-summary']
    },
    reporters: ['progress', 'kjhtml'],
    browsers: ['Chrome'],
    singleRun: false
  });
};
