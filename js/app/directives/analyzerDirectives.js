/**
 * Created by robert.chapman on 9/10/15.
 */

angular.module('analyzerDirectivesModule', [])

    .directive('monitorDirective', function () {

        return {
            restrict: 'E',
            replace: true,
            template: '<h1>Directive template</h1>'
        }
    });