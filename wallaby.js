module.exports = function () {
    return {
        files: [
            'vendor/angular/angular.min.js',
            'vendor/angular-mocks/angular-mocks.js',
            'app/**/*.js'
        ],
        tests: [
            'spec/**/*.spec.js'
        ]
    };
};